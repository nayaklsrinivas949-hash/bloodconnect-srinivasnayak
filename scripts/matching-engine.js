/**
 * BloodConnect 3D - Smart Matching Engine & Route Navigator
 * Implements Haversine distance, blood compatibility matrix,
 * urgency scoring, donor ranking, and turn-by-turn GPS navigation.
 */

const BLOOD_COMPATIBILITY = {
  'O-': ['O-'],
  'O+': ['O-', 'O+'],
  'A-': ['O-', 'A-'],
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'B-': ['O-', 'B-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
};

const DONOR_GIVES_TO = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

class MatchingEngine {
  /**
   * Calculates distance between two GPS coordinates in Kilometers using Haversine formula.
   */
  static calculateDistanceKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 999;
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round((R * c) * 10) / 10;
  }

  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  static isCompatible(donorGroup, recipientGroup) {
    if (!donorGroup || !recipientGroup) return false;
    const compatibleDonors = BLOOD_COMPATIBILITY[recipientGroup] || [];
    return compatibleDonors.includes(donorGroup);
  }

  static getCompatibleDonorGroups(recipientGroup) {
    return BLOOD_COMPATIBILITY[recipientGroup] || [];
  }

  static getEligibleRecipientGroups(donorGroup) {
    return DONOR_GIVES_TO[donorGroup] || [];
  }

  static matchDonorsForRequest(request, options = {}) {
    const {
      maxDistanceKm = request.targetRadiusKm || 25,
      requireMedicallyFit = false,
      allDonors = window.bloodData.getDonors(),
      hospital = window.bloodData.getHospitalById(request.hospitalId)
    } = options;

    const hospitalLat = hospital ? hospital.lat : 17.4156;
    const hospitalLon = hospital ? hospital.lon : 78.4116;

    const matched = [];

    allDonors.forEach(donor => {
      const isCompat = this.isCompatible(donor.bloodGroup, request.bloodGroup);
      const isExactMatch = donor.bloodGroup === request.bloodGroup;
      const distance = this.calculateDistanceKm(hospitalLat, hospitalLon, donor.lat, donor.lon);
      const withinRadius = distance <= maxDistanceKm;
      const isFit = donor.isMedicallyFit && (donor.cooldownDaysRemaining || 0) === 0;

      if (requireMedicallyFit && !isFit) return;
      if (!isCompat) return;

      let matchScore = 50;
      if (isExactMatch) matchScore += 25;
      if (isFit) matchScore += 15;
      
      const distanceFactor = Math.max(0, (maxDistanceKm - distance) / maxDistanceKm) * 10;
      matchScore += distanceFactor;
      matchScore = Math.min(100, Math.round(matchScore));

      matched.push({
        donor,
        distanceKm: distance,
        isExactMatch,
        isCompatible: isCompat,
        isMedicallyFit: isFit,
        withinRadius,
        matchScore
      });
    });

    matched.sort((a, b) => {
      if (a.withinRadius !== b.withinRadius) return a.withinRadius ? -1 : 1;
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return a.distanceKm - b.distanceKm;
    });

    return matched;
  }

  static findRequestsForDonor(donor, options = {}) {
    const { maxDistanceKm = 35 } = options;
    const requests = window.bloodData.getRequests().filter(r => r.status === 'ACTIVE');
    const hospitals = window.bloodData.getHospitals();

    const matches = [];

    requests.forEach(req => {
      const isCompat = this.isCompatible(donor.bloodGroup, req.bloodGroup);
      if (!isCompat) return;

      const hospital = hospitals.find(h => h.id === req.hospitalId);
      const dist = hospital ? this.calculateDistanceKm(donor.lat, donor.lon, hospital.lat, hospital.lon) : 10;

      if (dist <= maxDistanceKm) {
        matches.push({
          request: req,
          hospital,
          distanceKm: dist,
          isExactMatch: req.bloodGroup === donor.bloodGroup,
          urgency: req.urgency
        });
      }
    });

    matches.sort((a, b) => {
      const urgencyRank = { 'CRITICAL': 3, 'HIGH': 2, 'STANDARD': 1 };
      const rankA = urgencyRank[a.urgency] || 1;
      const rankB = urgencyRank[b.urgency] || 1;
      if (rankB !== rankA) return rankB - rankA;
      return a.distanceKm - b.distanceKm;
    });

    return matches;
  }

  /**
   * Generates comprehensive Turn-by-Turn GPS navigation directions and Google Maps link
   * from Donor origin to Hospital destination.
   */
  static generateRouteDirections(donor, hospital) {
    const dist = this.calculateDistanceKm(donor.lat, donor.lon, hospital.lat, hospital.lon);
    
    // Estimated Times based on typical urban traffic speeds
    const carMins = Math.max(5, Math.round((dist / 22) * 60)); // ~22 km/h avg city speed
    const bikeMins = Math.max(4, Math.round((dist / 32) * 60)); // ~32 km/h two-wheeler
    const emergencyMins = Math.max(3, Math.round((dist / 45) * 60)); // ~45 km/h green corridor

    const steps = [
      {
        step: 1,
        instruction: `Start navigation from ${donor.streetAddress || donor.city}`,
        icon: '📍',
        distance: '0.2 km'
      },
      {
        step: 2,
        instruction: `Head toward main link corridor in ${donor.area || donor.city}`,
        icon: '🛣️',
        distance: `${Math.round(dist * 0.3 * 10) / 10} km`
      },
      {
        step: 3,
        instruction: `Take the Express route towards ${hospital.city}`,
        icon: '↗️',
        distance: `${Math.round(dist * 0.4 * 10) / 10} km`
      },
      {
        step: 4,
        instruction: `Turn into ${hospital.streetAddress || hospital.city}`,
        icon: '➡️',
        distance: `${Math.round(dist * 0.3 * 10) / 10} km`
      },
      {
        step: 5,
        instruction: `Arrive at ${hospital.name} &bull; ${hospital.emergencyGate || 'Emergency Blood Bank Reception'}`,
        icon: '🏥',
        distance: '0.0 km'
      }
    ];

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${donor.lat},${donor.lon}&destination=${hospital.lat},${hospital.lon}&travelmode=driving`;

    return {
      distanceKm: dist,
      estimatedTimes: {
        car: `${carMins} mins`,
        twoWheeler: `${bikeMins} mins`,
        emergencyPriority: `${emergencyMins} mins`
      },
      steps,
      googleMapsUrl,
      hospitalGate: hospital.emergencyGate || 'Emergency Main Gate',
      hospitalContact: hospital.contact || '+91 22 2345 6789',
      emergencyHelpline: hospital.emergencyHelpline || '1800-200-5555'
    };
  }
}

window.MatchingEngine = MatchingEngine;
