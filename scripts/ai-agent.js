/**
 * BloodConnect — BloodBot AI Medical & Donation Assistant
 * Interactive Natural Language Processing & Knowledge Engine for Blood Donation,
 * Hospital Contacts, Blood Group Compatibility, Volume (ml) Requirements, and FAQs.
 */

(function () {
  'use strict';

  // 1. Comprehensive Medical Knowledge Base
  const KNOWLEDGE_BASE = {
    // A. Blood Donation Volume (ml)
    volume: {
      keywords: ['volume', 'ml', 'how much ml', 'quantity', 'amount of blood', 'how many ml', 'how much blood', 'packet size', 'unit size', 'how many units'],
      title: '🩸 Standard Blood Donation Volume (ml)',
      badge: '350 ml – 450 ml Standard',
      answer: `
        <strong>Standard Whole Blood Donation Volumes:</strong><br>
        • <strong>350 ml</strong>: Collected from donors weighing <strong>45 kg to 55 kg</strong>.<br>
        • <strong>450 ml</strong>: Collected from donors weighing <strong>55 kg and above</strong>.<br>
        • An additional <strong>~30 ml</strong> is collected in separate sample tubes for infectious disease screening (HIV, Hepatitis B & C, Syphilis, Malaria) and cross-matching.<br><br>
        <strong>Is it safe?</strong><br>
        Yes! The average adult body has about <strong>4.5 to 5.5 Liters</strong> (4,500 – 5,500 ml) of blood. A standard donation takes only <strong>8% to 10%</strong> of your total blood volume.<br><br>
        <strong>Regeneration Timeline:</strong><br>
        • <strong>Plasma & fluid volume:</strong> Fully restored within <strong>24 to 48 hours</strong> with proper hydration.<br>
        • <strong>Red blood cells (Hemoglobin):</strong> Fully regenerated in <strong>4 to 8 weeks</strong> by the bone marrow.
      `,
      actions: [
        { label: '🩺 Check Eligibility', query: 'What are the eligibility criteria for blood donation?' },
        { label: '⏱️ Donation Gap', query: 'What is the time gap between blood donations?' }
      ]
    },

    // B. Donation Intervals & Frequency Gap
    intervals: {
      keywords: ['gap', 'interval', 'how often', 'frequency', 'time period', 'how many months', 'gap between', 'when can i donate again', 'next donation', 'cooldown'],
      title: '⏱️ Recommended Time Gap Between Donations',
      badge: 'Men: 3 Months • Women: 4 Months',
      answer: `
        <strong>Mandatory Donation Intervals (India National Blood Transfusion Council):</strong><br>
        • <strong>👨 Male Donors:</strong> Every <strong>90 Days (3 Months)</strong> for Whole Blood.<br>
        • <strong>👩 Female Donors:</strong> Every <strong>120 Days (4 Months)</strong> for Whole Blood (due to monthly iron cycle).<br>
        • <strong>🧬 Platelet Donors (Apheresis):</strong> Every <strong>14 Days (2 Weeks)</strong>, up to a maximum of 24 times per year.<br>
        • <strong>🧪 Plasma Donors:</strong> Every <strong>28 Days</strong>.<br><br>
        <strong>Why the wait?</strong><br>
        This interval ensures that your body has completely replenished its iron stores (ferritin) and hemoglobin levels before the next donation.
      `,
      actions: [
        { label: '🩸 Volume in ml', query: 'How much ml of blood is required in a donation?' },
        { label: '🧬 Open Donor Hub', href: './donor.html' }
      ]
    },

    // C. KIMS Hospitals Secunderabad
    kims_hospital: {
      keywords: ['kims', 'kims hospital', 'kims secunderabad', 'kims number', 'kims helpline', 'kims contact', 'kims phone', 'begumpet hospital'],
      title: '🏥 KIMS Hospitals Secunderabad (Begumpet)',
      badge: '📞 +91 97015 16959 (Active)',
      answer: `
        <strong>KIMS Hospitals Secunderabad Details:</strong><br>
        • 📞 <strong>Emergency Helpline & Blood Bank:</strong> <a href="tel:+919701516959" style="color: var(--accent-emerald); font-weight: 700;">+91 97015 16959</a><br>
        • 📍 <strong>Address:</strong> 1-8-31/1, Minister Road, Krishna Nagar Colony, Begumpet, Secunderabad - 500003<br>
        • 🚪 <strong>Entrance Gate:</strong> <strong>Gate A (Main Casualty Wing, 1st Floor Blood Bank)</strong><br>
        • 🩺 <strong>Blood Bank Head:</strong> Dr. Radhika Reddy (Emergency & Surgery Division)<br>
        • 🚑 <strong>GPS Coordinates:</strong> 17.4375° N, 78.4878° E
      `,
      actions: [
        { label: '📞 Call KIMS (+91 97015 16959)', href: 'tel:+919701516959' },
        { label: '💬 WhatsApp Desk', href: 'https://wa.me/919701516959?text=Hello%20KIMS%20Blood%20Bank%20Reception%2C%20I%20am%20inquiring%20about%20blood%20donation%20availability.' },
        { label: '🧭 GPS Route', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4375,78.4878' }
      ]
    },

    // D. Apollo Hospitals Jubilee Hills
    apollo_hospital: {
      keywords: ['apollo', 'apollo hospital', 'apollo jubilee hills', 'apollo number', 'apollo contact', 'apollo helpline', 'apollo phone'],
      title: '🏥 Apollo Hospitals Jubilee Hills',
      badge: '📞 +91 87121 27287 (Active)',
      answer: `
        <strong>Apollo Hospitals Jubilee Hills Details:</strong><br>
        • 📞 <strong>Emergency Helpline & Blood Bank:</strong> <a href="tel:+918712127287" style="color: var(--accent-emerald); font-weight: 700;">+91 87121 27287</a><br>
        • 📍 <strong>Address:</strong> Road No. 72, Opp. Bharatiya Vidya Bhavan, Jubilee Hills, Hyderabad - 500033<br>
        • 🚪 <strong>Entrance Gate:</strong> <strong>Gate 2 (Trauma Center & Blood Bank Reception, Ground Floor)</strong><br>
        • 🩺 <strong>Blood Bank Head:</strong> Dr. K. S. Rao (Critical Trauma Care & Blood Bank)<br>
        • 🚑 <strong>GPS Coordinates:</strong> 17.4156° N, 78.4116° E
      `,
      actions: [
        { label: '📞 Call Apollo (+91 87121 27287)', href: 'tel:+918712127287' },
        { label: '💬 WhatsApp Desk', href: 'https://wa.me/918712127287?text=Hello%20Apollo%20Hospitals%20Blood%20Bank%20Reception%2C%20I%20am%20ready%20to%20donate%20blood.' },
        { label: '🧭 GPS Route', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4156,78.4116' }
      ]
    },

    // E. Other Network Hospitals (Yashoda, CARE, Continental)
    all_hospitals: {
      keywords: ['hospitals', 'all hospitals', 'hospital list', 'hospital numbers', 'yashoda', 'care hospital', 'continental', 'blood bank numbers', 'helpline'],
      title: '🏥 Hyderabad Partner Hospital Directory',
      badge: '5 Verified Hospitals Active',
      answer: `
        <strong>Verified Blood Bank & Emergency Desks in Hyderabad:</strong><br><br>
        1. <strong>Apollo Hospitals Jubilee Hills</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Gate 2 Trauma Center, Ground Floor<br><br>
        2. <strong>KIMS Hospitals Secunderabad (Begumpet)</strong><br>
        &bull; 📞 <strong>+91 97015 16959</strong> &bull; 🚪 Gate A Casualty, 1st Floor<br><br>
        3. <strong>Yashoda Hospitals Somajiguda</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Casualty Gate 3, Counter #02<br><br>
        4. <strong>CARE Hospitals Banjara Hills</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Main Tower Gate 1, Room 102<br><br>
        5. <strong>Continental Hospitals Gachibowli</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Casualty Gate 4 (Follow Red Line)
      `,
      actions: [
        { label: '🏥 KIMS Details', query: 'What is the contact number for KIMS Hospital?' },
        { label: '🏥 Apollo Details', query: 'Where is Apollo Jubilee Hills emergency gate?' }
      ]
    },

    // F. Blood Group Compatibility (General + Specifics)
    compatibility_o_plus: {
      keywords: ['o+', 'o positive', 'donate to o+', 'who can receive o+', 'o+ can give to', 'o+ blood'],
      title: '🩸 O+ (O Positive) Compatibility Profile',
      badge: 'Most Common Lifesaver Blood Group',
      answer: `
        <strong>O+ (O Positive) Blood Compatibility:</strong><br>
        • <strong>Can GIVE Blood To:</strong> <span class="ai-tag">O+</span>, <span class="ai-tag">A+</span>, <span class="ai-tag">B+</span>, <span class="ai-tag">AB+</span><br>
        • <strong>Can RECEIVE Blood From:</strong> <span class="ai-tag">O+</span>, <span class="ai-tag">O-</span><br><br>
        <strong>Importance:</strong> O+ is the most transfused blood type because roughly 38% of patients are O+. While not a universal red cell donor (since it carries the Rh antigen), it can save over 80% of positive-type recipients!
      `,
      actions: [
        { label: '🩸 O- (Universal Donor)', query: 'Tell me about O- universal donor' },
        { label: '🧬 Test Compatibility Matrix', href: './index.html#matrix-section' }
      ]
    },

    compatibility_o_minus: {
      keywords: ['o-', 'o negative', 'universal donor', 'who is universal donor', 'who can o- donate to', 'o negative blood'],
      title: '🩸 O- (O Negative) — Universal Red Blood Cell Donor',
      badge: '🚨 Critical Emergency Universal Donor',
      answer: `
        <strong>O- (O Negative) Blood Compatibility:</strong><br>
        • <strong>Can GIVE Blood To:</strong> <strong>EVERYONE!</strong> (<span class="ai-tag">O+</span>, <span class="ai-tag">O-</span>, <span class="ai-tag">A+</span>, <span class="ai-tag">A-</span>, <span class="ai-tag">B+</span>, <span class="ai-tag">B-</span>, <span class="ai-tag">AB+</span>, <span class="ai-tag">AB-</span>)<br>
        • <strong>Can RECEIVE Blood From:</strong> <span class="ai-tag">O- ONLY</span><br><br>
        <strong>Why is O- essential?</strong><br>
        O- lacks A, B, and Rh antigens, meaning any patient's immune system will accept it without hemolytic reaction. It is loaded in trauma ambulances and emergency ER beds before blood typing is completed.
      `,
      actions: [
        { label: '🩸 AB+ (Universal Recipient)', query: 'Tell me about AB+ universal recipient' },
        { label: '⚡ Emergency Requests', href: './donor.html' }
      ]
    },

    compatibility_ab_plus: {
      keywords: ['ab+', 'ab positive', 'universal recipient', 'who is universal recipient', 'ab+ receive from', 'ab+ blood'],
      title: '🩸 AB+ (AB Positive) — Universal Recipient',
      badge: '👑 Can Receive From All Blood Groups',
      answer: `
        <strong>AB+ (AB Positive) Blood Compatibility:</strong><br>
        • <strong>Can RECEIVE Blood From:</strong> <strong>ALL 8 GROUPS!</strong> (<span class="ai-tag">O+</span>, <span class="ai-tag">O-</span>, <span class="ai-tag">A+</span>, <span class="ai-tag">A-</span>, <span class="ai-tag">B+</span>, <span class="ai-tag">B-</span>, <span class="ai-tag">AB+</span>, <span class="ai-tag">AB-</span>)<br>
        • <strong>Can GIVE Red Blood Cells To:</strong> <span class="ai-tag">AB+ ONLY</span><br>
        • <strong>Plasma Superpower:</strong> AB+ individuals are <strong>Universal Plasma Donors</strong> — their plasma can be given to all blood groups!
      `,
      actions: [
        { label: '🩸 Full Compatibility Matrix', query: 'Show me the blood compatibility matrix' },
        { label: '🪙 Medical Points Vault', href: './rewards.html' }
      ]
    },

    compatibility_all: {
      keywords: ['compatibility', 'matrix', 'blood group chart', 'who can give to who', 'blood matching', 'blood types', 'a+', 'a-', 'b+', 'b-', 'ab-'],
      title: '🧬 Complete Blood Compatibility Matrix',
      badge: '8 Blood Group Profiles',
      answer: `
        <strong>Summary of Blood Type Compatibility:</strong><br><br>
        • <strong>O-</strong>: Gives to <strong>All Groups</strong> | Receives only from <strong>O-</strong><br>
        • <strong>O+</strong>: Gives to <strong>O+, A+, B+, AB+</strong> | Receives from <strong>O+, O-</strong><br>
        • <strong>A-</strong>: Gives to <strong>A+, A-, AB+, AB-</strong> | Receives from <strong>A-, O-</strong><br>
        • <strong>A+</strong>: Gives to <strong>A+, AB+</strong> | Receives from <strong>A+, A-, O+, O-</strong><br>
        • <strong>B-</strong>: Gives to <strong>B+, B-, AB+, AB-</strong> | Receives from <strong>B-, O-</strong><br>
        • <strong>B+</strong>: Gives to <strong>B+, AB+</strong> | Receives from <strong>B+, B-, O+, O-</strong><br>
        • <strong>AB-</strong>: Gives to <strong>AB+, AB-</strong> | Receives from <strong>AB-, A-, B-, O-</strong><br>
        • <strong>AB+</strong>: Gives only to <strong>AB+</strong> | Receives from <strong>All Groups (Universal)</strong>
      `,
      actions: [
        { label: '🩸 Volume in ml', query: 'How much ml of blood is required in a donation?' },
        { label: '🧭 3D Radar Match', href: './radar.html' }
      ]
    },

    // G. Medical Eligibility & Health Criteria
    eligibility: {
      keywords: ['eligible', 'eligibility', 'can i donate', 'criteria', 'age limit', 'weight', 'hemoglobin', 'who can donate', 'requirements', 'rules'],
      title: '🩺 General Blood Donation Eligibility Criteria',
      badge: 'Age 18–65 • Weight 45kg+',
      answer: `
        <strong>Who is medically eligible to donate blood?</strong><br>
        1. <strong>Age:</strong> Between <strong>18 and 65 years</strong>.<br>
        2. <strong>Weight:</strong> Minimum <strong>45 kg</strong> (for 350ml) or <strong>50+ kg</strong> (for 450ml).<br>
        3. <strong>Hemoglobin:</strong> Minimum <strong>12.5 g/dL</strong> (tested for free on-site before donation).<br>
        4. <strong>Blood Pressure:</strong> Systolic: 100–140 mmHg, Diastolic: 60–90 mmHg.<br>
        5. <strong>Pulse:</strong> 60 to 100 beats per minute, regular.<br>
        6. <strong>Body Temperature:</strong> Normal (no active cold, fever, cough, or infections in the past 48 hours).
      `,
      actions: [
        { label: '💊 Medicine / Alcohol Rules', query: 'Can I donate after taking medicine or alcohol?' },
        { label: '🎨 Tattoo & Piercing Rules', query: 'Can I donate if I got a tattoo or piercing?' }
      ]
    },

    // H. Medications, Alcohol, Smoking, Lifestyle
    medications_lifestyle: {
      keywords: ['medicine', 'medication', 'alcohol', 'drinking', 'smoking', 'cigarette', 'antibiotics', 'aspirin', 'paracetamol', 'coffee', 'beer'],
      title: '💊 Lifestyle & Medication Guidelines Before Donation',
      badge: 'Safe Donation Protocols',
      answer: `
        <strong>Before You Donate Blood:</strong><br>
        • <strong>🍺 Alcohol:</strong> Must NOT consume alcohol for at least <strong>24 hours</strong> prior to donation.<br>
        • <strong>🚬 Smoking:</strong> Avoid smoking for at least <strong>2 hours before</strong> and <strong>2 hours after</strong> donation.<br>
        • <strong>💊 Antibiotics:</strong> Wait until you have completely finished the course + at least <strong>48 hours symptom-free</strong>.<br>
        • <strong>💊 Aspirin / Painkillers:</strong> If donating <strong>platelets</strong>, avoid aspirin for 48 hours. For whole blood, mild paracetamol is acceptable if fever-free.<br>
        • <strong>🩺 Blood Pressure / Thyroid Meds:</strong> If your BP or Thyroid is normal and well-controlled on daily medication, you CAN donate!<br>
        • <strong>☕ Coffee / Tea:</strong> Allowed, but drink plenty of water as caffeine is a mild diuretic.
      `,
      actions: [
        { label: '🥗 Pre-Donation Diet', query: 'What should I eat before donating blood?' },
        { label: '🎨 Tattoo / Piercing', query: 'Can I donate if I got a tattoo or piercing?' }
      ]
    },

    // I. Tattoos, Piercings, Dental, Pregnancy
    tattoo_special_cases: {
      keywords: ['tattoo', 'piercing', 'dental', 'teeth', 'pregnancy', 'pregnant', 'breastfeeding', 'surgery', 'period', 'menstruation'],
      title: '🎨 Tattoos, Piercings, Surgeries & Special Conditions',
      badge: 'Safety Deferral Periods',
      answer: `
        <strong>Medical Deferral Guidelines:</strong><br>
        • <strong>🎨 Tattoos & Body Piercings:</strong> Must wait <strong>6 to 12 months</strong> after getting inked or pierced (to rule out Hepatitis risk).<br>
        • <strong>🦷 Dental Treatment:</strong> Wait <strong>24 hours</strong> after minor cleaning/filling; wait <strong>72 hours</strong> after tooth extraction/root canal.<br>
        • <strong>🤰 Pregnancy & Breastfeeding:</strong> Deferred during pregnancy and for <strong>6 to 12 months</strong> postpartum / while actively breastfeeding.<br>
        • <strong>🩸 Menstruation (Periods):</strong> You CAN donate during your period if you feel energetic and your hemoglobin is ≥ 12.5 g/dL.<br>
        • <strong>🏥 Major Surgery:</strong> Wait <strong>6 months</strong> after major surgery with full recovery.
      `,
      actions: [
        { label: '🩺 General Eligibility', query: 'What are the eligibility criteria for blood donation?' },
        { label: '⏱️ Donation Gap', query: 'What is the time gap between blood donations?' }
      ]
    },

    // J. Pre- and Post-Donation Diet & Recovery
    diet_guidelines: {
      keywords: ['food', 'diet', 'eat', 'drink', 'what to eat', 'fasting', 'empty stomach', 'after donation', 'care', 'recovery'],
      title: '🥗 Pre & Post-Donation Diet and Care',
      badge: 'Optimal Recovery Tips',
      answer: `
        <strong>Pre-Donation (Before You Go):</strong><br>
        1. <strong>Do NOT donate on an empty stomach!</strong> Eat a wholesome, iron-rich light meal (rice, dal, fruits, idli, oats) 2–3 hours before.<br>
        2. Drink <strong>500 ml (2 large glasses) of water</strong> 30 minutes before donating to keep blood volume high and prevent dizziness.<br>
        3. Avoid fatty or fried foods (excess fat can make blood samples cloudy).<br><br>
        <strong>Post-Donation (After Donating):</strong><br>
        1. Rest at the donor station for <strong>10 to 15 minutes</strong> with elevated feet.<br>
        2. Enjoy the complimentary juice, snacks, and fluids provided.<br>
        3. Keep the bandage dry and intact for <strong>4 to 6 hours</strong>.<br>
        4. Avoid heavy weight lifting, strenuous gym workouts, or running for the next <strong>24 hours</strong>.
      `,
      actions: [
        { label: '🩸 Volume in ml', query: 'How much ml of blood is required in a donation?' },
        { label: '🪙 Medical Points Vault', href: './rewards.html' }
      ]
    },

    // K. Digital QR Check-In Pass & Fast-Track Code
    checkin_pass: {
      keywords: ['pass', 'qr', 'qr code', 'check in', 'hospital pass', 'pin', 'code', 'fast track', 'how to get pass', 'verification code'],
      title: '📱 Fast-Track Digital Hospital Check-In Pass & QR',
      badge: 'Instant QR & 6-Digit PIN',
      answer: `
        <strong>How the Digital Check-In Pass Works:</strong><br>
        1. Open the <strong><a href="./donor.html" style="color: var(--secondary-glow); text-decoration: underline;">Donor Hub</a></strong>.<br>
        2. Under "Live Emergency Matches", click <strong>"Accept & Generate Pass"</strong> on any patient request.<br>
        3. The system generates a <strong>Dynamic Cyber QR Code</strong> + a <strong>6-digit Fast-Track Verification PIN</strong> (e.g., <code>748-912</code>).<br>
        4. When you arrive at the hospital entrance (e.g. KIMS Gate A or Apollo Gate 2), show this pass to the receptionist for priority bypass entry without long queue forms!<br>
        5. You can also click <strong>"💬 WhatsApp Reception"</strong> to dispatch your ETA in advance.
      `,
      actions: [
        { label: '🧬 Open Donor Hub', href: './donor.html' },
        { label: '🏥 Hospital Numbers', query: 'What are the helpline numbers for partner hospitals?' }
      ]
    },

    // L. Medical Benefit Points Vault & Rewards
    rewards_vault: {
      keywords: ['points', 'rewards', 'reward', 'vault', 'redeem', 'coins', 'benefits', 'streak', 'earn points', 'how to redeem', 'discount'],
      title: '🪙 Medical Reward Points & Health Vault',
      badge: '100% Free Health Benefits',
      answer: `
        <strong>Earn & Redeem Medical Benefit Points:</strong><br><br>
        <strong>How to Earn Points:</strong><br>
        • 🎁 <strong>+500 Points</strong>: Instant Welcome Bonus on new donor registration.<br>
        • 🔥 <strong>+25 Points</strong>: Daily medical fitness check-in streak on the Donor Hub.<br>
        • 🩸 <strong>+500 to +1000 Points</strong>: Credited for every successful hospital blood donation.<br><br>
        <strong>How to Redeem:</strong><br>
        Visit the <strong><a href="./rewards.html" style="color: var(--accent-emerald); text-decoration: underline;">Medical Points Vault</a></strong> to redeem points for:<br>
        • 🧪 <em>Full Body Blood & Lipid Profile (400 pts)</em><br>
        • 💊 <em>Apollo / MedPlus Pharmacy 25% Discount Voucher (250 pts)</em><br>
        • 🚑 <em>1-Year 24/7 Emergency Ambulance Priority Cover (500 pts)</em><br>
        • 👁️ <em>Comprehensive Vision & Dental Checkup (350 pts)</em>
      `,
      actions: [
        { label: '🪙 Go to Points Vault', href: './rewards.html' },
        { label: '🧬 Daily Fitness Check-in', href: './donor.html' }
      ]
    }
  };

  // 2. Default Quick FAQ Chips (Recently Asked Questions)
  const QUICK_FAQS = [
    { label: '🩸 How much ml is required on a donation?', query: 'How much ml of blood is required in a donation?' },
    { label: '👥 Who can donate to O+ blood?', query: 'Who can donate to O+ blood?' },
    { label: '🏥 What is the helpline for KIMS Hospital?', query: 'What is the contact number for KIMS Hospital?' },
    { label: '⏱️ What is the time gap between donations?', query: 'What is the time gap between blood donations?' },
    { label: '💊 Can I donate after medicine or alcohol?', query: 'Can I donate after taking medicine or alcohol?' },
    { label: '🪙 How do medical reward points work?', query: 'How do medical reward points work?' },
    { label: '🚪 Where is Apollo Jubilee Hills gate?', query: 'Where is Apollo Jubilee Hills emergency gate?' },
    { label: '📱 How to get Digital QR Check-In Pass?', query: 'How does the digital QR check in pass work?' }
  ];

  // 3. NLP Query Matcher Engine
  class BloodBotBrain {
    static matchQuery(queryText) {
      const q = (queryText || '').toLowerCase().trim();
      if (!q) return null;

      let bestMatch = null;
      let highestScore = 0;

      // Score matching across all knowledge categories
      for (const [key, item] of Object.entries(KNOWLEDGE_BASE)) {
        let score = 0;

        for (const kw of item.keywords) {
          if (q.includes(kw)) {
            score += kw.length * 3; // longer keyword exact matches score higher
          }
        }

        // Direct words token matching
        const qWords = q.split(/\s+/);
        for (const word of qWords) {
          if (word.length > 2) {
            for (const kw of item.keywords) {
              if (kw.includes(word)) score += 1;
            }
          }
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      // If confidence score threshold passed
      if (highestScore >= 3 && bestMatch) {
        return bestMatch;
      }

      // Fallback response with suggested actions
      return {
        title: '🤖 BloodBot Medical Assistant',
        badge: 'General Assistance',
        answer: `
          I understand you are asking: <em>"${escapeHtml(queryText)}"</em>.<br><br>
          While I might not have the exact medical answer for that specific phrasing, here are the most frequently requested topics I can instantly help you with:<br><br>
          • 🩸 <strong>Donation Volume:</strong> Standard donation is <strong>350 ml to 450 ml</strong> (~8-10% of total volume).<br>
          • ⏱️ <strong>Interval:</strong> 3 months for men, 4 months for women.<br>
          • 🏥 <strong>Helplines:</strong> KIMS Secunderabad (<code>+91 97015 16959</code>), Apollo Jubilee Hills (<code>+91 87121 27287</code>).<br>
          • 🧬 <strong>Compatibility:</strong> O- is Universal Donor, AB+ is Universal Recipient.
        `,
        actions: [
          { label: '🩸 Volume (ml)', query: 'How much ml of blood is required in a donation?' },
          { label: '🏥 KIMS Number', query: 'What is the contact number for KIMS Hospital?' },
          { label: '👥 Compatibility', query: 'Show me the blood compatibility matrix' },
          { label: '🧬 Donor Hub', href: './donor.html' }
        ]
      };
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 4. Voice Synthesis & Speech Recognition Helpers
  let isSpeechEnabled = false;
  function speakResponse(text) {
    if (!isSpeechEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      // Strip HTML tags for clean speech
      const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }

  // 5. Build and Inject the Floating Cyber AI Widget into the DOM
  function createBloodBotWidget() {
    if (document.getElementById('bloodbot-floating-container')) return;

    const container = document.createElement('div');
    container.id = 'bloodbot-floating-container';
    container.className = 'bloodbot-container';

    container.innerHTML = `
      <!-- Floating AI Launcher Trigger Button -->
      <button type="button" id="bloodbot-launcher" class="bloodbot-launcher-btn" aria-label="Open BloodBot AI Assistant" title="Ask BloodBot AI about blood donation, ml required, hospital helplines, or compatibility">
        <div class="bloodbot-launcher-avatar">
          <span class="bot-icon">🤖</span>
          <span class="bot-status-dot"></span>
        </div>
        <div class="bloodbot-launcher-label">
          <span class="bot-title-small">Ask AI Agent</span>
          <span class="bot-subtitle-small">Donation & Hospitals</span>
        </div>
        <div class="bloodbot-pulse-ring"></div>
      </button>

      <!-- BloodBot Main Chat Modal / Window -->
      <div id="bloodbot-chat-window" class="bloodbot-chat-window" role="dialog" aria-labelledby="bloodbot-heading" aria-hidden="true">
        <!-- Chat Header -->
        <div class="bloodbot-header">
          <div class="bloodbot-header-left">
            <div class="bloodbot-avatar-active">
              <span>🩺</span>
              <span class="bot-online-badge"></span>
            </div>
            <div>
              <div id="bloodbot-heading" class="bloodbot-title">BloodBot AI Assistant</div>
              <div class="bloodbot-status-text">Instant Medical & Hospital Guide • Online</div>
            </div>
          </div>
          <div class="bloodbot-header-actions">
            <button type="button" class="bloodbot-btn-icon" id="bloodbot-voice-toggle" title="Toggle Voice Read-Aloud" aria-label="Toggle Voice Read Aloud">
              <span id="bloodbot-voice-icon">🔇</span>
            </button>
            <button type="button" class="bloodbot-btn-icon" id="bloodbot-clear-btn" title="Clear Conversation" aria-label="Clear chat">
              <span>🗑️</span>
            </button>
            <button type="button" class="bloodbot-btn-icon" id="bloodbot-close-btn" title="Close AI Assistant" aria-label="Close Assistant">
              <span>✕</span>
            </button>
          </div>
        </div>

        <!-- Quick FAQ Category Chips Section -->
        <div class="bloodbot-faqs-container">
          <div class="bloodbot-faqs-label">⚡ Recently Asked Questions:</div>
          <div class="bloodbot-faqs-scroll" id="bloodbot-faqs-list">
            ${QUICK_FAQS.map(faq => `
              <button type="button" class="bloodbot-faq-chip" data-query="${escapeHtml(faq.query)}">
                ${faq.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Messages Flow Scroll Area -->
        <div class="bloodbot-messages-area" id="bloodbot-messages-area">
          <!-- Initial Welcome Greeting Bubble -->
          <div class="bloodbot-msg bloodbot-msg-bot">
            <div class="bloodbot-msg-avatar">🤖</div>
            <div class="bloodbot-msg-content">
              <div class="bloodbot-msg-badge">🩸 Welcome to BloodBot AI</div>
              <div class="bloodbot-msg-body">
                Hello! I am your <strong>BloodConnect AI Medical & Hospital Assistant</strong>.<br><br>
                You can ask me anything about:
                <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
                  <li><strong>How much ml of blood is required</strong> in a donation</li>
                  <li><strong>Hospital helplines & gates</strong> (e.g. KIMS <code>9701516959</code>, Apollo)</li>
                  <li><strong>Blood group compatibility</strong> & Universal Donors (O-, AB+)</li>
                  <li><strong>Time gap & intervals</strong> between donations</li>
                  <li><strong>Eligibility, diet & medical fitness rules</strong></li>
                  <li><strong>Digital QR check-in pass</strong> & Reward Points</li>
                </ul>
                Tap a prompt above or type your question below!
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <form class="bloodbot-input-form" id="bloodbot-input-form">
          <button type="button" class="bloodbot-mic-btn" id="bloodbot-mic-btn" title="Voice Input (Speech-to-Text)" aria-label="Voice input">
            🎤
          </button>
          <input type="text" class="bloodbot-input-field" id="bloodbot-input-field" placeholder="Ask about ml required, KIMS helpline, compatibility..." autocomplete="off" required>
          <button type="submit" class="bloodbot-send-btn" id="bloodbot-send-btn" title="Send message" aria-label="Send message">
            <span>Send</span> ➔
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(container);
    initBloodBotEvents();
  }

  // 6. UI Events & Interactive Logic
  function initBloodBotEvents() {
    const launcher = document.getElementById('bloodbot-launcher');
    const chatWindow = document.getElementById('bloodbot-chat-window');
    const closeBtn = document.getElementById('bloodbot-close-btn');
    const clearBtn = document.getElementById('bloodbot-clear-btn');
    const voiceToggle = document.getElementById('bloodbot-voice-toggle');
    const voiceIcon = document.getElementById('bloodbot-voice-icon');
    const form = document.getElementById('bloodbot-input-form');
    const inputField = document.getElementById('bloodbot-input-field');
    const messagesArea = document.getElementById('bloodbot-messages-area');
    const faqsList = document.getElementById('bloodbot-faqs-list');
    const micBtn = document.getElementById('bloodbot-mic-btn');

    if (!launcher || !chatWindow) return;

    // Toggle Chat Window Open/Close
    const toggleChat = (open = null) => {
      const willOpen = open !== null ? open : !chatWindow.classList.contains('active');
      if (willOpen) {
        chatWindow.classList.add('active');
        chatWindow.setAttribute('aria-hidden', 'false');
        if (window.soundFX) window.soundFX.playRadarPing();
        setTimeout(() => inputField && inputField.focus(), 200);
      } else {
        chatWindow.classList.remove('active');
        chatWindow.setAttribute('aria-hidden', 'true');
      }
    };

    launcher.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    // Clear Conversation History
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear chat conversation history?')) {
        messagesArea.innerHTML = `
          <div class="bloodbot-msg bloodbot-msg-bot">
            <div class="bloodbot-msg-avatar">🤖</div>
            <div class="bloodbot-msg-content">
              <div class="bloodbot-msg-badge">Chat Reset</div>
              <div class="bloodbot-msg-body">
                Conversation cleared. How can I assist you with blood donation or hospital information today?
              </div>
            </div>
          </div>
        `;
      }
    });

    // Voice Read-Aloud Toggle
    voiceToggle.addEventListener('click', () => {
      isSpeechEnabled = !isSpeechEnabled;
      voiceIcon.textContent = isSpeechEnabled ? '🔊' : '🔇';
      voiceToggle.style.color = isSpeechEnabled ? 'var(--accent-emerald)' : '';
      if (isSpeechEnabled) {
        speakResponse('Voice output activated.');
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });

    // Handle Quick FAQ Chip clicks
    faqsList.addEventListener('click', (e) => {
      const chip = e.target.closest('.bloodbot-faq-chip');
      if (!chip) return;
      const query = chip.dataset.query;
      if (query) {
        handleUserQuery(query);
      }
    });

    // Handle Delegate click on Action Buttons inside Bot Responses
    messagesArea.addEventListener('click', (e) => {
      const btn = e.target.closest('.bloodbot-action-btn');
      if (!btn) return;
      const query = btn.dataset.query;
      const href = btn.dataset.href;
      if (query) {
        handleUserQuery(query);
      } else if (href) {
        if (href.startsWith('tel:') || href.startsWith('https:')) {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }
    });

    // Speech-to-Text Microphone Input (Web Speech API)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'en-IN';

      let isListening = false;
      micBtn.addEventListener('click', () => {
        if (isListening) {
          recognizer.stop();
          return;
        }
        try {
          recognizer.start();
          isListening = true;
          micBtn.classList.add('listening');
          micBtn.textContent = '🔴';
        } catch (err) {
          console.warn('Speech recognition start error:', err);
        }
      });

      recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputField.value = transcript;
        handleUserQuery(transcript);
      };

      recognizer.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        micBtn.textContent = '🎤';
      };

      recognizer.onerror = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        micBtn.textContent = '🎤';
      };
    } else {
      micBtn.style.display = 'none';
    }

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputField.value.trim();
      if (!text) return;
      inputField.value = '';
      handleUserQuery(text);
    });

    // Core Query Handler
    function handleUserQuery(userText) {
      // 1. Append User Message Bubble
      appendUserMessage(userText);

      // Play subtle chime
      if (window.soundFX) window.soundFX.playSuccessChime();

      // 2. Append Typing Indicator
      const typingId = appendTypingIndicator();

      // 3. Process & Match Query after brief natural delay (350ms)
      setTimeout(() => {
        removeTypingIndicator(typingId);
        const match = BloodBotBrain.matchQuery(userText);
        appendBotResponse(match);
      }, 400);
    }

    function appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-user';
      msgDiv.innerHTML = `
        <div class="bloodbot-msg-content">
          <div class="bloodbot-msg-body">${escapeHtml(text)}</div>
        </div>
        <div class="bloodbot-msg-avatar">👤</div>
      `;
      messagesArea.appendChild(msgDiv);
      scrollToBottom();
    }

    function appendTypingIndicator() {
      const id = 'typing-' + Date.now();
      const typingDiv = document.createElement('div');
      typingDiv.id = id;
      typingDiv.className = 'bloodbot-msg bloodbot-msg-bot typing';
      typingDiv.innerHTML = `
        <div class="bloodbot-msg-avatar">🤖</div>
        <div class="bloodbot-msg-content">
          <div class="bloodbot-typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      messagesArea.appendChild(typingDiv);
      scrollToBottom();
      return id;
    }

    function removeTypingIndicator(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }

    function appendBotResponse(data) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-bot';

      const actionsHtml = data.actions && data.actions.length > 0 ? `
        <div class="bloodbot-action-buttons">
          ${data.actions.map(act => `
            <button type="button" class="bloodbot-action-btn" ${act.query ? `data-query="${escapeHtml(act.query)}"` : ''} ${act.href ? `data-href="${escapeHtml(act.href)}"` : ''}>
              ${act.label}
            </button>
          `).join('')}
        </div>
      ` : '';

      msgDiv.innerHTML = `
        <div class="bloodbot-msg-avatar">🤖</div>
        <div class="bloodbot-msg-content">
          ${data.badge ? `<div class="bloodbot-msg-badge">${data.badge}</div>` : ''}
          ${data.title ? `<div class="bloodbot-msg-title">${data.title}</div>` : ''}
          <div class="bloodbot-msg-body">${data.answer}</div>
          ${actionsHtml}
        </div>
      `;

      messagesArea.appendChild(msgDiv);
      scrollToBottom();

      // Read aloud if enabled
      speakResponse(data.title + '. ' + data.answer);
    }

    function scrollToBottom() {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    // Expose global method to open BloodBot with custom preset query
    window.askBloodBot = (presetQuery) => {
      toggleChat(true);
      if (presetQuery) {
        setTimeout(() => handleUserQuery(presetQuery), 250);
      }
    };
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBloodBotWidget);
  } else {
    createBloodBotWidget();
  }
})();
