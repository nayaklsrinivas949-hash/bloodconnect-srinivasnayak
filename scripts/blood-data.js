/**
 * BloodConnect 3D - Centralized Data Store & State Management
 * Persistent with localStorage and seeded with realistic Hyderabad data.
 */

const STORAGE_KEYS = {
  DONORS: 'bloodconnect_donors_hyd_v5',
  HOSPITALS: 'bloodconnect_hospitals_hyd_v5',
  REQUESTS: 'bloodconnect_requests_hyd_v5',
  REWARDS_CATALOG: 'bloodconnect_rewards_catalog_hyd_v5',
  REDEMPTIONS: 'bloodconnect_redemptions_hyd_v5',
  CURRENT_USER: 'bloodconnect_current_user_hyd_v5',
  FITNESS_LOGS: 'bloodconnect_fitness_logs_hyd_v5',
  INVENTORY: 'bloodconnect_inventory_hyd_v5'
};

// Seed Hospitals in Hyderabad with full addresses and emergency gate directions
const SEED_HOSPITALS = [
  {
    id: 'HOSP-001',
    name: 'Apollo Hospitals Jubilee Hills',
    city: 'Hyderabad',
    area: 'Jubilee Hills',
    streetAddress: 'Road No. 72, Opp. Bharatiya Vidya Bhavan, Jubilee Hills',
    pincode: '500033',
    lat: 17.4156,
    lon: 78.4116,
    contact: '+91 85121 27287',
    emergencyHelpline: '8512127287',
    bloodBankHead: 'Dr. K. S. Rao',
    department: 'Critical Trauma Care & Blood Bank',
    emergencyGate: 'Gate 2 (Trauma Center & Blood Bank Reception, Ground Floor)',
    verified: true,
    inventory: { 'O+': 8, 'O-': 2, 'A+': 12, 'A-': 4, 'B+': 9, 'B-': 3, 'AB+': 6, 'AB-': 2 }
  },
  {
    id: 'HOSP-002',
    name: 'KIMS Hospitals Secunderabad',
    city: 'Hyderabad',
    area: 'Secunderabad / Begumpet',
    streetAddress: '1-8-31/1, Minister Road, Krishna Nagar Colony, Begumpet',
    pincode: '500003',
    lat: 17.4375,
    lon: 78.4878,
    contact: '+91 85121 27287',
    emergencyHelpline: '8512127287',
    bloodBankHead: 'Dr. Radhika Reddy',
    department: 'Emergency & Surgery Division',
    emergencyGate: 'Gate A (Main Casualty Wing, 1st Floor Blood Bank)',
    verified: true,
    inventory: { 'O+': 5, 'O-': 1, 'A+': 7, 'A-': 2, 'B+': 14, 'B-': 1, 'AB+': 4, 'AB-': 1 }
  },
  {
    id: 'HOSP-003',
    name: 'Yashoda Hospitals Somajiguda',
    city: 'Hyderabad',
    area: 'Somajiguda',
    streetAddress: 'Raj Bhavan Road, Matha Nagar, Somajiguda',
    pincode: '500082',
    lat: 17.4243,
    lon: 78.4552,
    contact: '+91 85121 27287',
    emergencyHelpline: '8512127287',
    bloodBankHead: 'Dr. Suresh Varma',
    department: 'Cardio-Thoracic & Transfusion Medicine',
    emergencyGate: 'Casualty Gate 3 (Direct Blood Bank Counter #02)',
    verified: true,
    inventory: { 'O+': 11, 'O-': 3, 'A+': 15, 'A-': 5, 'B+': 8, 'B-': 4, 'AB+': 7, 'AB-': 3 }
  },
  {
    id: 'HOSP-004',
    name: 'CARE Hospitals Banjara Hills',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    streetAddress: 'Road No. 1, Prem Nagar, Banjara Hills',
    pincode: '500034',
    lat: 17.4168,
    lon: 78.4485,
    contact: '+91 85121 27287',
    emergencyHelpline: '8512127287',
    bloodBankHead: 'Dr. Anusha Chowdary',
    department: 'Trauma & Hematology Division',
    emergencyGate: 'Main Tower Gate 1 (Transfusion Wing, Room 102)',
    verified: true,
    inventory: { 'O+': 4, 'O-': 1, 'A+': 6, 'A-': 1, 'B+': 5, 'B-': 2, 'AB+': 3, 'AB-': 1 }
  },
  {
    id: 'HOSP-005',
    name: 'Continental Hospitals Gachibowli',
    city: 'Hyderabad',
    area: 'Gachibowli',
    streetAddress: 'Plot No. 3, Road No. 2, IT & Financial Dist, Nanakramguda, Gachibowli',
    pincode: '500032',
    lat: 17.4190,
    lon: 78.3428,
    contact: '+91 85121 27287',
    emergencyHelpline: '8512127287',
    bloodBankHead: 'Dr. Vikram Goud',
    department: 'Pediatric & Critical Trauma Care',
    emergencyGate: 'Casualty Gate 4 (Follow Red Floor Line to Blood Bank)',
    verified: true,
    inventory: { 'O+': 9, 'O-': 2, 'A+': 8, 'A-': 3, 'B+': 11, 'B-': 2, 'AB+': 5, 'AB-': 2 }
  }
];

