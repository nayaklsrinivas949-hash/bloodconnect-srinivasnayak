/**
 * BloodConnect — BloodBot AI Medical & Donation Assistant 2.0
 * Advanced Interactive Natural Language Processing, Medical Knowledge Engine,
 * Embedded Calculators, Visual Eligibility Wizard, Compatibility Matrix,
 * Proactive Teaser Pill, and Hospital Emergency Dispatch.
 */

(function () {
  'use strict';

  // 1. Comprehensive Medical Knowledge Base
  const KNOWLEDGE_BASE = {
    // A. Blood Donation Volume (ml)
    volume: {
      keywords: ['volume', 'ml', 'how much ml', 'quantity', 'amount of blood', 'how many ml', 'how much blood', 'packet size', 'unit size', 'how many units', 'calculator', 'calculate volume'],
      title: '🩸 Standard Blood Donation Volume (ml)',
      badge: '350 ml – 450 ml Standard',
      isTool: 'volume_calculator',
      answer: `
        <strong>Standard Whole Blood Donation Volumes:</strong><br>
        • <strong>350 ml</strong>: Collected from donors weighing <strong>45 kg to 55 kg</strong>.<br>
        • <strong>450 ml</strong>: Collected from donors weighing <strong>55 kg and above</strong>.<br>
        • An additional <strong>~30 ml</strong> is collected in separate sample tubes for safety screening (HIV, Hepatitis B & C, Syphilis, Malaria) and cross-matching.<br><br>
        <strong>Safety & Recovery:</strong><br>
        An average adult has <strong>4,500 – 5,500 ml</strong> of blood. A donation takes only <strong>8% to 10%</strong> of total volume.<br>
        • <strong>Plasma Fluid:</strong> Restored in <strong>24 to 48 hours</strong> with hydration.<br>
        • <strong>Red Cells (Hb):</strong> Replenished in <strong>4 to 8 weeks</strong>.
      `,
      actions: [
        { label: '🧮 Open Volume Calculator', tool: 'volume_calculator' },
        { label: '🩺 Check Eligibility', tool: 'eligibility_wizard' },
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
        • <strong>👩 Female Donors:</strong> Every <strong>120 Days (4 Months)</strong> for Whole Blood (to safeguard iron stores).<br>
        • <strong>🧬 Platelet Donors (Apheresis):</strong> Every <strong>14 Days (2 Weeks)</strong>, up to 24 times/year.<br>
        • <strong>🧪 Plasma Donors:</strong> Every <strong>28 Days</strong>.<br><br>
        <strong>Why the wait?</strong> Ensures full replenishment of bone marrow iron stores (ferritin) before your next donation.
      `,
      actions: [
        { label: '🩸 Volume in ml', query: 'How much ml of blood is required in a donation?' },
        { label: '🩺 10s Eligibility Check', tool: 'eligibility_wizard' },
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
      keywords: ['hospitals', 'all hospitals', 'hospital list', 'hospital numbers', 'yashoda', 'care hospital', 'continental', 'blood bank numbers', 'helpline', 'emergency desks'],
      title: '🏥 Hyderabad Partner Hospital Directory',
      badge: '5 Verified Hospitals Active',
      isTool: 'hospital_dispatch',
      answer: `
        <strong>Verified Blood Bank & Emergency Desks in Hyderabad:</strong><br><br>
        1. <strong>KIMS Hospitals Secunderabad (Begumpet)</strong><br>
        &bull; 📞 <strong>+91 97015 16959</strong> &bull; 🚪 Gate A Casualty, 1st Floor<br><br>
        2. <strong>Apollo Hospitals Jubilee Hills</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Gate 2 Trauma Center, Ground Floor<br><br>
        3. <strong>Yashoda Hospitals Somajiguda</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Casualty Gate 3, Counter #02<br><br>
        4. <strong>CARE Hospitals Banjara Hills</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Main Tower Gate 1, Room 102<br><br>
        5. <strong>Continental Hospitals Gachibowli</strong><br>
        &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 Casualty Gate 4 (Follow Red Line)
      `,
      actions: [
        { label: '🏥 Hospital Quick Dispatch Cards', tool: 'hospital_dispatch' },
        { label: '📞 Call KIMS (+91 97015 16959)', href: 'tel:+919701516959' },
        { label: '📞 Call Apollo (+91 87121 27287)', href: 'tel:+918712127287' }
      ]
    },

    // F. Blood Group Compatibility (General + Specifics)
    compatibility_o_plus: {
      keywords: ['o+', 'o positive', 'donate to o+', 'who can receive o+', 'o+ can give to', 'o+ blood'],
      title: '🩸 O+ (O Positive) Compatibility Profile',
      badge: 'Most Common Lifesaver Blood Group',
      isTool: 'compat_matrix:O+',
      answer: `
        <strong>O+ (O Positive) Blood Compatibility:</strong><br>
        • <strong>Can GIVE Blood To:</strong> <span class="ai-tag">O+</span>, <span class="ai-tag">A+</span>, <span class="ai-tag">B+</span>, <span class="ai-tag">AB+</span><br>
        • <strong>Can RECEIVE Blood From:</strong> <span class="ai-tag">O+</span>, <span class="ai-tag">O-</span><br><br>
        <strong>Importance:</strong> O+ is the most transfused blood type because ~38% of patients are O+. It can save over 80% of positive-type recipients!
      `,
      actions: [
        { label: '🧬 Open Interactive Compatibility Matrix', tool: 'compat_matrix:O+' },
        { label: '🩸 O- (Universal Donor)', query: 'Tell me about O- universal donor' }
      ]
    },

    compatibility_o_minus: {
      keywords: ['o-', 'o negative', 'universal donor', 'who is universal donor', 'who can o- donate to', 'o negative blood'],
      title: '🩸 O- (O Negative) — Universal Red Blood Cell Donor',
      badge: '🚨 Critical Emergency Universal Donor',
      isTool: 'compat_matrix:O-',
      answer: `
        <strong>O- (O Negative) Blood Compatibility:</strong><br>
        • <strong>Can GIVE Blood To:</strong> <strong>EVERYONE!</strong> (<span class="ai-tag">O+</span>, <span class="ai-tag">O-</span>, <span class="ai-tag">A+</span>, <span class="ai-tag">A-</span>, <span class="ai-tag">B+</span>, <span class="ai-tag">B-</span>, <span class="ai-tag">AB+</span>, <span class="ai-tag">AB-</span>)<br>
        • <strong>Can RECEIVE Blood From:</strong> <span class="ai-tag">O- ONLY</span><br><br>
        <strong>Why is O- essential?</strong> Lacks A, B, and Rh antigens, meaning any patient accepts it without hemolytic reaction. Loaded in trauma ambulances before blood typing is done.
      `,
      actions: [
        { label: '🧬 Open Interactive Compatibility Matrix', tool: 'compat_matrix:O-' },
        { label: '🩸 AB+ (Universal Recipient)', query: 'Tell me about AB+ universal recipient' },
        { label: '⚡ Emergency Requests', href: './donor.html' }
      ]
    },

    compatibility_ab_plus: {
      keywords: ['ab+', 'ab positive', 'universal recipient', 'who is universal recipient', 'ab+ receive from', 'ab+ blood'],
      title: '🩸 AB+ (AB Positive) — Universal Recipient',
      badge: '👑 Can Receive From All Blood Groups',
      isTool: 'compat_matrix:AB+',
      answer: `
        <strong>AB+ (AB Positive) Blood Compatibility:</strong><br>
        • <strong>Can RECEIVE Blood From:</strong> <strong>ALL 8 GROUPS!</strong> (<span class="ai-tag">O+</span>, <span class="ai-tag">O-</span>, <span class="ai-tag">A+</span>, <span class="ai-tag">A-</span>, <span class="ai-tag">B+</span>, <span class="ai-tag">B-</span>, <span class="ai-tag">AB+</span>, <span class="ai-tag">AB-</span>)<br>
        • <strong>Can GIVE Red Blood Cells To:</strong> <span class="ai-tag">AB+ ONLY</span><br>
        • <strong>Plasma Superpower:</strong> AB+ individuals are <strong>Universal Plasma Donors</strong> — their plasma can be given to all blood groups!
      `,
      actions: [
        { label: '🧬 Open Interactive Compatibility Matrix', tool: 'compat_matrix:AB+' },
        { label: '🪙 Medical Points Vault', href: './rewards.html' }
      ]
    },

    compatibility_all: {
      keywords: ['compatibility', 'matrix', 'blood group chart', 'who can give to who', 'blood matching', 'blood types', 'a+', 'a-', 'b+', 'b-', 'ab-'],
      title: '🧬 Complete Blood Compatibility Matrix',
      badge: '8 Blood Group Profiles',
      isTool: 'compat_matrix:all',
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
        { label: '🧬 Test Interactive Matrix', tool: 'compat_matrix:all' },
        { label: '🩸 Volume in ml', query: 'How much ml of blood is required in a donation?' },
        { label: '🧭 3D Radar Match', href: './radar.html' }
      ]
    },

    // G. Medical Eligibility & Health Criteria
    eligibility: {
      keywords: ['eligible', 'eligibility', 'can i donate', 'criteria', 'age limit', 'weight', 'hemoglobin', 'who can donate', 'requirements', 'rules', 'screener', 'test eligibility'],
      title: '🩺 General Blood Donation Eligibility Criteria',
      badge: 'Age 18–65 • Weight 45kg+',
      isTool: 'eligibility_wizard',
      answer: `
        <strong>Who is medically eligible to donate blood?</strong><br>
        1. <strong>Age:</strong> Between <strong>18 and 65 years</strong>.<br>
        2. <strong>Weight:</strong> Minimum <strong>45 kg</strong> (for 350ml) or <strong>50+ kg</strong> (for 450ml).<br>
        3. <strong>Hemoglobin:</strong> Minimum <strong>12.5 g/dL</strong> (tested on-site for free before donation).<br>
        4. <strong>Blood Pressure:</strong> Systolic: 100–140 mmHg, Diastolic: 60–90 mmHg.<br>
        5. <strong>Pulse:</strong> 60 to 100 beats per minute, regular.<br>
        6. <strong>Body Temperature:</strong> Normal (no cold, fever, cough, or infections in the past 48 hours).
      `,
      actions: [
        { label: '🩺 Run 10-Second Eligibility Screener', tool: 'eligibility_wizard' },
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
        • <strong>💊 Antibiotics:</strong> Wait until course is finished + at least <strong>48 hours symptom-free</strong>.<br>
        • <strong>💊 Aspirin / Painkillers:</strong> For platelets, avoid aspirin for 48h. Mild paracetamol is fine for whole blood if fever-free.<br>
        • <strong>🩺 Blood Pressure / Thyroid Meds:</strong> If your BP or Thyroid is well-controlled on daily medication, you CAN donate!<br>
        • <strong>☕ Coffee / Tea:</strong> Allowed, but drink plenty of water as caffeine is a mild diuretic.
      `,
      actions: [
        { label: '🥗 Pre-Donation Diet', query: 'What should I eat before donating blood?' },
        { label: '🎨 Tattoo / Piercing', query: 'Can I donate if I got a tattoo or piercing?' },
        { label: '🩺 10s Screener', tool: 'eligibility_wizard' }
      ]
    },

    // I. Tattoos, Piercings, Dental, Pregnancy
    tattoo_special_cases: {
      keywords: ['tattoo', 'piercing', 'dental', 'teeth', 'pregnancy', 'pregnant', 'breastfeeding', 'surgery', 'period', 'menstruation'],
      title: '🎨 Tattoos, Piercings, Surgeries & Special Conditions',
      badge: 'Safety Deferral Periods',
      answer: `
        <strong>Medical Deferral Guidelines:</strong><br>
        • <strong>🎨 Tattoos & Body Piercings:</strong> Must wait <strong>6 to 12 months</strong> after getting inked or pierced.<br>
        • <strong>🦷 Dental Treatment:</strong> Wait <strong>24 hours</strong> after minor cleaning/filling; wait <strong>72 hours</strong> after extraction/root canal.<br>
        • <strong>🤰 Pregnancy & Breastfeeding:</strong> Deferred during pregnancy and for <strong>6 to 12 months</strong> postpartum.<br>
        • <strong>🩸 Menstruation (Periods):</strong> You CAN donate if you feel energetic and hemoglobin is ≥ 12.5 g/dL.<br>
        • <strong>🏥 Major Surgery:</strong> Wait <strong>6 months</strong> after major surgery with full recovery.
      `,
      actions: [
        { label: '🩺 Test Eligibility', tool: 'eligibility_wizard' },
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
        2. Drink <strong>500 ml (2 large glasses) of water</strong> 30 minutes before donating.<br>
        3. Avoid fatty or fried foods.<br><br>
        <strong>Post-Donation (After Donating):</strong><br>
        1. Rest at the donor station for <strong>10 to 15 minutes</strong> with elevated feet.<br>
        2. Enjoy the complimentary juice and snacks provided.<br>
        3. Keep the bandage dry and intact for <strong>4 to 6 hours</strong>.<br>
        4. Avoid heavy weight lifting, strenuous gym workouts, or running for <strong>24 hours</strong>.
      `,
      actions: [
        { label: '🧮 Calculate Fluid Recovery', tool: 'volume_calculator' },
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
        4. When you arrive at the hospital entrance (e.g. KIMS Gate A or Apollo Gate 2), show this pass for priority bypass entry without long queue forms!<br>
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

  // 2. Categorized FAQ Tabs & Chips
  const FAQ_CATEGORIES = {
    popular: {
      label: '🔥 Top FAQs',
      chips: [
        { label: '🩸 How much ml is required on a donation?', query: 'How much ml of blood is required in a donation?' },
        { label: '🏥 What is the helpline for KIMS Hospital?', query: 'What is the contact number for KIMS Hospital?' },
        { label: '👥 Who can donate to O+ blood?', query: 'Who can donate to O+ blood?' },
        { label: '⏱️ What is the time gap between donations?', query: 'What is the time gap between blood donations?' }
      ]
    },
    volume: {
      label: '🩸 Volume & ML',
      chips: [
        { label: '🧮 Calculate My Volume (ml)', tool: 'volume_calculator' },
        { label: '🩸 Is 350ml or 450ml taken from me?', query: 'How much ml of blood is required in a donation?' },
        { label: '💧 How fast does plasma fluid recover?', query: 'How fast does body fluid and plasma recover after blood donation?' },
        { label: '🥗 What to eat before donating blood?', query: 'What should I eat before donating blood?' }
      ]
    },
    hospitals: {
      label: '🏥 Hospitals',
      chips: [
        { label: '🏥 KIMS Secunderabad (9701516959)', query: 'What is the contact number for KIMS Hospital?' },
        { label: '🏥 Apollo Jubilee Hills (8712125287)', query: 'Where is Apollo Jubilee Hills emergency gate?' },
        { label: '🚑 All 5 Partner Hospitals Directory', query: 'What are the helpline numbers for partner hospitals?' },
        { label: '⚡ Open Hospital Dispatch Cards', tool: 'hospital_dispatch' }
      ]
    },
    compatibility: {
      label: '🧬 Compatibility',
      chips: [
        { label: '🧬 Test Interactive Compatibility Matrix', tool: 'compat_matrix:all' },
        { label: '🩸 Who is the Universal Donor (O-)?', query: 'Tell me about O- universal donor' },
        { label: '👑 Who is the Universal Recipient (AB+)?', query: 'Tell me about AB+ universal recipient' },
        { label: '👥 Who can donate to O+?', query: 'Who can donate to O+ blood?' }
      ]
    },
    eligibility: {
      label: '🩺 Eligibility',
      chips: [
        { label: '🩺 10-Second Eligibility Screener', tool: 'eligibility_wizard' },
        { label: '💊 Can I donate after medicine or alcohol?', query: 'Can I donate after taking medicine or alcohol?' },
        { label: '🎨 Tattoo and piercing rules', query: 'Can I donate if I got a tattoo or piercing?' },
        { label: '⏱️ How many months gap for women & men?', query: 'What is the time gap between blood donations?' }
      ]
    },
    rewards: {
      label: '🪙 Rewards & Pass',
      chips: [
        { label: '🪙 How do medical reward points work?', query: 'How do medical reward points work?' },
        { label: '📱 How to get Digital QR Check-In Pass?', query: 'How does the digital QR check in pass work?' },
        { label: '🎁 How to get 500 welcome bonus points?', query: 'How to earn medical points' },
        { label: '🪙 Open Points Vault', href: './rewards.html' }
      ]
    }
  };

  // 3. Proactive Rotating Teaser Facts for the Public
  const TEASER_FACTS = [
    { text: '💡 350–450ml of blood can save up to 3 lives! Ask me how →', query: 'How much ml of blood is required in a donation?' },
    { text: '🏥 Need KIMS (9701516959) or Apollo helpline? Tap to ask!', query: 'What is the contact number for KIMS Hospital?' },
    { text: '🧬 Wondering who can receive O+ blood? Ask me!', query: 'Who can donate to O+ blood?' },
    { text: '🩺 Are you eligible to donate today? Check in 10s →', tool: 'eligibility_wizard' },
    { text: '🪙 Earn 500 free medical points on registration! Ask how →', query: 'How do medical reward points work?' },
    { text: '⏱️ Men can donate every 3 months, women every 4! Learn why →', query: 'What is the time gap between blood donations?' }
  ];

  // 4. NLP Query Matcher Engine
  class BloodBotBrain {
    static matchQuery(queryText) {
      const q = (queryText || '').toLowerCase().trim();
      if (!q) return null;

      // Check for calculator / screener intents directly
      if (q.includes('calculator') || (q.includes('calculate') && (q.includes('volume') || q.includes('ml')))) {
        return KNOWLEDGE_BASE.volume;
      }
      if (q.includes('screener') || q.includes('check eligibility') || q.includes('am i eligible')) {
        return KNOWLEDGE_BASE.eligibility;
      }
      if (q.includes('dispatch') || q.includes('call hospital') || q.includes('all hospitals')) {
        return KNOWLEDGE_BASE.all_hospitals;
      }

      let bestMatch = null;
      let highestScore = 0;

      for (const [key, item] of Object.entries(KNOWLEDGE_BASE)) {
        let score = 0;

        for (const kw of item.keywords) {
          if (q.includes(kw)) {
            score += kw.length * 3;
          }
        }

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

      if (highestScore >= 3 && bestMatch) {
        return bestMatch;
      }

      // Helpful fallback
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
          { label: '🧮 Open Volume Calculator', tool: 'volume_calculator' },
          { label: '🩺 10s Eligibility Check', tool: 'eligibility_wizard' },
          { label: '🏥 KIMS Number', query: 'What is the contact number for KIMS Hospital?' },
          { label: '👥 Compatibility', tool: 'compat_matrix:all' }
        ]
      };
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 5. Voice Helpers & Equalizer Visualizer
  let isSpeechEnabled = false;
  function updateEqualizer(active) {
    const eq = document.getElementById('bloodbot-equalizer');
    if (eq) {
      if (active) eq.classList.add('speaking');
      else eq.classList.remove('speaking');
    }
  }

  function speakResponse(text) {
    if (!isSpeechEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => updateEqualizer(true);
      utterance.onend = () => updateEqualizer(false);
      utterance.onerror = () => updateEqualizer(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      updateEqualizer(false);
    }
  }

  // 6. Build and Inject Floating Widget
  function createBloodBotWidget() {
    if (document.getElementById('bloodbot-floating-container')) return;

    const container = document.createElement('div');
    container.id = 'bloodbot-floating-container';
    container.className = 'bloodbot-container';

    container.innerHTML = `
      <!-- Proactive Rotating Teaser Bubble (Attracts Visitors) -->
      <div id="bloodbot-teaser-bubble" class="bloodbot-teaser-bubble" title="Click to ask BloodBot AI!">
        <div class="teaser-sparkle">✨</div>
        <div class="teaser-content" id="bloodbot-teaser-text">
          💡 350–450ml of blood can save up to 3 lives! Ask me how →
        </div>
        <button type="button" class="teaser-dismiss-btn" id="bloodbot-teaser-dismiss" title="Dismiss tip" aria-label="Dismiss tip">×</button>
      </div>

      <!-- Floating AI Launcher Trigger Button with Animated Holographic Neural Orb -->
      <button type="button" id="bloodbot-launcher" class="bloodbot-launcher-btn" aria-label="Open BloodBot AI Assistant" title="Ask BloodBot AI about blood donation, ml required, hospital helplines, or compatibility">
        <div class="bloodbot-neural-orb">
          <div class="orb-core">
            <span class="orb-symbol">🧬</span>
          </div>
          <div class="orb-ring ring-1"></div>
          <div class="orb-ring ring-2"></div>
          <span class="bot-status-dot"></span>
        </div>
        <div class="bloodbot-launcher-label">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="bot-title-small">BloodBot AI</span>
            <span class="bot-badge-v2">2.0</span>
          </div>
          <span class="bot-subtitle-small">Medical & Hospitals • Tap to Chat</span>
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
              <div style="display: flex; align-items: center; gap: 6px;">
                <div id="bloodbot-heading" class="bloodbot-title">BloodBot AI 2.0</div>
                <!-- Dynamic Audio Equalizer Bars -->
                <div class="bloodbot-equalizer" id="bloodbot-equalizer">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div class="bloodbot-status-text">Instant Medical & Hospital Companion • 🟢 Online</div>
            </div>
          </div>
          <div class="bloodbot-header-actions">
            <button type="button" class="bloodbot-btn-icon" id="bloodbot-voice-toggle" title="Toggle Voice Read-Aloud (TTS)" aria-label="Toggle Voice Read Aloud">
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

        <!-- Categorized FAQ Tabs & Chips Area -->
        <div class="bloodbot-faqs-container">
          <div class="bloodbot-tabs-scroll" id="bloodbot-tabs-scroll">
            ${Object.keys(FAQ_CATEGORIES).map((key, idx) => `
              <button type="button" class="bloodbot-category-tab ${idx === 0 ? 'active' : ''}" data-cat="${key}">
                ${FAQ_CATEGORIES[key].label}
              </button>
            `).join('')}
          </div>
          <div class="bloodbot-faqs-scroll" id="bloodbot-faqs-list">
            <!-- Populated dynamically based on active tab -->
          </div>
        </div>

        <!-- Messages Flow Scroll Area -->
        <div class="bloodbot-messages-area" id="bloodbot-messages-area">
          <!-- Initial Welcome Greeting Bubble -->
          <div class="bloodbot-msg bloodbot-msg-bot">
            <div class="bloodbot-msg-avatar">🤖</div>
            <div class="bloodbot-msg-content">
              <div class="bloodbot-msg-badge">✨ Interactive Health Companion</div>
              <div class="bloodbot-msg-body">
                Hello! I am your <strong>BloodConnect AI Assistant</strong>.<br><br>
                What would you like to explore today?
                <div class="bot-quick-tools-grid">
                  <button type="button" class="bot-tool-card-btn" onclick="window.launchBloodBotTool('volume_calculator')">
                    <span class="tool-icon">🧮</span>
                    <span class="tool-label">Volume Calculator<br><small style="color:var(--text-dim);">Find exact ml for your weight</small></span>
                  </button>
                  <button type="button" class="bot-tool-card-btn" onclick="window.launchBloodBotTool('eligibility_wizard')">
                    <span class="tool-icon">🩺</span>
                    <span class="tool-label">10s Eligibility Check<br><small style="color:var(--text-dim);">Instant fitness clearance</small></span>
                  </button>
                  <button type="button" class="bot-tool-card-btn" onclick="window.launchBloodBotTool('compat_matrix:all')">
                    <span class="tool-icon">🧬</span>
                    <span class="tool-label">Compatibility Matrix<br><small style="color:var(--text-dim);">Universal donor & receiver</small></span>
                  </button>
                  <button type="button" class="bot-tool-card-btn" onclick="window.launchBloodBotTool('hospital_dispatch')">
                    <span class="tool-icon">🏥</span>
                    <span class="tool-label">Hospital Desks<br><small style="color:var(--text-dim);">KIMS 9701516959 & Apollo</small></span>
                  </button>
                </div>
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
            <span>Ask AI</span> ➔
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(container);
    initBloodBotEvents();
  }

  // 7. Interactive Tool Renderers
  const ToolRenderers = {
    // A. Blood Volume & Fluid Recovery Calculator
    volume_calculator: (containerId) => {
      const el = document.getElementById(containerId);
      if (!el) return;

      el.innerHTML = `
        <div class="bot-calculator-card">
          <div class="bot-calc-header">
            <span>🩸 Blood Volume & Fluid Recovery Calculator</span>
          </div>
          <div class="bot-calc-row">
            <label>Your Body Weight (kg):</label>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="range" min="40" max="110" value="65" class="bot-calc-slider" id="${containerId}-weight-slider">
              <span id="${containerId}-weight-val" class="bot-calc-badge">65 kg</span>
            </div>
          </div>
          <div class="bot-calc-row">
            <label>Donor Gender:</label>
            <div class="bot-calc-gender-toggle">
              <button type="button" class="gender-btn active" data-gender="male">👨 Male</button>
              <button type="button" class="gender-btn" data-gender="female">👩 Female</button>
            </div>
          </div>
          <div class="bot-calc-result" id="${containerId}-calc-result">
            <!-- Dynamic Result Output -->
          </div>
        </div>
      `;

      const slider = document.getElementById(`${containerId}-weight-slider`);
      const valDisp = document.getElementById(`${containerId}-weight-val`);
      const resDisp = document.getElementById(`${containerId}-calc-result`);
      const genderBtns = el.querySelectorAll('.gender-btn');
      let currentGender = 'male';

      genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          genderBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentGender = btn.dataset.gender;
          updateCalc();
        });
      });

      function updateCalc() {
        const weight = parseInt(slider.value, 10);
        valDisp.textContent = `${weight} kg`;

        if (weight < 45) {
          resDisp.innerHTML = `
            <div style="color: #fb7185; font-weight: 700; margin-bottom: 4px;">⚠️ Weight Under 45 kg</div>
            <div style="font-size: 12px; color: var(--text-dim);">
              Under Indian blood donation guidelines, donors must weigh at least <strong>45 kg</strong> to donate a 350ml bag safely. Please focus on a nutritious, protein-rich diet!
            </div>
          `;
          return;
        }

        const volume = weight >= 55 ? 450 : 350;
        const totalBlood = Math.round(weight * (currentGender === 'male' ? 70 : 65));
        const pct = ((volume / totalBlood) * 100).toFixed(1);
        const cooldown = currentGender === 'male' ? '90 Days (3 Months)' : '120 Days (4 Months)';

        resDisp.innerHTML = `
          <div class="bot-calc-stats">
            <div class="bot-calc-stat-box">
              <div class="stat-label">Donation Volume</div>
              <div class="stat-value" style="color: var(--secondary-glow);">${volume} ml</div>
              <div class="stat-sub">+30ml safety sample</div>
            </div>
            <div class="bot-calc-stat-box">
              <div class="stat-label">% of Total Blood</div>
              <div class="stat-value" style="color: var(--accent-emerald);">${pct}%</div>
              <div class="stat-sub">Body total: ~${(totalBlood / 1000).toFixed(1)} L</div>
            </div>
            <div class="bot-calc-stat-box">
              <div class="stat-label">Next Donation Cooldown</div>
              <div class="stat-value" style="color: #f43f5e; font-size: 12px;">${cooldown}</div>
              <div class="stat-sub">Iron restore gap</div>
            </div>
          </div>
          <div style="font-size: 12px; margin-top: 10px; line-height: 1.5; color: #e2e8f0; background: rgba(0,0,0,0.3); padding: 8px 10px; border-radius: 6px;">
            💧 <strong>Recovery Tip:</strong> Drink <strong>${(volume * 1.5 / 1000).toFixed(1)} L</strong> of water or fruit juice within 24 hours. Your plasma fluid level will fully normalize in <strong>24–48 hours</strong>!
          </div>
        `;
      }

      slider.addEventListener('input', updateCalc);
      updateCalc();
    },

    // B. 10-Second Medical Eligibility Screener
    eligibility_wizard: (containerId) => {
      const el = document.getElementById(containerId);
      if (!el) return;

      const questions = [
        { id: 'q1', text: '1. Are you between 18 and 65 years old?', good: 'yes' },
        { id: 'q2', text: '2. Is your body weight 45 kg or more?', good: 'yes' },
        { id: 'q3', text: '3. Did you get a tattoo, piercing, or major dental surgery in the last 6 months?', good: 'no' },
        { id: 'q4', text: '4. Have you taken active antibiotics or had fever/cold in the last 48 hours?', good: 'no' }
      ];

      el.innerHTML = `
        <div class="bot-screener-card">
          <div class="bot-calc-header">
            <span>🩺 10-Second Medical Fitness Screener</span>
          </div>
          <div class="bot-screener-items" id="${containerId}-items">
            ${questions.map((q, idx) => `
              <div class="bot-screener-row" id="${containerId}-row-${q.id}">
                <div class="screener-q-text">${q.text}</div>
                <div class="screener-q-btns">
                  <button type="button" class="screener-btn" data-qid="${q.id}" data-ans="yes">Yes</button>
                  <button type="button" class="screener-btn" data-qid="${q.id}" data-ans="no">No</button>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="bot-screener-result" id="${containerId}-screener-res" style="display: none;"></div>
        </div>
      `;

      const answers = {};
      const btns = el.querySelectorAll('.screener-btn');
      const resBox = document.getElementById(`${containerId}-screener-res`);

      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.dataset.qid;
          const ans = btn.dataset.ans;
          answers[qid] = ans;

          const row = document.getElementById(`${containerId}-row-${qid}`);
          row.querySelectorAll('.screener-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');

          if (Object.keys(answers).length === 4) {
            checkFitness();
          }
        });
      });

      function checkFitness() {
        let isFit = true;
        let reasons = [];

        if (answers.q1 !== 'yes') { isFit = false; reasons.push('Donor must be between 18–65 years of age.'); }
        if (answers.q2 !== 'yes') { isFit = false; reasons.push('Donor must weigh at least 45 kg.'); }
        if (answers.q3 !== 'no') { isFit = false; reasons.push('Tattoos/piercings require a 6-month safety gap.'); }
        if (answers.q4 !== 'no') { isFit = false; reasons.push('Wait at least 48 hours after finishing antibiotics and symptom resolution.'); }

        resBox.style.display = 'block';
        if (isFit) {
          if (window.soundFX) window.soundFX.playSuccessChime();
          resBox.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 8px; padding: 12px;">
              <div style="color: var(--accent-emerald); font-weight: 800; font-size: 14px; margin-bottom: 4px;">🎉 Congratulations! You are 100% Medically Fit to Donate!</div>
              <div style="font-size: 12px; color: #e2e8f0; line-height: 1.5;">
                Your general criteria match medical safety benchmarks. Remember to drink 500ml of water and eat a healthy light meal 2–3 hours before arriving at the donor station.
              </div>
              <div style="margin-top: 10px; display: flex; gap: 6px;">
                <a href="./donor.html" class="bloodbot-action-btn" style="background: var(--accent-emerald); color: #000; font-weight: 700;">🧬 Proceed to Donor Hub</a>
                <a href="./rewards.html" class="bloodbot-action-btn">🪙 Earn 500 Points</a>
              </div>
            </div>
          `;
        } else {
          resBox.innerHTML = `
            <div style="background: rgba(225, 29, 72, 0.15); border: 1px solid rgba(225, 29, 72, 0.4); border-radius: 8px; padding: 12px;">
              <div style="color: #ff4d6d; font-weight: 800; font-size: 14px; margin-bottom: 4px;">⏳ Temporary Deferral Advised</div>
              <div style="font-size: 12px; color: #e2e8f0; line-height: 1.5;">
                Reasons for deferral:<br>
                ${reasons.map(r => `• ${r}`).join('<br>')}
              </div>
              <div style="margin-top: 8px; font-size: 11px; color: var(--text-dim);">
                Thank you for your generous spirit! Once the recovery period passes, we welcome you to donate.
              </div>
            </div>
          `;
        }
      }
    },

    // C. Visual Interactive Compatibility Matrix
    compat_matrix: (containerId, initialGroup = 'O+') => {
      const el = document.getElementById(containerId);
      if (!el) return;

      const GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
      const MATRIX = {
        'O-': { gives: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], receives: ['O-'], tag: '🌟 Universal Red Cell Donor' },
        'O+': { gives: ['O+', 'A+', 'B+', 'AB+'], receives: ['O+', 'O-'], tag: 'Most In-Demand Blood Group' },
        'A-': { gives: ['A+', 'A-', 'AB+', 'AB-'], receives: ['A-', 'O-'], tag: 'Rare Negative Rh Type' },
        'A+': { gives: ['A+', 'AB+'], receives: ['A+', 'A-', 'O+', 'O-'], tag: 'High Prevalence Group' },
        'B-': { gives: ['B+', 'B-', 'AB+', 'AB-'], receives: ['B-', 'O-'], tag: 'Rare Negative Rh Type' },
        'B+': { gives: ['B+', 'AB+'], receives: ['B+', 'B-', 'O+', 'O-'], tag: 'High Prevalence Group' },
        'AB-': { gives: ['AB+', 'AB-'], receives: ['AB-', 'A-', 'B-', 'O-'], tag: 'Rarest Rh Type' },
        'AB+': { gives: ['AB+'], receives: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], tag: '👑 Universal Recipient / Plasma Donor' }
      };

      const selGroup = initialGroup === 'all' ? 'O+' : initialGroup;

      el.innerHTML = `
        <div class="bot-compat-card">
          <div class="bot-calc-header">
            <span>🧬 Visual Blood Compatibility Matrix</span>
          </div>
          <div style="margin: 8px 0; font-size: 12px; color: var(--text-dim);">Tap any blood group to inspect donor/recipient pairs:</div>
          <div class="bot-compat-pills">
            ${GROUPS.map(g => `
              <button type="button" class="bot-group-pill ${g === selGroup ? 'active' : ''}" data-grp="${g}">${g}</button>
            `).join('')}
          </div>
          <div class="bot-compat-details" id="${containerId}-compat-res">
            <!-- Dynamic Result -->
          </div>
        </div>
      `;

      const pills = el.querySelectorAll('.bot-group-pill');
      const resBox = document.getElementById(`${containerId}-compat-res`);

      function updateView(grp) {
        const info = MATRIX[grp] || MATRIX['O+'];
        resBox.innerHTML = `
          <div class="bot-compat-tag-badge">${info.tag}</div>
          <div style="margin-top: 10px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--secondary-glow); margin-bottom: 4px;">
              🎁 ${grp} Can GIVE Blood To:
            </div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${info.gives.map(g => `<span class="compat-chip give">${g}</span>`).join('')}
            </div>
          </div>
          <div style="margin-top: 10px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--accent-emerald); margin-bottom: 4px;">
              📥 ${grp} Can RECEIVE Blood From:
            </div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${info.receives.map(g => `<span class="compat-chip recv">${g}</span>`).join('')}
            </div>
          </div>
        `;
      }

      pills.forEach(p => {
        p.addEventListener('click', () => {
          pills.forEach(b => b.classList.remove('active'));
          p.classList.add('active');
          updateView(p.dataset.grp);
        });
      });

      updateView(selGroup);
    },

    // D. One-Tap Hospital Quick Dispatch
    hospital_dispatch: (containerId) => {
      const el = document.getElementById(containerId);
      if (!el) return;

      const hospitals = [
        {
          name: 'KIMS Hospitals Secunderabad (Begumpet)',
          phone: '+91 97015 16959',
          rawPhone: '9701516959',
          gate: 'Gate A (Main Casualty Wing, 1st Floor)',
          maps: 'https://www.google.com/maps/dir/?api=1&destination=17.4375,78.4878'
        },
        {
          name: 'Apollo Hospitals Jubilee Hills',
          phone: '+91 87121 27287',
          rawPhone: '8712125287',
          gate: 'Gate 2 (Trauma Center & Blood Bank Reception)',
          maps: 'https://www.google.com/maps/dir/?api=1&destination=17.4156,78.4116'
        },
        {
          name: 'Yashoda Hospitals Somajiguda',
          phone: '+91 87121 27287',
          rawPhone: '8712125287',
          gate: 'Casualty Gate 3, Counter #02',
          maps: 'https://www.google.com/maps/dir/?api=1&destination=17.4243,78.4552'
        },
        {
          name: 'CARE Hospitals Banjara Hills',
          phone: '+91 87121 27287',
          rawPhone: '8712125287',
          gate: 'Main Tower Gate 1, Room 102',
          maps: 'https://www.google.com/maps/dir/?api=1&destination=17.4168,78.4485'
        },
        {
          name: 'Continental Hospitals Gachibowli',
          phone: '+91 87121 27287',
          rawPhone: '8712125287',
          gate: 'Casualty Gate 4 (Follow Red Line)',
          maps: 'https://www.google.com/maps/dir/?api=1&destination=17.4190,78.3428'
        }
      ];

      el.innerHTML = `
        <div class="bot-dispatch-card">
          <div class="bot-calc-header">
            <span>🏥 1-Tap Emergency Hospital Dispatch Desks</span>
          </div>
          <div class="bot-dispatch-list">
            ${hospitals.map(h => `
              <div class="bot-dispatch-item">
                <div style="flex: 1;">
                  <div style="font-weight: 700; color: #fff; font-size: 12.5px;">${h.name}</div>
                  <div style="font-size: 11px; color: var(--secondary-glow); margin-top: 1px;">🚪 ${h.gate}</div>
                  <div style="font-size: 11px; color: var(--accent-emerald); font-weight: 600;">📞 ${h.phone}</div>
                </div>
                <div class="bot-dispatch-actions">
                  <a href="tel:${h.phone}" class="dispatch-btn call" title="Call Hospital">📞</a>
                  <a href="https://wa.me/91${h.rawPhone}?text=Hello%20Blood%20Bank%20Reception%2C%20I%20am%20available%20for%20blood%20donation." target="_blank" class="dispatch-btn wa" title="WhatsApp Reception">💬</a>
                  <a href="${h.maps}" target="_blank" class="dispatch-btn map" title="Google Maps Navigation">🧭</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  };

  // 8. Event Binding & Interactive UI Management
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
    const tabsContainer = document.getElementById('bloodbot-tabs-scroll');
    const faqsList = document.getElementById('bloodbot-faqs-list');
    const micBtn = document.getElementById('bloodbot-mic-btn');
    const teaserBubble = document.getElementById('bloodbot-teaser-bubble');
    const teaserText = document.getElementById('bloodbot-teaser-text');
    const teaserDismiss = document.getElementById('bloodbot-teaser-dismiss');

    if (!launcher || !chatWindow) return;

    // Render Initial FAQ Category Chips
    function renderFaqChips(catKey) {
      const cat = FAQ_CATEGORIES[catKey] || FAQ_CATEGORIES.popular;
      faqsList.innerHTML = cat.chips.map(chip => `
        <button type="button" class="bloodbot-faq-chip" 
          ${chip.query ? `data-query="${escapeHtml(chip.query)}"` : ''} 
          ${chip.tool ? `data-tool="${escapeHtml(chip.tool)}"` : ''} 
          ${chip.href ? `data-href="${escapeHtml(chip.href)}"` : ''}>
          ${chip.label}
        </button>
      `).join('');
    }
    renderFaqChips('popular');

    // Handle Tab Selection
    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.bloodbot-category-tab');
      if (!tab) return;
      tabsContainer.querySelectorAll('.bloodbot-category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderFaqChips(tab.dataset.cat);
      if (window.soundFX) window.soundFX.playRadarPing();
    });

    // Proactive Teaser Fact Cycling (every 6 seconds)
    let teaserIdx = 0;
    const rotateTeaser = () => {
      teaserIdx = (teaserIdx + 1) % TEASER_FACTS.length;
      if (teaserText) {
        teaserText.style.opacity = '0';
        setTimeout(() => {
          teaserText.textContent = TEASER_FACTS[teaserIdx].text;
          teaserText.style.opacity = '1';
        }, 250);
      }
    };
    const teaserInterval = setInterval(rotateTeaser, 6000);

    // Teaser click triggers chat
    teaserBubble.addEventListener('click', (e) => {
      if (e.target === teaserDismiss) return;
      toggleChat(true);
      const fact = TEASER_FACTS[teaserIdx];
      if (fact.tool) {
        setTimeout(() => executeTool(fact.tool), 300);
      } else if (fact.query) {
        setTimeout(() => handleUserQuery(fact.query), 300);
      }
    });

    teaserDismiss.addEventListener('click', (e) => {
      e.stopPropagation();
      teaserBubble.style.display = 'none';
      clearInterval(teaserInterval);
    });

    // Toggle Chat Window Open/Close
    const toggleChat = (open = null) => {
      const willOpen = open !== null ? open : !chatWindow.classList.contains('active');
      if (willOpen) {
        chatWindow.classList.add('active');
        chatWindow.setAttribute('aria-hidden', 'false');
        teaserBubble.style.display = 'none';
        if (window.soundFX) window.soundFX.playRadarPing();
        setTimeout(() => inputField && inputField.focus(), 200);
      } else {
        chatWindow.classList.remove('active');
        chatWindow.setAttribute('aria-hidden', 'true');
      }
    };

    launcher.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    // Clear Chat
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear chat conversation history?')) {
        messagesArea.innerHTML = `
          <div class="bloodbot-msg bloodbot-msg-bot">
            <div class="bloodbot-msg-avatar">🤖</div>
            <div class="bloodbot-msg-content">
              <div class="bloodbot-msg-badge">Chat Reset</div>
              <div class="bloodbot-msg-body">
                Conversation cleared. How can I assist you with blood donation, ml required, or hospital information today?
              </div>
            </div>
          </div>
        `;
      }
    });

    // Voice Toggle
    voiceToggle.addEventListener('click', () => {
      isSpeechEnabled = !isSpeechEnabled;
      voiceIcon.textContent = isSpeechEnabled ? '🔊' : '🔇';
      voiceToggle.style.color = isSpeechEnabled ? 'var(--accent-emerald)' : '';
      if (isSpeechEnabled) {
        speakResponse('Voice output activated. I will read answers aloud.');
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        updateEqualizer(false);
      }
    });

    // Handle Chip Clicks
    faqsList.addEventListener('click', (e) => {
      const chip = e.target.closest('.bloodbot-faq-chip');
      if (!chip) return;
      if (chip.dataset.tool) {
        executeTool(chip.dataset.tool);
      } else if (chip.dataset.query) {
        handleUserQuery(chip.dataset.query);
      } else if (chip.dataset.href) {
        window.location.href = chip.dataset.href;
      }
    });

    // Handle Action buttons & Copy inside Bot Responses
    messagesArea.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.bloodbot-action-btn');
      if (actionBtn) {
        if (actionBtn.dataset.tool) {
          executeTool(actionBtn.dataset.tool);
        } else if (actionBtn.dataset.query) {
          handleUserQuery(actionBtn.dataset.query);
        } else if (actionBtn.dataset.href) {
          const href = actionBtn.dataset.href;
          if (href.startsWith('tel:') || href.startsWith('https:')) {
            window.open(href, '_blank');
          } else {
            window.location.href = href;
          }
        }
        return;
      }

      // Copy Button
      const copyBtn = e.target.closest('.bot-copy-btn');
      if (copyBtn) {
        const bodyEl = copyBtn.closest('.bloodbot-msg-content').querySelector('.bloodbot-msg-body');
        if (bodyEl) {
          const textToCopy = bodyEl.innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            if (window.soundFX) window.soundFX.playSuccessChime();
            copyBtn.innerHTML = '✓ Copied!';
            setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
          });
        }
        return;
      }

      // Feedback Reactions (Like/Dislike)
      const reactBtn = e.target.closest('.bot-react-btn');
      if (reactBtn) {
        if (window.soundFX) window.soundFX.playRadarPing();
        reactBtn.parentElement.innerHTML = '<span style="font-size: 11px; color: var(--accent-emerald);">Thanks for your feedback! ❤️</span>';
      }
    });

    // Speech-to-Text Microphone Input
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
          console.warn('Speech recognition error:', err);
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

    // Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputField.value.trim();
      if (!text) return;
      inputField.value = '';
      handleUserQuery(text);
    });

    // Execute Embedded Tool directly
    window.launchBloodBotTool = (toolKey) => {
      toggleChat(true);
      setTimeout(() => executeTool(toolKey), 250);
    };

    function executeTool(toolKey) {
      let promptTitle = '';
      if (toolKey === 'volume_calculator') promptTitle = '🧮 Launching Volume & Fluid Recovery Calculator...';
      else if (toolKey === 'eligibility_wizard') promptTitle = '🩺 Running 10-Second Medical Fitness Screener...';
      else if (toolKey.startsWith('compat_matrix')) promptTitle = '🧬 Launching Visual Compatibility Matrix...';
      else if (toolKey === 'hospital_dispatch') promptTitle = '🏥 Opening 1-Tap Hospital Emergency Desks...';

      appendUserMessage(promptTitle);
      const typingId = appendTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator(typingId);
        const containerId = 'bot-tool-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'bloodbot-msg bloodbot-msg-bot';
        msgDiv.innerHTML = `
          <div class="bloodbot-msg-avatar">🤖</div>
          <div class="bloodbot-msg-content" style="max-width: 95%;">
            <div id="${containerId}"></div>
            <div class="bot-msg-tools">
              <button type="button" class="bot-copy-btn">📋 Copy</button>
              <div class="bot-react-wrap">
                <button type="button" class="bot-react-btn" title="Helpful">👍</button>
                <button type="button" class="bot-react-btn" title="Not helpful">👎</button>
              </div>
            </div>
          </div>
        `;
        messagesArea.appendChild(msgDiv);
        scrollToBottom();

        // Render Tool Content
        if (toolKey === 'volume_calculator') {
          ToolRenderers.volume_calculator(containerId);
          speakResponse('Volume calculator ready. Adjust your weight to see your safe donation packet size and hydration needs.');
        } else if (toolKey === 'eligibility_wizard') {
          ToolRenderers.eligibility_wizard(containerId);
          speakResponse('10 second eligibility screener ready. Answer four quick questions to verify your clearance.');
        } else if (toolKey.startsWith('compat_matrix')) {
          const grp = toolKey.split(':')[1] || 'O+';
          ToolRenderers.compat_matrix(containerId, grp);
          speakResponse('Compatibility matrix active. Select any blood group to inspect donors and recipients.');
        } else if (toolKey === 'hospital_dispatch') {
          ToolRenderers.hospital_dispatch(containerId);
          speakResponse('Hospital desks ready. You can call, WhatsApp, or navigate to KIMS, Apollo, or partner hospitals.');
        }
      }, 350);
    }

    function handleUserQuery(userText) {
      appendUserMessage(userText);
      if (window.soundFX) window.soundFX.playSuccessChime();
      const typingId = appendTypingIndicator();

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
            <button type="button" class="bloodbot-action-btn" 
              ${act.query ? `data-query="${escapeHtml(act.query)}"` : ''} 
              ${act.tool ? `data-tool="${escapeHtml(act.tool)}"` : ''} 
              ${act.href ? `data-href="${escapeHtml(act.href)}"` : ''}>
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
          <div class="bot-msg-tools">
            <button type="button" class="bot-copy-btn">📋 Copy</button>
            <div class="bot-react-wrap">
              <button type="button" class="bot-react-btn" title="Helpful">👍</button>
              <button type="button" class="bot-react-btn" title="Not helpful">👎</button>
            </div>
          </div>
        </div>
      `;

      messagesArea.appendChild(msgDiv);
      scrollToBottom();

      // Read aloud if voice enabled
      speakResponse(data.title + '. ' + data.answer);
    }

    function scrollToBottom() {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    window.askBloodBot = (presetQuery) => {
      toggleChat(true);
      if (presetQuery) {
        setTimeout(() => handleUserQuery(presetQuery), 250);
      }
    };
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBloodBotWidget);
  } else {
    createBloodBotWidget();
  }
})();