// Seed Donors in Hyderabad with Full Contact Details & Addresses
const SEED_DONORS = [
  {
    id: 'DONOR-101',
    name: 'Rahul Varma',
    bloodGroup: 'O+',
    phone: '+91 98480 44521',
    email: 'rahul.varma@example.com',
    streetAddress: 'Flat 402, Kakatiya Residency, Road No. 36',
    area: 'Jubilee Hills',
    city: 'Hyderabad',
    pincode: '500033',
    emergencyContactPerson: 'Pooja Varma (Sister)',
    emergencyContactPhone: '+91 98480 99887',
    preferredHospital: 'Apollo Hospitals Jubilee Hills',
    lat: 17.4290,
    lon: 78.4080,
    gender: 'Male',
    age: 28,
    weight: 72,
    hemoglobin: 14.8,
    bloodPressure: '120/80',
    lastDonationDate: '2026-05-15',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 98,
    dailyFitnessStatus: 'Peak Fitness - Well Hydrated & Rested',
    totalDonations: 6,
    pointsBalance: 1850,
    pointsEarnedLifetime: 3200,
    isAvailable: true,
    badges: ['Life Saver Gold', 'Rapid Responder', '100% Fit Streak'],
    activePass: null
  },
  {
    id: 'DONOR-102',
    name: 'Ananya Iyer',
    bloodGroup: 'O-', // Universal Donor
    phone: '+91 98490 11290',
    email: 'ananya.iyer@example.com',
    streetAddress: '703, Fortune Towers, Road No. 12',
    area: 'Banjara Hills',
    city: 'Hyderabad',
    pincode: '500034',
    emergencyContactPerson: 'Karthik Iyer (Brother)',
    emergencyContactPhone: '+91 98490 55432',
    preferredHospital: 'CARE Hospitals Banjara Hills',
    lat: 17.4120,
    lon: 78.4410,
    gender: 'Female',
    age: 26,
    weight: 58,
    hemoglobin: 13.4,
    bloodPressure: '118/76',
    lastDonationDate: '2026-06-01',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 95,
    dailyFitnessStatus: 'Excellent vitals, normal temperature',
    totalDonations: 4,
    pointsBalance: 1400,
    pointsEarnedLifetime: 2200,
    isAvailable: true,
    badges: ['Universal Hero', 'Emergency Guardian'],
    activePass: null
  },
  {
    id: 'DONOR-103',
    name: 'Siddharth Rao',
    bloodGroup: 'A+',
    phone: '+91 99890 87654',
    email: 'sid.rao@example.com',
    streetAddress: 'B-14, My Home Bhooja, Silpa Gram Craft Village',
    area: 'Hitec City',
    city: 'Hyderabad',
    pincode: '500081',
    emergencyContactPerson: 'Neha Rao (Spouse)',
    emergencyContactPhone: '+91 99890 11223',
    preferredHospital: 'Continental Hospitals Gachibowli',
    lat: 17.4435,
    lon: 78.3772,
    gender: 'Male',
    age: 32,
    weight: 76,
    hemoglobin: 15.2,
    bloodPressure: '122/82',
    lastDonationDate: '2026-04-10',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 92,
    dailyFitnessStatus: 'Fit & cleared for donation',
    totalDonations: 8,
    pointsBalance: 2450,
    pointsEarnedLifetime: 4100,
    isAvailable: true,
    badges: ['Veteran Donor', 'Community Star'],
    activePass: null
  },
  {
    id: 'DONOR-104',
    name: 'Meera Kapoor',
    bloodGroup: 'A-',
    phone: '+91 91210 43210',
    email: 'meera.k@example.com',
    streetAddress: '12, Aparna Sarovar, Nallagandla Road',
    area: 'Gachibowli',
    city: 'Hyderabad',
    pincode: '500032',
    emergencyContactPerson: 'Rajeev Kapoor (Father)',
    emergencyContactPhone: '+91 91210 00987',
    preferredHospital: 'Continental Hospitals Gachibowli',
    lat: 17.4350,
    lon: 78.3320,
    gender: 'Female',
    age: 24,
    weight: 54,
    hemoglobin: 12.9,
    bloodPressure: '115/75',
    lastDonationDate: '2026-08-10',
    cooldownDaysRemaining: 36,
    isMedicallyFit: false,
    fitnessReadinessScore: 65,
    dailyFitnessStatus: 'Post-donation recovery window (36 days left)',
    totalDonations: 2,
    pointsBalance: 900,
    pointsEarnedLifetime: 1100,
    isAvailable: false,
    badges: ['Rising Hero'],
    activePass: null
  },
  {
    id: 'DONOR-105',
    name: 'Vikramaditya Roy',
    bloodGroup: 'B+',
    phone: '+91 97004 32109',
    email: 'vikram.roy@example.com',
    streetAddress: 'Floor 8, Jayabheri Silicon County, Hitech City Main Rd',
    area: 'Madhapur',
    city: 'Hyderabad',
    pincode: '500081',
    emergencyContactPerson: 'Shalini Roy (Wife)',
    emergencyContactPhone: '+91 97004 88765',
    preferredHospital: 'Apollo Hospitals Jubilee Hills',
    lat: 17.4480,
    lon: 78.3900,
    gender: 'Male',
    age: 35,
    weight: 80,
    hemoglobin: 14.5,
    bloodPressure: '124/80',
    lastDonationDate: '2026-03-20',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 96,
    dailyFitnessStatus: '100% Fit & ready for dispatch',
    totalDonations: 9,
    pointsBalance: 3100,
    pointsEarnedLifetime: 4800,
    isAvailable: true,
    badges: ['Life Saver Gold', 'Plasma Champion'],
    activePass: null
  },
  {
    id: 'DONOR-106',
    name: 'Pooja Hegde',
    bloodGroup: 'B-',
    phone: '+91 96180 21098',
    email: 'pooja.h@example.com',
    streetAddress: '401, SMR Vinay City, Miyapur Road',
    area: 'Kondapur',
    city: 'Hyderabad',
    pincode: '500084',
    emergencyContactPerson: 'Manish Hegde (Brother)',
    emergencyContactPhone: '+91 96180 77654',
    preferredHospital: 'Continental Hospitals Gachibowli',
    lat: 17.4680,
    lon: 78.3580,
    gender: 'Female',
    age: 27,
    weight: 60,
    hemoglobin: 13.8,
    bloodPressure: '119/78',
    lastDonationDate: '2026-05-02',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 94,
    dailyFitnessStatus: 'Daily fitness check cleared',
    totalDonations: 5,
    pointsBalance: 1650,
    pointsEarnedLifetime: 2700,
    isAvailable: true,
    badges: ['Rare Type Guardian'],
    activePass: null
  },
  {
    id: 'DONOR-107',
    name: 'Rohan Deshmukh',
    bloodGroup: 'AB+',
    phone: '+91 95020 10987',
    email: 'rohan.d@example.com',
    streetAddress: '9B, Greenlands Enclave, Prakash Nagar',
    area: 'Begumpet',
    city: 'Hyderabad',
    pincode: '500016',
    emergencyContactPerson: 'Sunil Deshmukh (Father)',
    emergencyContactPhone: '+91 95020 66543',
    preferredHospital: 'KIMS Hospitals Secunderabad',
    lat: 17.4440,
    lon: 78.4680,
    gender: 'Male',
    age: 30,
    weight: 75,
    hemoglobin: 14.9,
    bloodPressure: '121/79',
    lastDonationDate: '2026-04-25',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 91,
    dailyFitnessStatus: 'Healthy vitals logged today',
    totalDonations: 3,
    pointsBalance: 1150,
    pointsEarnedLifetime: 1700,
    isAvailable: true,
    badges: ['Community Supporter'],
    activePass: null
  },
  {
    id: 'DONOR-108',
    name: 'Zoya Akhtar',
    bloodGroup: 'AB-',
    phone: '+91 94400 09876',
    email: 'zoya.a@example.com',
    streetAddress: '204, Lodha Bellezza, Phase 4, KPHB Colony',
    area: 'Kukatpally',
    city: 'Hyderabad',
    pincode: '500072',
    emergencyContactPerson: 'Farhan Akhtar (Husband)',
    emergencyContactPhone: '+91 94400 55432',
    preferredHospital: 'KIMS Hospitals Secunderabad',
    lat: 17.4910,
    lon: 78.3990,
    gender: 'Female',
    age: 29,
    weight: 56,
    hemoglobin: 13.1,
    bloodPressure: '116/74',
    lastDonationDate: '2026-05-18',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 93,
    dailyFitnessStatus: 'Cleared for donation',
    totalDonations: 4,
    pointsBalance: 1500,
    pointsEarnedLifetime: 2300,
    isAvailable: true,
    badges: ['Rare Type Guardian'],
    activePass: null
  },
  {
    id: 'DONOR-109',
    name: 'Aditya Kulkarni',
    bloodGroup: 'O+',
    phone: '+91 93910 98765',
    email: 'aditya.k@example.com',
    streetAddress: '15, Raj Bhavan Quarters Road',
    area: 'Somajiguda',
    city: 'Hyderabad',
    pincode: '500082',
    emergencyContactPerson: 'Kiran Kulkarni (Mother)',
    emergencyContactPhone: '+91 93910 44321',
    preferredHospital: 'Yashoda Hospitals Somajiguda',
    lat: 17.4260,
    lon: 78.4590,
    gender: 'Male',
    age: 31,
    weight: 82,
    hemoglobin: 15.6,
    bloodPressure: '125/82',
    lastDonationDate: '2026-05-10',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 97,
    dailyFitnessStatus: 'Peak physical condition',
    totalDonations: 7,
    pointsBalance: 2200,
    pointsEarnedLifetime: 3700,
    isAvailable: true,
    badges: ['Life Saver Gold', 'Iron Donor'],
    activePass: null
  },
  {
    id: 'DONOR-110',
    name: 'Kavita Menon',
    bloodGroup: 'B+',
    phone: '+91 92460 87654',
    email: 'kavita.m@example.com',
    streetAddress: '55, Chaitanyapuri Main Road',
    area: 'Dilsukhnagar',
    city: 'Hyderabad',
    pincode: '500060',
    emergencyContactPerson: 'Ramesh Menon (Father)',
    emergencyContactPhone: '+91 92460 33210',
    preferredHospital: 'CARE Hospitals Banjara Hills',
    lat: 17.3680,
    lon: 78.5280,
    gender: 'Female',
    age: 33,
    weight: 62,
    hemoglobin: 13.7,
    bloodPressure: '118/78',
    lastDonationDate: '2026-04-05',
    cooldownDaysRemaining: 0,
    isMedicallyFit: true,
    fitnessReadinessScore: 90,
    dailyFitnessStatus: 'Vitals verified & clear',
    totalDonations: 5,
    pointsBalance: 1750,
    pointsEarnedLifetime: 2800,
    isAvailable: true,
    badges: ['Community Star'],
    activePass: null
  }
];

// Seed Blood Requests posted by Hyderabad Hospital Admins
const SEED_REQUESTS = [
  {
    id: 'REQ-901',
    hospitalId: 'HOSP-001',
    hospitalName: 'Apollo Hospitals Jubilee Hills',
    patientName: 'Karan Mehra',
    patientAge: 42,
    bloodGroup: 'O+',
    unitsNeeded: 2,
    unitsFulfilled: 0,
    urgency: 'CRITICAL',
    condition: 'Emergency Bypass Surgery & Severe Blood Loss',
    ward: 'ICU Bed 04',
    targetRadiusKm: 20,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    matchedDonorsCount: 4,
    responses: []
  },
  {
    id: 'REQ-902',
    hospitalId: 'HOSP-002',
    hospitalName: 'KIMS Hospitals Secunderabad',
    patientName: 'Aarti Nair',
    patientAge: 29,
    bloodGroup: 'O-',
    unitsNeeded: 3,
    unitsFulfilled: 1,
    urgency: 'CRITICAL',
    condition: 'Complicated Postpartum Hemorrhage',
    ward: 'Maternity Ward 2B',
    targetRadiusKm: 25,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    matchedDonorsCount: 2,
    responses: []
  },
  {
    id: 'REQ-903',
    hospitalId: 'HOSP-003',
    hospitalName: 'Yashoda Hospitals Somajiguda',
    patientName: 'Devendra Patel',
    patientAge: 58,
    bloodGroup: 'B+',
    unitsNeeded: 2,
    unitsFulfilled: 0,
    urgency: 'HIGH',
    condition: 'Platelet Transfusion for Dengue Shock Syndrome',
    ward: 'General Medicine Bed 12',
    targetRadiusKm: 15,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    matchedDonorsCount: 3,
    responses: []
  },
  {
    id: 'REQ-904',
    hospitalId: 'HOSP-004',
    hospitalName: 'CARE Hospitals Banjara Hills',
    patientName: 'Simran Gill',
    patientAge: 16,
    bloodGroup: 'A+',
    unitsNeeded: 1,
    unitsFulfilled: 0,
    urgency: 'HIGH',
    condition: 'Leukemia Supportive Care Transfusion',
    ward: 'Pediatric Oncology 3A',
    targetRadiusKm: 30,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    matchedDonorsCount: 5,
    responses: []
  }
];

// Medical Benefits & Reward Catalog
const SEED_REWARDS = [
  {
    id: 'REW-01',
    title: 'Comprehensive Lab & Blood Profile Test',
    pointsRequired: 300,
    category: 'Diagnostic Health',
    icon: '🧪',
    badge: 'Popular',
    value: '₹ 1,800 Value',
    description: 'Complete Hemogram (CBC), Lipid Profile, Liver & Kidney Function Tests at any partnered diagnostic center in Hyderabad.',
    terms: 'Valid for 12 months. Transferable to immediate family.'
  },
  {
    id: 'REW-02',
    title: '25% Pharmacy & Medicine Discount Pass',
    pointsRequired: 400,
    category: 'Prescription Care',
    icon: '💊',
    badge: 'Instant Redeem',
    value: '25% Flat OFF',
    description: 'Instant 25% discount coupon on all non-prescription & doctor-prescribed medicines at Apollo / MedPlus Hyderabad.',
    terms: 'Applicable on bills up to ₹ 5,000. Valid for 60 days.'
  },
  {
    id: 'REW-03',
    title: 'Emergency Blood Reserve Token for Family',
    pointsRequired: 600,
    category: 'Emergency Guarantee',
    icon: '🩸',
    badge: 'Priority Lifesaver',
    value: 'Priority Fast-Track',
    description: 'Guaranteed instant blood release pass for the donor or their direct blood relatives in any network Hyderabad hospital.',
    terms: 'Never expires. Priority 0 dispatch in emergency surgery.'
  },
  {
    id: 'REW-04',
    title: 'Full Dental & Vision Diagnostic Checkup',
    pointsRequired: 350,
    category: 'Wellness',
    icon: '👁️',
    badge: 'Preventive Care',
    value: '₹ 1,500 Value',
    description: 'Free comprehensive dental scaling, cavity checkup, and digital ophthalmic vision acuity test.',
    terms: 'Valid at all affiliated specialized dental/eye clinics.'
  },
  {
    id: 'REW-05',
    title: 'Annual Full Body Health & ECG Scan Coupon',
    pointsRequired: 800,
    category: 'Executive Health',
    icon: '🫀',
    badge: 'Gold Tier',
    value: '₹ 4,500 Value',
    description: 'Complete 68-parameter full body preventive screening including Resting ECG, Ultrasound, HbA1c, and Vitamin D/B12.',
    terms: 'Digital booking with doorstep blood sample collection.'
  },
  {
    id: 'REW-06',
    title: '1-Year Emergency Ambulance Assistance Cover',
    pointsRequired: 500,
    category: 'Emergency Protection',
    icon: '🚑',
    badge: 'Family Safety',
    value: 'Free 24/7 Dispatch',
    description: 'Zero-cost emergency ALS/BLS ambulance dispatch service within 50km radius for donor and family in Hyderabad.',
    terms: 'Active immediately upon redemption. 24/7 dedicated helpline.'
  }
];

// Seed Redemptions
const SEED_REDEMPTIONS = [
  {
    id: 'RED-8821',
    donorId: 'DONOR-101',
    rewardId: 'REW-02',
    rewardTitle: '25% Pharmacy & Medicine Discount Pass',
    pointsSpent: 400,
    voucherCode: 'PHARM-25-HYD792',
    redeemedAt: '2026-08-15T14:30:00Z',
    status: 'ACTIVE',
    qrCodeText: 'BC-VOUCHER:PHARM-25-HYD792:DONOR-101'
  }
];

class BloodDataStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.DONORS)) {
      localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(SEED_DONORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HOSPITALS)) {
      localStorage.setItem(STORAGE_KEYS.HOSPITALS, JSON.stringify(SEED_HOSPITALS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(SEED_REQUESTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REWARDS_CATALOG)) {
      localStorage.setItem(STORAGE_KEYS.REWARDS_CATALOG, JSON.stringify(SEED_REWARDS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REDEMPTIONS)) {
      localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(SEED_REDEMPTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
        role: 'donor',
        donorId: 'DONOR-101'
      }));
    }
  }

  _get(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return fallback;
    }
  }

  _set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      window.dispatchEvent(new CustomEvent('bloodconnect:state_changed', { detail: { key } }));
    } catch (e) {
      console.error('Error writing localStorage:', e);
    }
  }

  // Donors
  getDonors() {
    return this._get(STORAGE_KEYS.DONORS, SEED_DONORS);
  }

  getDonorById(id) {
    const donors = this.getDonors();
    return donors.find(d => d.id === id) || null;
  }

  saveDonor(donorData) {
    const donors = this.getDonors();
    const index = donors.findIndex(d => d.id === donorData.id);
    if (index >= 0) {
      donors[index] = { ...donors[index], ...donorData };
    } else {
      if (!donorData.id) donorData.id = 'DONOR-' + Math.floor(100 + Math.random() * 900);
      donors.unshift(donorData);
    }
    this._set(STORAGE_KEYS.DONORS, donors);
    return donorData;
  }

  updateDonorLocation(donorId, lat, lon) {
    const donor = this.getDonorById(donorId);
    if (!donor) return null;
    donor.lat = lat;
    donor.lon = lon;
    this.saveDonor(donor);
    return donor;
  }

  // Update Daily Fitness Check-in
  updateDailyFitness(donorId, fitnessData) {
    const donor = this.getDonorById(donorId);
    if (!donor) return null;

    const { sleepHours, hydrationLiters, feelingEnergetic, hasFeverOrCold, takingMedication, vitalsNotes } = fitnessData;

    let score = 100;
    if (sleepHours < 6) score -= 15;
    if (hydrationLiters < 2) score -= 10;
    if (!feelingEnergetic) score -= 15;
    if (hasFeverOrCold) score -= 40;
    if (takingMedication) score -= 25;

    const cooldownDays = donor.cooldownDaysRemaining || 0;
    const isFit = (cooldownDays === 0) && (score >= 75) && !hasFeverOrCold && !takingMedication;

    const updated = {
      ...donor,
      fitnessReadinessScore: Math.max(20, Math.min(100, score)),
      isMedicallyFit: isFit,
      dailyFitnessStatus: isFit 
        ? `Cleared & Peak Fitness (${score}% readiness)`
        : (cooldownDays > 0 ? `In cooldown (${cooldownDays} days left)` : `Temporarily ineligible: ${vitalsNotes || 'Needs rest'}`),
      lastDailyCheckin: new Date().toISOString()
    };

    if (isFit) {
      updated.pointsBalance = (updated.pointsBalance || 0) + 25;
      updated.pointsEarnedLifetime = (updated.pointsEarnedLifetime || 0) + 25;
    }

    this.saveDonor(updated);
    if (window.soundFX) window.soundFX.playSuccessChime();
    return updated;
  }

  // Hospitals
  getHospitals() {
    return this._get(STORAGE_KEYS.HOSPITALS, SEED_HOSPITALS);
  }

  getHospitalById(id) {
    return this.getHospitals().find(h => h.id === id) || null;
  }

  updateHospitalInventory(hospitalId, bloodGroup, deltaUnits) {
    const hospitals = this.getHospitals();
    const h = hospitals.find(item => item.id === hospitalId);
    if (!h) return null;
    if (!h.inventory) h.inventory = { 'O+': 5, 'O-': 2, 'A+': 5, 'A-': 2, 'B+': 5, 'B-': 2, 'AB+': 2, 'AB-': 1 };
    h.inventory[bloodGroup] = Math.max(0, (h.inventory[bloodGroup] || 0) + deltaUnits);
    this._set(STORAGE_KEYS.HOSPITALS, hospitals);
    return h.inventory;
  }

  // Blood Requests
  getRequests() {
    return this._get(STORAGE_KEYS.REQUESTS, SEED_REQUESTS);
  }

  getRequestById(id) {
    return this.getRequests().find(r => r.id === id) || null;
  }

  createRequest(reqData) {
    const requests = this.getRequests();
    const newReq = {
      id: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      unitsFulfilled: 0,
      responses: [],
      ...reqData
    };
    requests.unshift(newReq);
    this._set(STORAGE_KEYS.REQUESTS, requests);
    if (window.soundFX && reqData.urgency === 'CRITICAL') {
      window.soundFX.playEmergencySiren();
    }
    return newReq;
  }

  fulfillRequest(requestId) {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index >= 0) {
      requests[index].status = 'FULFILLED';
      requests[index].unitsFulfilled = requests[index].unitsNeeded;
      this._set(STORAGE_KEYS.REQUESTS, requests);
      return requests[index];
    }
    return null;
  }

  // Hospital Visit Verification & Donation Completion
  verifyHospitalDonation(donorId, requestId, hospitalData) {
    const donor = this.getDonorById(donorId);
    if (!donor) throw new Error('Donor profile not found.');

    const POINTS_AWARDED = 500;
    const todayStr = new Date().toISOString().split('T')[0];

    const updatedDonor = {
      ...donor,
      lastDonationDate: todayStr,
      cooldownDaysRemaining: 56,
      isMedicallyFit: false,
      dailyFitnessStatus: 'Post-donation recovery window (56 days remaining)',
      totalDonations: (donor.totalDonations || 0) + 1,
      pointsBalance: (donor.pointsBalance || 0) + POINTS_AWARDED,
      pointsEarnedLifetime: (donor.pointsEarnedLifetime || 0) + POINTS_AWARDED,
      hemoglobin: hospitalData.hemoglobin || donor.hemoglobin,
      bloodPressure: hospitalData.bloodPressure || donor.bloodPressure,
      activePass: null
    };
    this.saveDonor(updatedDonor);

    // Update Hospital Inventory (+1 unit)
    if (hospitalData.hospitalId) {
      this.updateHospitalInventory(hospitalData.hospitalId, donor.bloodGroup, 1);
    }

    if (requestId) {
      const request = this.getRequestById(requestId);
      if (request) {
        request.unitsFulfilled = (request.unitsFulfilled || 0) + 1;
        if (request.unitsFulfilled >= request.unitsNeeded) {
          request.status = 'FULFILLED';
        }
        const reqs = this.getRequests();
        const rIndex = reqs.findIndex(r => r.id === requestId);
        if (rIndex >= 0) reqs[rIndex] = request;
        this._set(STORAGE_KEYS.REQUESTS, reqs);
      }
    }

    if (window.soundFX) {
      window.soundFX.playSuccessChime();
    }

    return {
      success: true,
      donor: updatedDonor,
      pointsAwarded: POINTS_AWARDED,
      cooldownDays: 56,
      verificationId: 'VERIF-' + Math.floor(10000 + Math.random() * 90000)
    };
  }

  // Rewards & Redemption
  getRewardsCatalog() {
    return this._get(STORAGE_KEYS.REWARDS_CATALOG, SEED_REWARDS);
  }

  getRedemptions() {
    return this._get(STORAGE_KEYS.REDEMPTIONS, SEED_REDEMPTIONS);
  }

  redeemBenefit(donorId, rewardId) {
    const donor = this.getDonorById(donorId);
    if (!donor) throw new Error('Donor not found.');

    const reward = this.getRewardsCatalog().find(r => r.id === rewardId);
    if (!reward) throw new Error('Medical reward benefit not found.');

    if (donor.pointsBalance < reward.pointsRequired) {
      throw new Error(`Insufficient points balance. You have ${donor.pointsBalance} pts, required: ${reward.pointsRequired} pts.`);
    }

    donor.pointsBalance -= reward.pointsRequired;
    this.saveDonor(donor);

    const redemptions = this.getRedemptions();
    const voucherCode = `${reward.category.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${donor.bloodGroup.replace('+', 'P').replace('-', 'N')}`;
    const newRedemption = {
      id: 'RED-' + Math.floor(1000 + Math.random() * 9000),
      donorId,
      donorName: donor.name,
      rewardId: reward.id,
      rewardTitle: reward.title,
      category: reward.category,
      pointsSpent: reward.pointsRequired,
      voucherCode,
      redeemedAt: new Date().toISOString(),
      status: 'ACTIVE',
      qrCodeText: `BLOODCONNECT-VAULT:${voucherCode}:${donorId}:${reward.id}`
    };

    redemptions.unshift(newRedemption);
    this._set(STORAGE_KEYS.REDEMPTIONS, redemptions);

    if (window.soundFX) {
      window.soundFX.playCoinClink();
    }

    return newRedemption;
  }

  getCurrentUser() {
    return this._get(STORAGE_KEYS.CURRENT_USER, { role: 'donor', donorId: 'DONOR-101' });
  }

  setCurrentUser(userObj) {
    this._set(STORAGE_KEYS.CURRENT_USER, userObj);
  }
}

window.bloodData = new BloodDataStore();
