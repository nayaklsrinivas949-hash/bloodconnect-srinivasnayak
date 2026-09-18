/**
 * BloodConnect — BloodBot AI Medical & Donation Assistant 2.0 (Multilingual)
 * Advanced Interactive Natural Language Processing, Multilingual Medical Knowledge Engine,
 * Embedded Calculators, Visual Eligibility Wizard, Compatibility Matrix,
 * Proactive Teaser Pill, Hospital Emergency Dispatch, and Multi-Language Voice Assistant.
 * 
 * Supported Languages: English (EN), తెలుగు (Telugu), हिंदी (Hindi), தமிழ் (Tamil), ಕನ್ನಡ (Kannada), Español (Spanish)
 */

(function () {
  'use strict';

  // 1. Language Definitions & Configuration
  const LANGUAGES = {
    en: { name: 'English', flag: '🌐', label: 'English', code: 'en-US' },
    te: { name: 'Telugu', flag: '🇮🇳', label: 'తెలుగు (Telugu)', code: 'te-IN' },
    hi: { name: 'Hindi', flag: '🇮🇳', label: 'हिंदी (Hindi)', code: 'hi-IN' },
    ta: { name: 'Tamil', flag: '🇮🇳', label: 'தமிழ் (Tamil)', code: 'ta-IN' },
    kn: { name: 'Kannada', flag: '🇮🇳', label: 'ಕನ್ನಡ (Kannada)', code: 'kn-IN' },
    es: { name: 'Spanish', flag: '🇪🇸', label: 'Español (Spanish)', code: 'es-ES' }
  };

  let currentLanguage = 'en';

  function detectLanguage(text) {
    if (!text) return currentLanguage || 'en';
    // Telugu script \u0C00-\u0C7F
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
    // Devanagari (Hindi) \u0900-\u097F
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    // Tamil \u0B80-\u0BFF
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    // Kannada \u0C80-\u0CFF
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';

    const lower = text.toLowerCase();

    // Spanish keywords
    if (/[áéíóúñ¿¡]/.test(lower) || /\b(hola|donar|sangre|cuanto|cuantos|hospitales|requisitos|compatibilidad|gracias|por favor)\b/i.test(lower)) {
      return 'es';
    }

    // Tenglish (Telugu in Latin characters)
    if (/\b(entha|raktam|raktha|evaru|cheyochu|cheyavachu|cheppandi|ivvochu|kavali|undi|telugulo|ivvali|enni|haaspital)\b/i.test(lower)) {
      return 'te';
    }

    // Hinglish (Hindi in Latin characters)
    if (/\b(kitna|kya|kaise|kaun|khoon|chahiye|sakta|sakte|hoga|batao|bataiye|hindime|karo|aspatal|madat)\b/i.test(lower)) {
      return 'hi';
    }

    // Explicit English phrasing patterns
    if (/\b(what is|where is|how much|how many|can i|who can|tell me|explain|give to|receive from|eligib|helpline|contact number)\b/i.test(lower)) {
      return 'en';
    }

    return currentLanguage || 'en';
  }

  // 2. Comprehensive Multilingual Medical Knowledge Base
  const KNOWLEDGE_BASE = {
    // A. Blood Donation Volume (ml)
    volume: {
      keywords: [
        'volume', 'ml', 'how much ml', 'quantity', 'amount of blood', 'how many ml', 'how much blood', 'packet size', 'unit size', 'how many units', 'calculator', 'calculate volume',
        // Telugu
        'ఎన్ని ml', 'ఎంత రక్తం', 'రక్త పరిమాణం', 'రక్తదానంలో ఎంత', 'రక్తం ml', 'entha ml', 'raktam', 'raktha ml', 'రక్తం ఎంత తీసుకుంటారు',
        // Hindi
        'कितने ml', 'कितना ml', 'खून की मात्रा', 'रक्त की मात्रा', 'रक्तदान में कितना', 'kitna ml', 'khoon ml', 'kitna khoon', 'रक्तदान में कितने ml',
        // Tamil
        'எத்தனை ml', 'எவ்வளவு ml', 'இரத்த அளவு', 'ethanai ml',
        // Kannada
        'ಎಷ್ಟು ml', 'ರಕ್ತದ ಪ್ರಮಾಣ', 'eshtu ml', 'ರಕ್ತದಾನ ಎಷ್ಟು ml',
        // Spanish
        'cuantos ml', 'volumen de sangre', 'cuanta sangre', 'mililitros', 'volumen'
      ],
      isTool: 'volume_calculator',
      title: '🩸 Standard Blood Donation Volume (ml)',
      badge: '350 ml – 450 ml Standard',
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
      ],
      translations: {
        te: {
          title: '🩸 రక్తదానంలో ప్రామాణిక రక్త పరిమాణం (ml)',
          badge: '350 ml – 450 ml ప్రామాణికం',
          answer: `
            <strong>రక్తదాన పరిమాణ వివరాలు:</strong><br>
            • <strong>350 ml</strong>: <strong>45 kg నుండి 55 kg</strong> శరీర బరువు ఉన్న దాతల నుండి సేకరిస్తారు.<br>
            • <strong>450 ml</strong>: <strong>55 kg లేదా అంతకంటే ఎక్కువ</strong> బరువు ఉన్న దాతల నుండి సేకరిస్తారు.<br>
            • HIV, హెపటైటిస్ వంటి పరీక్షల కోసం అదనంగా <strong>~30 ml</strong> నమూనా రక్తం సేకరిస్తారు.<br><br>
            <strong>రక్షణ & పునరుద్ధరణ:</strong><br>
            ఒక పెద్దవారి శరీరంలో సుమారు 4,500 నుండి 5,500 ml రక్తం ఉంటుంది. రక్తదానంలో కేవలం <strong>8% నుండి 10%</strong> మాత్రమే తీసుకుంటారు.<br>
            • <strong>ప్లాస్మా ద్రవం:</strong> పుష్కలంగా నీరు, ద్రవాలు తాగితే <strong>24 నుండి 48 గంటల్లో</strong> భర్తీ అవుతుంది.<br>
            • <strong>ఎర్ర రక్త కణాలు (హిమోగ్లోబిన్):</strong> <strong>4 నుండి 8 వారాల్లో</strong> పూర్తిగా పునరుద్ధరించబడతాయి.
          `,
          actions: [
            { label: '🧮 వాల్యూమ్ కాలిక్యులేటర్ ఓపెన్ చేయండి', tool: 'volume_calculator' },
            { label: '🩺 అర్హత చెక్ చేసుకోండి', tool: 'eligibility_wizard' },
            { label: '⏱️ రక్తదాన సమయ గ్యాప్', query: 'రక్తదానానికి ఎంత సమయం గ్యాప్ ఉండాలి?' }
          ]
        },
        hi: {
          title: '🩸 रक्तदान में मानक रक्त की मात्रा (ml)',
          badge: '350 ml – 450 ml मानक',
          answer: `
            <strong>रक्तदान की मानक मात्रा:</strong><br>
            • <strong>350 ml</strong>: <strong>45 kg से 55 kg</strong> वजन वाले रक्तदाताओं से लिया जाता है।<br>
            • <strong>450 ml</strong>: <strong>55 kg या उससे अधिक</strong> वजन वाले रक्तदाताओं से लिया जाता है।<br>
            • सुरक्षा जांच (HIV, हेपेटाइटिस, मलेरिया आदि) के लिए अतिरिक्त <strong>~30 ml</strong> का नमूना लिया जाता है।<br><br>
            <strong>सुरक्षा और रिकवरी:</strong><br>
            एक सामान्य वयस्क के शरीर में 4,500 से 5,500 ml रक्त होता है। दान में सिर्फ <strong>8% से 10%</strong> रक्त ही जाता है।<br>
            • <strong>प्लाज्मा द्रव:</strong> पानी और तरल पदार्थों के सेवन से <strong>24 से 48 घंटों</strong> में वापस बन जाता है।<br>
            • <strong>लाल रक्त कोशिकाएं (RBC):</strong> <strong>4 से 8 हफ्तों</strong> में पूरी तरह से फिर से बन जाती हैं।
          `,
          actions: [
            { label: '🧮 वॉल्यूम कैलकुलेटर खोलें', tool: 'volume_calculator' },
            { label: '🩺 पात्रता की जांच करें', tool: 'eligibility_wizard' },
            { label: '⏱️ रक्तदान का समय अंतराल', query: 'रक्तदान के बीच कितना समय अंतराल होना चाहिए?' }
          ]
        },
        ta: {
          title: '🩸 இரத்த தான அளவு (ml)',
          badge: '350 ml – 450 ml',
          answer: `
            <strong>இரத்த தானத்தின் நிலையான அளவு:</strong><br>
            • <strong>350 ml</strong>: 45 முதல் 55 கிலோ எடை உள்ளவர்களிடம் இருந்து எடுக்கப்படுகிறது.<br>
            • <strong>450 ml</strong>: 55 கிலோவுக்கு மேல் எடை உள்ளவர்களிடம் எடுக்கப்படுகிறது.<br>
            • பாதுகாப்பு சோதனைகளுக்காக ~30 ml தனியாக எடுக்கப்படுகிறது.<br><br>
            உடலின் பிளாஸ்மா திரவம் <strong>24 முதல் 48 மணி நேரத்தில்</strong> மீண்டும் உற்பத்தியாகிறது.
          `,
          actions: [
            { label: '🧮 இரத்த அளவு கணக்கீடு', tool: 'volume_calculator' },
            { label: '🩺 தகுதி சரிபார்ப்பு', tool: 'eligibility_wizard' }
          ]
        },
        kn: {
          title: '🩸 ರಕ್ತದಾನದ ಪ್ರಮಾಣ (ml)',
          badge: '350 ml – 450 ml',
          answer: `
            <strong>ರಕ್ತದಾನದ ಪ್ರಮಾಣ ವಿವರ:</strong><br>
            • <strong>350 ml</strong>: 45 ರಿಂದ 55 ಕೆಜಿ ತೂಕವಿರುವ ದಾನಿಗಳಿಂದ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.<br>
            • <strong>450 ml</strong>: 55 ಕೆಜಿ ಅಥವಾ ಹೆಚ್ಚಿನ ತೂಕವಿರುವವರಿಂದ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.<br>
            ದೇಹದ ಪ್ಲಾಸ್ಮಾ ದ್ರವವು <strong>24 ರಿಂದ 48 ಗಂಟೆಗಳಲ್ಲಿ</strong> ಪುನಃ ತುಂಬಿಕೊಳ್ಳುತ್ತದೆ.
          `,
          actions: [
            { label: '🧮 ಪ್ರಮಾಣ ಕ್ಯಾಲ್ಕುಲೇಟರ್', tool: 'volume_calculator' },
            { label: '🩺 ಅರ್ಹತೆ ಪರಿಶೀಲನೆ', tool: 'eligibility_wizard' }
          ]
        },
        es: {
          title: '🩸 Volumen estándar de donación de sangre (ml)',
          badge: '350 ml – 450 ml Estándar',
          answer: `
            <strong>Volúmenes estándar de donación:</strong><br>
            • <strong>350 ml</strong>: Donantes con peso entre <strong>45 kg y 55 kg</strong>.<br>
            • <strong>450 ml</strong>: Donantes con peso de <strong>55 kg o más</strong>.<br>
            • Se extraen ~30 ml adicionales para pruebas de laboratorio de seguridad.<br><br>
            <strong>Recuperación:</strong> El plasma se repone en 24 a 48 horas y los glóbulos rojos en 4 a 8 semanas.
          `,
          actions: [
            { label: '🧮 Abrir Calculadora de Volumen', tool: 'volume_calculator' },
            { label: '🩺 Chequear Elegibilidad', tool: 'eligibility_wizard' }
          ]
        }
      }
    },

    // B. Donation Intervals & Frequency Gap
    intervals: {
      keywords: [
        'gap', 'interval', 'how often', 'frequency', 'time period', 'how many months', 'gap between', 'when can i donate again', 'next donation', 'cooldown',
        'గ్యాప్', 'సమయం గ్యాప్', 'ఎన్ని నెలలు', 'మళ్ళీ ఎప్పుడు', 'వ్యవధి', 'gap entha', 'enni nelalu',
        'अंतराल', 'समय अंतराल', 'कितने महीने बाद', 'कितने दिन बाद', 'दोबारा कब', 'gap kitna', 'kitne mahine',
        'இடைவெளி', 'எத்தனை மாதம்', 'அಂತರ', 'ಎಷ್ಟು ತಿಂಗಳ', 'intervalo', 'frecuencia', 'cuanto tiempo'
      ],
      title: '⏱️ Recommended Time Gap Between Donations',
      badge: 'Men: 3 Months • Women: 4 Months',
      answer: `
        <strong>Mandatory Donation Intervals:</strong><br>
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
      ],
      translations: {
        te: {
          title: '⏱️ రక్తదానాల మధ్య సిఫార్సు చేసిన సమయ వ్యవధి (గ్యాప్)',
          badge: 'పురుషులు: 3 నెలలు • మహిళలు: 4 నెలలు',
          answer: `
            <strong>రక్తదాన విరామ నిబంధనలు:</strong><br>
            • <strong>👨 పురుష దాతలు:</strong> ప్రతి <strong>90 రోజులకు (3 నెలలకు)</strong> ఒకసారి హోల్ బ్లడ్ దానం చేయవచ్చు.<br>
            • <strong>👩 మహిళా దాతలు:</strong> ఐరన్ నిల్వల రక్షణ కోసం ప్రతి <strong>120 రోజులకు (4 నెలలకు)</strong> ఒకసారి దానం చేయవచ్చు.<br>
            • <strong>🧬 ప్లేట్‌లెట్ దాతలు (అఫెరిసిస్):</strong> ప్రతి <strong>14 రోజులకు (2 వారాలకు)</strong> ఒకసారి దానం చేయవచ్చు.<br><br>
            <strong>ఈ విరామం ఎందుకు?</strong> ఎముక మజ్జలో ఐరన్ (ఫెర్రిటిన్) నిల్వలు మరియు హిమోగ్లోబిన్ పూర్తిగా భర్తీ కావడానికి ఈ సమయం అవసరం.
          `,
          actions: [
            { label: '🩸 రక్త పరిమాణం (ml)', query: 'రక్తదానంలో ఎన్ని ml రక్తం తీసుకుంటారు?' },
            { label: '🩺 10s అర్హత పరీక్ష', tool: 'eligibility_wizard' },
            { label: '🧬 డోనర్ హబ్ చూడండి', href: './donor.html' }
          ]
        },
        hi: {
          title: '⏱️ रक्तदान के बीच अनुशंसित समय अंतराल',
          badge: 'पुरुष: 3 महीने • महिलाएं: 4 महीने',
          answer: `
            <strong>रक्तदान का अनिवार्य अंतराल:</strong><br>
            • <strong>👨 पुरुष रक्तदाता:</strong> हर <strong>90 दिन (3 महीने)</strong> में एक बार संपूर्ण रक्त दान कर सकते हैं।<br>
            • <strong>👩 महिला रक्तदाता:</strong> आयरन सुरक्षित रखने के लिए हर <strong>120 दिन (4 महीने)</strong> में एक बार दान कर सकती हैं।<br>
            • <strong>🧬 प्लेटलेट दाता:</strong> हर <strong>14 दिन (2 सप्ताह)</strong> में दान कर सकते हैं।<br><br>
            <strong>यह अंतराल क्यों जरूरी है?</strong> ताकि आपके शरीर में हीमोग्लोबिन और आयरन की मात्रा पूरी तरह से फिर से सामान्य हो सके।
          `,
          actions: [
            { label: '🩸 रक्त की मात्रा (ml)', query: 'रक्तदान में कितने ml खून लिया जाता है?' },
            { label: '🩺 10s पात्रता जांच', tool: 'eligibility_wizard' },
            { label: '🧬 डोनर हब खोलें', href: './donor.html' }
          ]
        },
        ta: {
          title: '⏱️ இரத்த தான இடைவெளி',
          badge: 'ஆண்கள்: 3 மாதம் • பெண்கள்: 4 மாதம்',
          answer: `ஆண்கள் 3 மாதத்திற்கு ஒருமுறையும், பெண்கள் 4 மாதத்திற்கு ஒருமுறையும் முழு இரத்த தானம் செய்யலாம்.`
        },
        kn: {
          title: '⏱️ ರಕ್ತದಾನದ ಸಮಯದ ಅಂತರ',
          badge: 'ಪುರುಷರು: 3 ತಿಂಗಳು • ಮಹಿಳೆಯರು: 4 ತಿಂಗಳು',
          answer: `ಪುರುಷರು 3 ತಿಂಗಳಿಗೊಮ್ಮೆ ಮತ್ತು ಮಹಿಳೆಯರು 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ರಕ್ತದಾನ ಮಾಡಬಹುದು.`
        },
        es: {
          title: '⏱️ Intervalo recomendado entre donaciones',
          badge: 'Hombres: 3 meses • Mujeres: 4 meses',
          answer: `Los hombres pueden donar cada 3 meses y las mujeres cada 4 meses para reponer sus reservas de hierro.`
        }
      }
    },

    // C. KIMS Hospitals Secunderabad (Begumpet)
    kims_hospital: {
      keywords: [
        'kims', 'kims hospital', 'kims secunderabad', 'kims number', 'kims helpline', 'kims contact', 'kims phone', 'begumpet hospital', '9701516959',
        'కిమ్స్', 'కిమ్స్ హాస్పిటల్', 'కిమ్స్ నంబర్', 'కిమ్స్ ఫోన్', 'సికింద్రాబాద్ కిమ్స్', 'kims phone cheppandi',
        'किम्स', 'किम्स अस्पताल', 'किम्स का नंबर', 'किम्स फोन नंबर', 'kims ka number', 'kims hospital number',
        'கிம்ஸ்', 'கிம்ஸ் மருத்துவமனை', 'ಕಿಮ್ಸ್', 'ಕಿಮ್ಸ್ ಆಸ್ಪತ್ರೆ', 'hospital kims', 'telefono kims'
      ],
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
      ],
      translations: {
        te: {
          title: '🏥 KIMS ఆసుపత్రి సికింద్రాబాద్ (బేగంపేట)',
          badge: '📞 +91 97015 16959 (యాక్టివ్ హెల్ప్‌లైన్)',
          answer: `
            <strong>KIMS హాస్పిటల్ బేగంపేట వివరాలు:</strong><br>
            • 📞 <strong>ఎమర్జెన్సీ హెల్ప్‌లైన్ & బ్లడ్ బ్యాంక్:</strong> <a href="tel:+919701516959" style="color: var(--accent-emerald); font-weight: 700;">+91 97015 16959</a><br>
            • 📍 <strong>చిరునామా:</strong> 1-8-31/1, మినిస్టర్ రోడ్, కృష్ణా నగర్ కాలనీ, బేగంపేట్, సికింద్రాబాద్ - 500003<br>
            • 🚪 <strong>ఎంట్రన్స్ గేట్:</strong> <strong>గేట్ A (మెయిన్ క్యాజువాలిటీ వింగ్, మొదటి అంతస్తు బ్లడ్ బ్యాంక్)</strong><br>
            • 🩺 <strong>బ్లడ్ బ్యాంక్ ఇన్-ఛార్జ్:</strong> డా. రాధికా రెడ్డి (ఎమర్జెన్సీ & సర్జరీ విభాగం)
          `,
          actions: [
            { label: '📞 KIMS కి కాల్ చేయండి (+91 97015 16959)', href: 'tel:+919701516959' },
            { label: '💬 వాట్సాప్ డెస్క్', href: 'https://wa.me/919701516959?text=Hello%20KIMS%20Blood%20Bank' },
            { label: '🧭 గూగుల్ మ్యాప్స్ రూట్', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4375,78.4878' }
          ]
        },
        hi: {
          title: '🏥 KIMS अस्पताल सिकंदराबाद (बेगमपेट)',
          badge: '📞 +91 97015 16959 (सक्रिय हेल्पलाइन)',
          answer: `
            <strong>KIMS अस्पताल सिकंदराबाद विवरण:</strong><br>
            • 📞 <strong>आपातकालीन हेल्पलाइन एवं ब्लड बैंक:</strong> <a href="tel:+919701516959" style="color: var(--accent-emerald); font-weight: 700;">+91 97015 16959</a><br>
            • 📍 <strong>पता:</strong> 1-8-31/1, मिनिस्टर रोड, कृष्णा नगर कॉलोनी, बेगमपेट, सिकंदराबाद - 500003<br>
            • 🚪 <strong>प्रवेश द्वार:</strong> <strong>गेट A (मुख्य कैजुअल्टी विंग, पहली मंजिल ब्लड बैंक)</strong><br>
            • 🩺 <strong>ब्लड बैंक प्रमुख:</strong> डॉ. राधिका रेड्डी
          `,
          actions: [
            { label: '📞 KIMS को कॉल करें (+91 97015 16959)', href: 'tel:+919701516959' },
            { label: '💬 व्हाट्सएप संपर्क', href: 'https://wa.me/919701516959?text=Hello%20KIMS%20Blood%20Bank' },
            { label: '🧭 गूगल मैप्स रास्ता', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4375,78.4878' }
          ]
        },
        ta: {
          title: '🏥 KIMS மருத்துவமனை செகந்திராபாத் (பேகம்பேட்டை)',
          badge: '📞 +91 97015 16959',
          answer: `KIMS மருத்துவமனை இரத்த வங்கி மற்றும் அவசர உதவி எண்: <strong>+91 97015 16959</strong> (கேட் A, முதல் தளம்).`,
          actions: [{ label: '📞 KIMS அழையுங்கள் (+91 97015 16959)', href: 'tel:+919701516959' }]
        },
        kn: {
          title: '🏥 KIMS ಆಸ್ಪತ್ರೆ ಸಿಕಂದರಾಬಾದ್ (ಬೇಗಂಪೇಟ್)',
          badge: '📞 +91 97015 16959',
          answer: `KIMS ಆಸ್ಪತ್ರೆಯ ರಕ್ತನಿಧಿ ಮತ್ತು ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ: <strong>+91 97015 16959</strong> (ಗೇಟ್ A, ಮೊದಲ ಮಹಡಿ).`,
          actions: [{ label: '📞 KIMS ಕರೆ ಮಾಡಿ (+91 97015 16959)', href: 'tel:+919701516959' }]
        },
        es: {
          title: '🏥 KIMS Hospitals Secunderabad (Begumpet)',
          badge: '📞 +91 97015 16959 (Activo)',
          answer: `Línea de emergencia y banco de sangre del Hospital KIMS: <strong>+91 97015 16959</strong> (Puerta A, 1er piso).`,
          actions: [{ label: '📞 Llamar a KIMS (+91 97015 16959)', href: 'tel:+919701516959' }]
        }
      }
    },

    // D. Apollo Hospitals Jubilee Hills
    apollo_hospital: {
      keywords: [
        'apollo', 'apollo hospital', 'apollo jubilee hills', 'apollo number', 'apollo contact', 'apollo helpline', 'apollo phone', '8712125287',
        'అపోలో', 'అపోలో హాస్పిటల్', 'అపోలో నంబర్', 'జూబ్లీహిల్స్ అపోలో',
        'अपोलो', 'अपोलो अस्पताल', 'अपोलो का नंबर', 'जुबली हिल्स अपोलो',
        'அப்பல்லோ', 'அப்பல்லோ மருத்துவமனை', 'ಅಪೊಲೊ', 'ಅಪೊಲೊ ಆಸ್ಪತ್ರೆ', 'hospital apollo'
      ],
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
        { label: '💬 WhatsApp Desk', href: 'https://wa.me/918712127287?text=Hello%20Apollo%20Hospitals%20Blood%20Bank' },
        { label: '🧭 GPS Route', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4156,78.4116' }
      ],
      translations: {
        te: {
          title: '🏥 అపోలో ఆసుపత్రి జూబ్లీహిల్స్',
          badge: '📞 +91 87121 27287 (యాక్టివ్ హెల్ప్‌లైన్)',
          answer: `
            <strong>అపోలో హాస్పిటల్ జూబ్లీహిల్స్ వివరాలు:</strong><br>
            • 📞 <strong>ఎమర్జెన్సీ హెల్ప్‌లైన్:</strong> <a href="tel:+918712127287" style="color: var(--accent-emerald); font-weight: 700;">+91 87121 27287</a><br>
            • 📍 <strong>చిరునామా:</strong> రోడ్ నెం. 72, భారతీయ విద్యాభవన్ ఎదురుగా, జూబ్లీహిల్స్, హైదరాబాద్ - 500033<br>
            • 🚪 <strong>ఎంట్రన్స్ గేట్:</strong> <strong>గేట్ 2 (ట్రామా సెంటర్ & బ్లడ్ బ్యాంక్, గ్రౌండ్ ఫ్లోర్)</strong>
          `,
          actions: [
            { label: '📞 అపోలోకి కాల్ చేయండి (+91 87121 27287)', href: 'tel:+918712127287' },
            { label: '🧭 గూగుల్ మ్యాప్స్ రూట్', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4156,78.4116' }
          ]
        },
        hi: {
          title: '🏥 अपोलो अस्पताल जुबली हिल्स',
          badge: '📞 +91 87121 27287 (सक्रिय हेल्पलाइन)',
          answer: `
            <strong>अपोलो अस्पताल जुबली हिल्स विवरण:</strong><br>
            • 📞 <strong>आपातकालीन हेल्पलाइन:</strong> <a href="tel:+918712127287" style="color: var(--accent-emerald); font-weight: 700;">+91 87121 27287</a><br>
            • 📍 <strong>पता:</strong> रोड नं. 72, भारतीय विद्या भवन के सामने, जुबली हिल्स, हैदराबाद - 500033<br>
            • 🚪 <strong>प्रवेश द्वार:</strong> <strong>गेट 2 (ट्रॉमा सेंटर और ब्लड बैंक, भूतल)</strong>
          `,
          actions: [
            { label: '📞 अपोलो को कॉल करें (+91 87121 27287)', href: 'tel:+918712127287' },
            { label: '🧭 गूगल मैप्स रास्ता', href: 'https://www.google.com/maps/dir/?api=1&destination=17.4156,78.4116' }
          ]
        }
      }
    },

    // E. Blood Group Compatibility (O+, O-, AB+, etc.)
    compat_all: {
      keywords: [
        'compatibility', 'blood group', 'universal donor', 'universal recipient', 'who can donate to', 'can receive from', 'blood match',
        'రక్త వర్గాలు', 'అనుకూలత', 'సార్వత్రిక దాత', 'విశ్వ దాత', 'సార్వత్రిక గ్రహీత', 'రక్తం గ్రూప్',
        'रक्त समूह', 'अनुकूलता', 'सर्वदाता', 'सर्वग्राही', 'कौन किसे रक्त दे सकता है', 'ब्लड ग्रुप',
        'இரத்த வகை பொருத்தம்', 'பொதுக் கொடையாளர்', 'ರಕ್ತದ ಹೊಂದಾಣಿಕೆ', 'compatibilidad de sangre', 'donante universal'
      ],
      isTool: 'compat_matrix:all',
      title: '🧬 Blood Group Compatibility Matrix',
      badge: 'Universal Donor: O- • Universal Recipient: AB+',
      answer: `
        <strong>Universal Blood Compatibility Rules:</strong><br>
        • <strong>🅾️ O Negative (O-):</strong> <strong>Universal Red Blood Cell Donor</strong> — can safely donate red cells to ANY patient (O+, O-, A+, A-, B+, B-, AB+, AB-).<br>
        • <strong>👑 AB Positive (AB+):</strong> <strong>Universal Recipient</strong> — can safely receive red blood cells from ANY blood group.<br>
        • <strong>👑 AB Negative (AB-):</strong> <strong>Universal Plasma Donor</strong> — can donate plasma to all groups.
      `,
      actions: [
        { label: '🧬 Test Interactive Compatibility Matrix', tool: 'compat_matrix:all' },
        { label: '👥 Who can donate to O+?', query: 'Who can donate to O+ blood?' },
        { label: '🧮 Calculate Safe Volume', tool: 'volume_calculator' }
      ],
      translations: {
        te: {
          title: '🧬 రక్త వర్గాల అనుకూలత పట్టిక (బ్లడ్ గ్రూప్ మ్యాచ్)',
          badge: 'సార్వత్రిక దాత: O- • సార్వత్రిక గ్రహీత: AB+',
          answer: `
            <strong>రక్త గ్రూపుల అనుకూలత నియమాలు:</strong><br>
            • <strong>🅾️ O నెగటివ్ (O-):</strong> <strong>సార్వత్రిక రక్త దాత (Universal Red Cell Donor)</strong> — అన్ని గ్రూపుల వారికి (O+, O-, A+, A-, B+, B-, AB+, AB-) రక్తం ఇవ్వగలరు.<br>
            • <strong>👑 AB పాజిటివ్ (AB+):</strong> <strong>సార్వత్రిక గ్రహీత (Universal Recipient)</strong> — అన్ని రక్త వర్గాల వారి నుండి రక్తాన్ని స్వీకరించగలరు.<br>
            • <strong>🧪 AB నెగటివ్ (AB-):</strong> <strong>సార్వత్రిక ప్లాస్మా దాత</strong> — అన్ని గ్రూపులకు ప్లాస్మా ఇవ్వగలరు.
          `,
          actions: [
            { label: '🧬 ఇంటరాక్టివ్ అనుకూలత మ్యాట్రిక్స్', tool: 'compat_matrix:all' },
            { label: '👥 O+ కి ఎవరు రక్తం ఇవ్వవచ్చు?', query: 'O+ కి ఎవరు రక్తం ఇవ్వవచ్చు?' }
          ]
        },
        hi: {
          title: '🧬 रक्त समूह अनुकूलता चार्ट (Blood Group Compatibility)',
          badge: 'सर्वदाता: O- • सर्वग्राही: AB+',
          answer: `
            <strong>रक्त अनुकूलता के सार्वभौमिक नियम:</strong><br>
            • <strong>🅾️ O नेगेटिव (O-):</strong> <strong>सर्वदाता (Universal Donor)</strong> — यह रक्त समूह किसी भी मरीज (O+, O-, A+, A-, B+, B-, AB+, AB-) को सुरक्षित रूप से दिया जा सकता है।<br>
            • <strong>👑 AB पॉजिटिव (AB+):</strong> <strong>सर्वग्राही (Universal Recipient)</strong> — यह रक्त समूह किसी भी ग्रुप से रक्त ग्रहण कर सकता है।<br>
            • <strong>🧪 AB नेगेटिव (AB-):</strong> <strong>सर्वदाता प्लाज्मा</strong> दाता होता है।
          `,
          actions: [
            { label: '🧬 इंटरैक्टिव अनुकूलता मैट्रिक्स खोलें', tool: 'compat_matrix:all' },
            { label: '👥 O+ को कौन रक्त दे सकता है?', query: 'O+ ब्लड ग्रुप को कौन रक्तदान कर सकता है?' }
          ]
        }
      }
    },

    // F. O+ Specific Query
    compat_o_pos: {
      keywords: ['o+', 'o positive', 'who can donate to o+', 'can donate to o+', 'o+ blood', 'o+ కి ఎవరు', 'o పాజిటివ్', 'o+ को कौन', 'o पॉजिटिव'],
      title: '🩸 O Positive (O+) Compatibility Profile',
      badge: 'Most Common Blood Group (~38% of Population)',
      answer: `
        <strong>O Positive (O+) Compatibility:</strong><br>
        • 📥 <strong>Can RECEIVE red blood cells from:</strong> <strong>O+</strong> and <strong>O-</strong> only.<br>
        • 📤 <strong>Can DONATE red blood cells to:</strong> <strong>O+</strong>, <strong>A+</strong>, <strong>B+</strong>, and <strong>AB+</strong> (any Rh-positive group).<br><br>
        Because O+ is the most prevalent blood type, it is constantly in the highest emergency demand across hospitals!
      `,
      actions: [
        { label: '🧬 Test Interactive Matrix', tool: 'compat_matrix:O+' },
        { label: '🧮 Check Safe Volume (ml)', tool: 'volume_calculator' }
      ],
      translations: {
        te: {
          title: '🩸 O పాజిటివ్ (O+) రక్త వర్గం అనుకూలత',
          badge: 'అత్యధికంగా ఉండే రక్త వర్గం (~38% జనాభా)',
          answer: `
            <strong>O పాజిటివ్ (O+) వివరాలు:</strong><br>
            • 📥 <strong>రక్తం ఎవరి నుండి తీసుకోవచ్చు:</strong> కేవలం <strong>O+</strong> మరియు <strong>O-</strong> ల నుండి మాత్రమే.<br>
            • 📤 <strong>ఎవరికి రక్తం ఇవ్వవచ్చు:</strong> <strong>O+, A+, B+, AB+</strong> (అన్ని పాజిటివ్ గ్రూపులకు).<br><br>
            భారతదేశంలో అత్యధిక రోగులకు O+ రక్తం అవసరమవుతుంది కాబట్టి దీనికి ఎల్లప్పుడూ అత్యధిక డిమాండ్ ఉంటుంది.
          `,
          actions: [
            { label: '🧬 O+ అనుకూలత మ్యాట్రిక్స్', tool: 'compat_matrix:O+' },
            { label: '🧮 రక్త పరిమాణం లెక్కించండి', tool: 'volume_calculator' }
          ]
        },
        hi: {
          title: '🩸 O पॉजिटिव (O+) रक्त समूह अनुकूलता',
          badge: 'सर्वाधिक प्रचलित रक्त समूह (~38% आबादी)',
          answer: `
            <strong>O पॉजिटिव (O+) अनुकूलता:</strong><br>
            • 📥 <strong>किससे रक्त ले सकते हैं:</strong> केवल <strong>O+</strong> और <strong>O-</strong> से।<br>
            • 📤 <strong>किसे रक्त दे सकते हैं:</strong> <strong>O+, A+, B+, और AB+</strong> (सभी पॉजिटिव ग्रुप्स को)।<br><br>
            O+ सबसे अधिक पाया जाने वाला ब्लड ग्रुप है, इसलिए अस्पतालों में इसकी मांग हमेशा सबसे अधिक रहती है।
          `,
          actions: [
            { label: '🧬 O+ अनुकूलता मैट्रिक्स', tool: 'compat_matrix:O+' },
            { label: '🧮 सुरक्षित मात्रा कैलकुलेटर', tool: 'volume_calculator' }
          ]
        }
      }
    },

    // G. Eligibility & Screener
    eligibility: {
      keywords: [
        'eligible', 'eligibility', 'can i donate', 'qualify', 'criteria', 'rules', 'age limit', 'weight limit', 'hemoglobin', 'who can donate',
        'అర్హత', 'అర్హతలు', 'నేను రక్తదానం చేయవచ్చా', 'వయోపరిమితి', 'కనీస బరువు', 'evaru donate cheyochu', 'నిబంధనలు',
        'पात्रता', 'नियम', 'क्या मैं रक्तदान कर सकता हूँ', 'उम्र सीमा', 'वजन सीमा', 'kaun donate kar sakta hai', 'शर्तें'
      ],
      isTool: 'eligibility_wizard',
      title: '🩺 Blood Donation Eligibility Criteria',
      badge: 'Age: 18–65 Yrs • Min Weight: 45 kg',
      answer: `
        <strong>Key Medical Eligibility Rules:</strong><br>
        • 🎂 <strong>Age:</strong> 18 to 65 years.<br>
        • ⚖️ <strong>Body Weight:</strong> Minimum <strong>45 kg</strong> (for 350 ml) or <strong>55 kg</strong> (for 450 ml).<br>
        • 🩸 <strong>Hemoglobin (Hb):</strong> Minimum <strong>12.5 g/dL</strong>.<br>
        • 💓 <strong>Pulse & Blood Pressure:</strong> Pulse 60–100 bpm; BP 100–140 systolic / 60–90 diastolic.<br>
        • 🌡️ <strong>Temperature:</strong> Normal body temperature (free from fever, cold, or infection for 7 days).
      `,
      actions: [
        { label: '🩺 10s Eligibility Check', tool: 'eligibility_wizard' },
        { label: '💊 Alcohol & Tattoo Rules', query: 'Can I donate if I got a tattoo or drank alcohol?' }
      ],
      translations: {
        te: {
          title: '🩺 రక్తదాన అర్హత నిబంధనలు (Eligibility)',
          badge: 'వయస్సు: 18–65 సం. • కనీస బరువు: 45 kg',
          answer: `
            <strong>ముఖ్య వైద్య అర్హత నియమాలు:</strong><br>
            • 🎂 <strong>వయస్సు:</strong> 18 నుండి 65 సంవత్సరాలు.<br>
            • ⚖️ <strong>శరీర బరువు:</strong> కనీసం <strong>45 kg</strong> (350 ml కోసం) లేదా <strong>55 kg</strong> (450 ml కోసం).<br>
            • 🩸 <strong>హిమోగ్లోబిన్ (Hb):</strong> కనీసం <strong>12.5 g/dL</strong> ఉండాలి.<br>
            • 💓 <strong>రక్తపోటు (BP):</strong> సిస్టోలిక్ 100-140 / డయాస్టోలిక్ 60-90 మధ్య ఉండాలి.<br>
            • 🌡️ జ్వరం, దగ్గు లేదా ఇన్ఫెక్షన్లు లేకుండా గత 7 రోజులుగా ఆరోగ్యంగా ఉండాలి.
          `,
          actions: [
            { label: '🩺 10 సెకన్ల అర్హత చెక్', tool: 'eligibility_wizard' },
            { label: '🎨 టాటూ మరియు ఆల్కహాల్ నిబంధనలు', query: 'టాటూ లేదా ఆల్కహాల్ తీసుకుంటే రక్తదానం చేయవచ్చా?' }
          ]
        },
        hi: {
          title: '🩺 रक्तदान के लिए पात्रता और नियम',
          badge: 'उम्र: 18–65 वर्ष • न्यूनतम वजन: 45 kg',
          answer: `
            <strong>मुख्य चिकित्सीय पात्रता नियम:</strong><br>
            • 🎂 <strong>उम्र:</strong> 18 से 65 वर्ष के बीच।<br>
            • ⚖️ <strong>शारीरिक वजन:</strong> कम से कम <strong>45 kg</strong> (350 ml के लिए) या <strong>55 kg</strong> (450 ml के लिए)।<br>
            • 🩸 <strong>हीमोग्लोबिन (Hb):</strong> न्यूनतम <strong>12.5 g/dL</strong> होना चाहिए।<br>
            • 💓 <strong>रक्तचाप (BP):</strong> 100-140 / 60-90 सामान्य सीमा में होना चाहिए।<br>
            • 🌡️ पिछले 7 दिनों से बुखार, सर्दी या किसी संक्रमण से मुक्त होना चाहिए।
          `,
          actions: [
            { label: '🩺 10 सेकंड पात्रता जांच', tool: 'eligibility_wizard' },
            { label: '🎨 टैटू और शराब नियम', query: 'क्या टैटू या शराब के बाद रक्तदान कर सकते हैं?' }
          ]
        }
      }
    },

    // H. Tattoos, Piercings, Alcohol & Medicines
    tattoos_alcohol: {
      keywords: [
        'tattoo', 'piercing', 'alcohol', 'smoking', 'medicine', 'antibiotics', 'beer', 'whiskey', 'drugs', 'drunk',
        'టాటూ', 'పచ్చబొట్టు', 'ఆల్కహాల్', 'మద్యం', 'మందులు', 'స్మోకింగ్', 'టాటూ వేయించుకుంటే',
        'टैटू', 'शराब', 'अल्कोहल', 'दवा', 'धूम्रपान', 'दवाइयां', 'एंटीबायोटिक'
      ],
      title: '🎨 Tattoos, Alcohol & Medicine Guidelines',
      badge: 'Tattoos: 6–12 Mos • Alcohol: 24 Hours',
      answer: `
        <strong>Deferral Guidelines:</strong><br>
        • 🎨 <strong>Tattoos & Piercings:</strong> Must wait <strong>6 to 12 months</strong> (prevents transmission of Hepatitis B/C).<br>
        • 🍷 <strong>Alcohol:</strong> Avoid alcohol consumption for at least <strong>24 hours</strong> prior to donation.<br>
        • 🚬 <strong>Smoking:</strong> Avoid smoking <strong>2 hours before</strong> and <strong>2 hours after</strong> donation.<br>
        • 💊 <strong>Antibiotics:</strong> Must complete course and be infection-free for at least <strong>72 hours</strong>.
      `,
      actions: [
        { label: '🩺 Check 10s Eligibility', tool: 'eligibility_wizard' },
        { label: '🩸 Safe Volume (ml)', tool: 'volume_calculator' }
      ],
      translations: {
        te: {
          title: '🎨 టాటూలు, ఆల్కహాల్ మరియు మందుల నిబంధనలు',
          badge: 'టాటూ: 6–12 నెలలు • ఆల్కహాల్: 24 గంటలు',
          answer: `
            <strong>ముఖ్య మార్గదర్శకాలు:</strong><br>
            • 🎨 <strong>టాటూలు & పచ్చబొట్లు:</strong> టాటూ వేయించుకున్న తర్వాత <strong>6 నుండి 12 నెలలు</strong> ఆగాలి (హెపటైటిస్ వ్యాప్తి నివారణకు).<br>
            • 🍷 <strong>ఆల్కహాల్ (మద్యం):</strong> రక్తదానానికి కనీసం <strong>24 గంటల ముందు</strong> మద్యం సేవించకూడదు.<br>
            • 🚬 <strong>ధూమపానం (స్మోకింగ్):</strong> రక్తదానానికి 2 గంటల ముందు, తర్వాత స్మోకింగ్ చేయకూడదు.<br>
            • 💊 <strong>యాంటీబయోటిక్స్:</strong> కోర్సు పూర్తయిన తర్వాత కనీసం 72 గంటలు ఆగాలి.
          `,
          actions: [
            { label: '🩺 10s అర్హత చెక్', tool: 'eligibility_wizard' }
          ]
        },
        hi: {
          title: '🎨 टैटू, शराब और दवाओं के नियम',
          badge: 'टैटू: 6–12 महीने • शराब: 24 घंटे',
          answer: `
            <strong>सुरक्षा दिशानिर्देश:</strong><br>
            • 🎨 <strong>टैटू और पियर्सिंग:</strong> टैटू बनवाने के बाद <strong>6 से 12 महीने</strong> का इंतजार करना अनिवार्य है।<br>
            • 🍷 <strong>शराब:</strong> रक्तदान से कम से कम <strong>24 घंटे पहले</strong> शराब का सेवन न करें।<br>
            • 🚬 <strong>धूम्रपान:</strong> रक्तदान से 2 घंटे पहले और 2 घंटे बाद तक बीड़ी/सिगरेट न पिएं।<br>
            • 💊 <strong>दवाएं:</strong> एंटीबायोटिक का कोर्स खत्म होने के 72 घंटे बाद ही रक्तदान करें।
          `,
          actions: [
            { label: '🩺 पात्रता जांचें', tool: 'eligibility_wizard' }
          ]
        }
      }
    },

    // I. Rewards & Medical Health Points
    rewards: {
      keywords: [
        'rewards', 'points', 'health points', 'bonus points', '500 points', 'coins', 'medical points', 'earn points',
        'పాయింట్లు', 'రివార్డులు', 'మెడికల్ పాయింట్లు', '500 పాయింట్లు', 'పాయింట్స్ ఎలా వస్తాయి',
        'पॉइंट्स', 'रिवॉर्ड', 'मेडिकल पॉइंट्स', '500 बोनस', 'पॉइंट्स कैसे कमाएं'
      ],
      title: '🪙 Medical Points & Donor Rewards System',
      badge: '+500 Pts on Sign Up • +500 Pts / Donation',
      answer: `
        <strong>BloodConnect Rewards Program:</strong><br>
        • 🎁 <strong>Welcome Bonus:</strong> Earn <strong>+500 Medical Points</strong> immediately upon verified donor registration.<br>
        • 🩸 <strong>Donation Reward:</strong> Earn <strong>+500 Points</strong> every time you complete a blood donation at partner hospitals.<br>
        • 🏥 <strong>Redemption Benefits:</strong> Points can be redeemed for free health checkups, discounted diagnostic scans, pharmacy cashback, and wellness perks!
      `,
      actions: [
        { label: '🪙 Open Points Vault', href: './rewards.html' },
        { label: '🧬 Register as Donor', href: './donor.html' }
      ],
      translations: {
        te: {
          title: '🪙 మెడికల్ హెల్త్ పాయింట్లు & రివార్డులు',
          badge: 'రిజిస్ట్రేషన్‌పై +500 పాయింట్లు • రక్తదానానికి +500 పాయింట్లు',
          answer: `
            <strong>బ్లడ్‌కనెక్ట్ రివార్డుల విధానం:</strong><br>
            • 🎁 <strong>స్వాగత బోనస్:</strong> రిజిస్టర్ కాగానే <strong>+500 ఉచిత మెడికల్ పాయింట్లు</strong> లభిస్తాయి.<br>
            • 🩸 <strong>రక్తదాన రివార్డ్:</strong> భాగస్వామ్య ఆసుపత్రులలో రక్తదానం చేసిన ప్రతిసారీ <strong>+500 పాయింట్లు</strong> లభిస్తాయి.<br>
            • 🏥 <strong>ఉపయోగాలు:</strong> ఈ పాయింట్లతో ఉచిత డయాగ్నస్టిక్ టెస్టులు, హెల్త్ చెకప్‌లు, మందులపై క్యాష్‌బ్యాక్ పొందవచ్చు!
          `,
          actions: [
            { label: '🪙 రివార్డ్స్ వాల్ట్ చూడండి', href: './rewards.html' },
            { label: '🧬 డోనర్‌గా నమోదు చేసుకోండి', href: './donor.html' }
          ]
        },
        hi: {
          title: '🪙 मेडिकल हेल्थ पॉइंट्स एवं रिवॉर्ड सिस्टम',
          badge: 'रजिस्ट्रेशन पर +500 पॉइंट्स • प्रत्येक दान पर +500 पॉइंट्स',
          answer: `
            <strong>ब्लडकनेक्ट रिवॉर्ड प्रोग्राम:</strong><br>
            • 🎁 <strong>वेलकम बोनस:</strong> पंजीकरण करने पर तुरंत <strong>+500 मेडिकल पॉइंट्स</strong> मिलते हैं।<br>
            • 🩸 <strong>रक्तदान रिवॉर्ड:</strong> पार्टनर अस्पतालों में रक्तदान करने पर हर बार <strong>+500 पॉइंट्स</strong> मिलते हैं।<br>
            • 🏥 <strong>उपयोग:</strong> इन पॉइंट्स का उपयोग मुफ्त स्वास्थ्य जांच, डायग्नोस्टिक टेस्ट और दवाइयों पर छूट के लिए किया जा सकता है।
          `,
          actions: [
            { label: '🪙 पॉइंट्स वॉल्ट खोलें', href: './rewards.html' },
            { label: '🧬 डोनर बनें', href: './donor.html' }
          ]
        }
      }
    },

    // J. Digital QR Check-In Pass
    checkin_pass: {
      keywords: [
        'qr', 'qr code', 'check in', 'pass', 'digital pass', 'hospital check in', 'hospital pass', 'checkin',
        'qr కోడ్', 'డిజిటల్ పాస్', 'చెక్ ఇన్', 'హాస్పిటల్ పాస్', 'పాస్ ఎలా వస్తుంది',
        'qr कोड', 'डिजिटल पास', 'चेक इन', 'अस्पताल पास', 'पास कैसे पाएं'
      ],
      title: '📱 Digital QR Hospital Check-In Pass',
      badge: 'Express Zero-Wait Hospital Admission',
      answer: `
        <strong>Digital Check-In Pass Instructions:</strong><br>
        • ⚡ <strong>Instant Generation:</strong> When you accept a donation request, BloodConnect generates a secure encrypted QR Pass and 6-character Alpha-Check code.<br>
        • 🏥 <strong>At Hospital Desk:</strong> Scan your QR Pass at the hospital blood bank tablet (e.g. KIMS Gate A or Apollo Gate 2) for immediate VIP zero-wait priority check-in.<br>
        • 🪙 <strong>Automatic Points Credit:</strong> Points are instantly credited to your account upon scan!
      `,
      actions: [
        { label: '🧬 Go to Donor Hub to Generate Pass', href: './donor.html' },
        { label: '🏥 View Hospital Desks', tool: 'hospital_dispatch' }
      ],
      translations: {
        te: {
          title: '📱 డిజిటల్ QR హాస్పిటల్ చెక్-ఇన్ పాస్',
          badge: 'ఎక్స్‌ప్రెస్ జీరో-వెయిట్ అడ్మిషన్',
          answer: `
            <strong>డిజిటల్ పాస్ మార్గదర్శకాలు:</strong><br>
            • ⚡ <strong>తక్షణ సృష్టి:</strong> మీరు డొనేషన్ అభ్యర్థనను ఆమోదించగానే బ్లడ్‌కనెక్ట్ ఒక సురక్షిత QR పాస్ మరియు 6-అక్షరాల కోడ్‌ను అందిస్తుంది.<br>
            • 🏥 <strong>ఆసుపత్రిలో:</strong> KIMS గేట్ A లేదా అపోలో గేట్ 2 వద్ద ఉన్న స్కానర్‌లో ఈ QR కోడ్ చూపించగానే ఎలాంటి లైన్ లేకుండా నేరుగా లోపలికి అనుమతిస్తారు.<br>
            • 🪙 స్కాన్ పూర్తవగానే మీ ఖాతాలో పాయింట్లు జమ చేయబడతాయి!
          `,
          actions: [
            { label: '🧬 డోనర్ హబ్‌లో పాస్ పొందండి', href: './donor.html' }
          ]
        },
        hi: {
          title: '📱 डिजिटल QR अस्पताल चेक-इन पास',
          badge: 'बिना कतार त्वरित प्रवेश',
          answer: `
            <strong>डिजिटल चेक-इन पास विवरण:</strong><br>
            • ⚡ <strong>तुरंत पास:</strong> जब आप रक्तदान स्वीकार करते हैं, तो आपको एक सुरक्षित QR पास और कोड मिलता है।<br>
            • 🏥 <strong>अस्पताल में:</strong> KIMS गेट A या अपोलो गेट 2 के काउंटर पर इस QR को स्कैन कराएं और बिना लाइन के प्राथमिकता से रक्तदान करें।<br>
            • 🪙 स्कैन होते ही पॉइंट्स आपके खाते में जुड़ जाते हैं!
          `,
          actions: [
            { label: '🧬 डोनर हब में पास देखें', href: './donor.html' }
          ]
        }
      }
    },

    // K. All Hospitals Directory
    all_hospitals: {
      keywords: [
        'hospitals', 'all hospitals', 'hospital list', 'hospital numbers', 'yashoda', 'care hospital', 'continental', 'blood bank numbers', 'helpline', 'emergency desks',
        'ఆసుపత్రులు', 'అన్ని ఆసుపత్రులు', 'హాస్పిటల్ నంబర్లు', 'హెల్ప్‌లైన్లు',
        'अस्पताल', 'सभी अस्पताल', 'अस्पताल के नंबर', 'हेल्पलाइन सूची'
      ],
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
      ],
      translations: {
        te: {
          title: '🏥 హైదరాబాద్ భాగస్వామ్య ఆసుపత్రుల డైరెక్టరీ',
          badge: '5 ధృవీకరించబడిన ఆసుపత్రులు',
          answer: `
            <strong>హైదరాబాద్ బ్లడ్ బ్యాంక్ & ఎమర్జెన్సీ డెస్కులు:</strong><br><br>
            1. <strong>KIMS హాస్పిటల్స్ సికింద్రాబాద్ (బేగంపేట)</strong><br>
            &bull; 📞 <strong>+91 97015 16959</strong> &bull; 🚪 గేట్ A క్యాజువాలిటీ, 1వ అంతస్తు<br><br>
            2. <strong>అపోలో హాస్పిటల్స్ జూబ్లీహిల్స్</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 గేట్ 2 ట్రామా సెంటర్<br><br>
            3. <strong>యశోద హాస్పిటల్స్ సోమాజిగూడ</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 క్యాజువాలిటీ గేట్ 3<br><br>
            4. <strong>కేర్ హాస్పిటల్స్ బంజారాహిల్స్</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 మెయిన్ టవర్ గేట్ 1<br><br>
            5. <strong>కాంటినెంటల్ హాస్పిటల్స్ గచ్చిబౌలి</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 క్యాజువాలిటీ గేట్ 4
          `,
          actions: [
            { label: '🏥 ఆసుపత్రుల డెస్కులు చూడండి', tool: 'hospital_dispatch' },
            { label: '📞 KIMS కి కాల్ చేయండి (+91 97015 16959)', href: 'tel:+919701516959' },
            { label: '📞 అపోలో కి కాల్ చేయండి (+91 87121 27287)', href: 'tel:+918712127287' }
          ]
        },
        hi: {
          title: '🏥 हैदराबाद पार्टनर अस्पताल निर्देशिका',
          badge: '5 सत्यापित अस्पताल सक्रिय',
          answer: `
            <strong>हैदराबाद के प्रमुख ब्लड बैंक एवं आपातकालीन नंबर:</strong><br><br>
            1. <strong>KIMS अस्पताल सिकंदराबाद (बेगमपेट)</strong><br>
            &bull; 📞 <strong>+91 97015 16959</strong> &bull; 🚪 गेट A कैजुअल्टी, पहली मंजिल<br><br>
            2. <strong>अपोलो अस्पताल जुबली हिल्स</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 गेट 2 ट्रॉमा सेंटर<br><br>
            3. <strong>यशोदा अस्पताल सोमाजीगुडा</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 गेट 3 कैजुअल्टी<br><br>
            4. <strong>केयर अस्पताल बंजारा हिल्स</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 मुख्य टावर गेट 1<br><br>
            5. <strong>कॉन्टिनेंटल अस्पताल गाचीबाउली</strong><br>
            &bull; 📞 <strong>+91 87121 27287</strong> &bull; 🚪 गेट 4 कैजुअल्टी
          `,
          actions: [
            { label: '🏥 अस्पताल कार्ड खोलें', tool: 'hospital_dispatch' },
            { label: '📞 KIMS को कॉल करें (+91 97015 16959)', href: 'tel:+919701516959' },
            { label: '📞 अपोलो को कॉल करें (+91 87121 27287)', href: 'tel:+918712127287' }
          ]
        }
      }
    }
  };

  // 3. Multilingual Quick FAQ Categories & Chips
  const FAQ_CATEGORIES = {
    top: {
      label: { en: '🔥 Top FAQs', te: '🔥 ముఖ్యమైనవి', hi: '🔥 शीर्ष प्रश्न', ta: '🔥 முக்கிய', kn: '🔥 ಮುಖ್ಯ', es: '🔥 Top FAQs' },
      chips: {
        en: [
          { label: '🩸 How much ml is required on a donation?', query: 'How much ml of blood is required in a donation?' },
          { label: '🏥 What is the helpline for KIMS Hospital?', query: 'What is the contact number for KIMS Hospital?' },
          { label: '👥 Who can donate to O+ blood?', query: 'Who can donate to O+ blood?' },
          { label: '⏱️ What is the time gap between donations?', query: 'What is the time gap between blood donations?' }
        ],
        te: [
          { label: '🩸 రక్తదానంలో ఎన్ని ml రక్తం తీసుకుంటారు?', query: 'రక్తదానంలో ఎన్ని ml రక్తం తీసుకుంటారు?' },
          { label: '🏥 KIMS హాస్పిటల్ హెల్ప్‌లైన్ నంబర్ ఎంత?', query: 'KIMS హాస్పిటల్ ఫోన్ నంబర్ ఏమిటి?' },
          { label: '👥 O+ రక్తానికి ఎవరు రక్తం ఇవ్వగలరు?', query: 'O+ కి ఎవరు రక్తం ఇవ్వవచ్చు?' },
          { label: '⏱️ రక్తదానాల మధ్య ఎంత గ్యాప్ ఉండాలి?', query: 'రక్తదానానికి ఎంత సమయం గ్యాప్ ఉండాలి?' }
        ],
        hi: [
          { label: '🩸 रक्तदान में कितने ml खून लिया जाता है?', query: 'रक्तदान में कितने ml खून लिया जाता है?' },
          { label: '🏥 KIMS अस्पताल का हेल्पलाइन नंबर क्या है?', query: 'KIMS अस्पताल का फोन नंबर क्या है?' },
          { label: '👥 O+ रक्त समूह को कौन दान कर सकता है?', query: 'O+ ब्लड ग्रुप को कौन रक्तदान कर सकता है?' },
          { label: '⏱️ रक्तदान के बीच कितना समय अंतराल चाहिए?', query: 'रक्तदान के बीच कितना समय अंतराल होना चाहिए?' }
        ]
      }
    },
    volume: {
      label: { en: '🩸 Volume & ML', te: '🩸 రక్తం ml', hi: '🩸 रक्त ml', ta: '🩸 இரத்த அளவு', kn: '🩸 ಪ್ರಮಾಣ ml', es: '🩸 Volumen ml' },
      chips: {
        en: [
          { label: '🧮 Calculate My Volume (ml)', tool: 'volume_calculator' },
          { label: '🩸 Is 350ml or 450ml taken from me?', query: 'How much ml of blood is required in a donation?' },
          { label: '💧 How fast does plasma fluid recover?', query: 'How fast does body fluid and plasma recover after blood donation?' }
        ],
        te: [
          { label: '🧮 నా బరువుకు ఎన్ని ml రక్తం పడుతుంది?', tool: 'volume_calculator' },
          { label: '🩸 350 ml తీసుకుంటారా లేక 450 ml ఆ?', query: 'రక్తదానంలో ఎన్ని ml రక్తం తీసుకుంటారు?' },
          { label: '💧 శరీరంలో రక్తం ఎంత త్వరగా భర్తీ అవుతుంది?', query: 'రక్తం ఎంత త్వరగా మళ్ళీ తయారవుతుంది?' }
        ],
        hi: [
          { label: '🧮 मेरे वजन के अनुसार रक्त की मात्रा', tool: 'volume_calculator' },
          { label: '🩸 350 ml या 450 ml लिया जाता है?', query: 'रक्तदान में कितने ml खून लिया जाता है?' },
          { label: '💧 खून वापस बनने में कितना समय लगता है?', query: 'रक्तदान के बाद खून कितनी जल्दी बनता है?' }
        ]
      }
    },
    hospitals: {
      label: { en: '🏥 Hospitals', te: '🏥 ఆసుపత్రులు', hi: '🏥 अस्पताल', ta: '🏥 மருத்துவமனை', kn: '🏥 ಆಸ್ಪತ್ರೆಗಳು', es: '🏥 Hospitales' },
      chips: {
        en: [
          { label: '🏥 KIMS Secunderabad (9701516959)', query: 'What is the contact number for KIMS Hospital?' },
          { label: '🏥 Apollo Jubilee Hills (8712125287)', query: 'Where is Apollo Jubilee Hills emergency gate?' },
          { label: '⚡ Open Hospital Dispatch Cards', tool: 'hospital_dispatch' }
        ],
        te: [
          { label: '🏥 KIMS సికింద్రాబాద్ (9701516959)', query: 'KIMS హాస్పిటల్ ఫోన్ నంబర్ ఏమిటి?' },
          { label: '🏥 అపోలో జూబ్లీహిల్స్ (8712125287)', query: 'అపోలో జూబ్లీహిల్స్ నంబర్ ఎంత?' },
          { label: '⚡ ఆసుపత్రుల వివరాలు చూడండి', tool: 'hospital_dispatch' }
        ],
        hi: [
          { label: '🏥 KIMS सिकंदराबाद (9701516959)', query: 'KIMS अस्पताल का फोन नंबर क्या है?' },
          { label: '🏥 अपोलो जुबली हिल्स (8712125287)', query: 'अपोलो जुबली हिल्स आपातकालीन नंबर' },
          { label: '⚡ सभी अस्पताल निर्देशिका', tool: 'hospital_dispatch' }
        ]
      }
    },
    compatibility: {
      label: { en: '🧬 Compatibility', te: '🧬 అనుకూలత', hi: '🧬 अनुकूलता', ta: '🧬 பொருத்தம்', kn: '🧬 ಹೊಂದಾಣಿಕೆ', es: '🧬 Compatibilidad' },
      chips: {
        en: [
          { label: '🧬 Test Interactive Compatibility Matrix', tool: 'compat_matrix:all' },
          { label: '🩸 Who is the Universal Donor (O-)?', query: 'Tell me about O- universal donor' },
          { label: '👑 Who is the Universal Recipient (AB+)?', query: 'Tell me about AB+ universal recipient' }
        ],
        te: [
          { label: '🧬 రక్త వర్గాల అనుకూలత పట్టిక', tool: 'compat_matrix:all' },
          { label: '🩸 సార్వత్రిక దాత (O-) ఎవరు?', query: 'O- సార్వత్రిక దాత గురించి చెప్పండి' },
          { label: '👑 సార్వత్రిక గ్రహీత (AB+) ఎవరు?', query: 'AB+ సార్వత్రిక గ్రహీత గురించి చెప్పండి' }
        ],
        hi: [
          { label: '🧬 रक्त समूह अनुकूलता मैट्रिक्स', tool: 'compat_matrix:all' },
          { label: '🩸 सर्वदाता (O-) कौन है?', query: 'सर्वदाता O नेगेटिव के बारे में बताएं' },
          { label: '👑 सर्वग्राही (AB+) कौन है?', query: 'सर्वग्राही AB पॉजिटिव के बारे में बताएं' }
        ]
      }
    },
    eligibility: {
      label: { en: '🩺 Eligibility', te: '🩺 అర్హత', hi: '🩺 पात्रता', ta: '🩺 தகுதி', kn: '🩺 ಅರ್ಹತೆ', es: '🩺 Elegibilidad' },
      chips: {
        en: [
          { label: '🩺 10-Second Eligibility Screener', tool: 'eligibility_wizard' },
          { label: '💊 Can I donate after medicine or alcohol?', query: 'Can I donate after taking medicine or alcohol?' },
          { label: '🎨 Tattoo and piercing rules', query: 'Can I donate if I got a tattoo or piercing?' }
        ],
        te: [
          { label: '🩺 10 సెకన్ల అర్హత చెకర్', tool: 'eligibility_wizard' },
          { label: '💊 మందులు లేదా మద్యం తీసుకున్న తర్వాత రక్తదానం చేయవచ్చా?', query: 'ఆల్కహాల్ లేదా మందుల తర్వాత రక్తదానం చేయవచ్చా?' },
          { label: '🎨 టాటూ నియమాలు', query: 'టాటూ వేయించుకుంటే రక్తదానం చేయవచ్చా?' }
        ],
        hi: [
          { label: '🩺 10 सेकंड पात्रता जांच', tool: 'eligibility_wizard' },
          { label: '💊 दवा या शराब के बाद रक्तदान?', query: 'क्या दवा या शराब के बाद रक्तदान कर सकते हैं?' },
          { label: '🎨 टैटू बनवाने के नियम', query: 'क्या टैटू के बाद रक्तदान कर सकते हैं?' }
        ]
      }
    }
  };

  // 4. Proactive Multilingual Teaser Facts
  const TEASER_FACTS = {
    en: [
      { text: '💡 350–450ml of blood can save up to 3 lives! Ask me how →', query: 'How much ml of blood is required in a donation?' },
      { text: '🏥 Need KIMS (9701516959) or Apollo helpline? Tap to ask!', query: 'What is the contact number for KIMS Hospital?' },
      { text: '🧬 Wondering who can receive O+ blood? Ask me!', query: 'Who can donate to O+ blood?' },
      { text: '🩺 Are you eligible to donate today? Check in 10s →', tool: 'eligibility_wizard' }
    ],
    te: [
      { text: '💡 350–450ml రక్తం 3 ప్రాణాలను కాపాడుతుంది! తెలుసుకోండి →', query: 'రక్తదానంలో ఎన్ని ml రక్తం తీసుకుంటారు?' },
      { text: '🏥 KIMS హెల్ప్‌లైన్: +91 97015 16959! అడగండి →', query: 'KIMS హాస్పిటల్ ఫోన్ నంబర్ ఏమిటి?' },
      { text: '🧬 O+ రక్తం ఎవరికి సరిపోతుంది? అడగండి!', query: 'O+ కి ఎవరు రక్తం ఇవ్వవచ్చు?' },
      { text: '🩺 మీరు రక్తదానానికి అర్హులా? 10 సెకన్లలో చెక్ చేయండి →', tool: 'eligibility_wizard' }
    ],
    hi: [
      { text: '💡 350–450ml रक्त 3 जिंदगियां बचा सकता है! पूछें कैसे →', query: 'रक्तदान में कितने ml खून लिया जाता है?' },
      { text: '🏥 KIMS हेल्पलाइन: +91 97015 16959! अभी पूछें →', query: 'KIMS अस्पताल का फोन नंबर क्या है?' },
      { text: '🧬 O+ रक्त किसे दिया जा सकता है? अभी पूछें!', query: 'O+ ब्लड ग्रुप को कौन रक्तदान कर सकता है?' },
      { text: '🩺 क्या आप आज रक्तदान के लिए योग्य हैं? 10s में जांचें →', tool: 'eligibility_wizard' }
    ]
  };

  // 5. NLP Multilingual Query Matcher Engine
  class BloodBotBrain {
    static matchQuery(queryText, forceLang = null) {
      const q = (queryText || '').toLowerCase().trim();
      if (!q) return null;

      const lang = forceLang || detectLanguage(queryText);

      // Direct intent checks
      if (q.includes('calculator') || q.includes('కాలిక్యులేటర్') || q.includes('कैलकुलेटर') || (q.includes('calculate') && (q.includes('volume') || q.includes('ml')))) {
        return BloodBotBrain.getLocalized(KNOWLEDGE_BASE.volume, lang);
      }
      if (q.includes('screener') || q.includes('check eligibility') || q.includes('am i eligible') || q.includes('అర్హత') || q.includes('पात्रता')) {
        return BloodBotBrain.getLocalized(KNOWLEDGE_BASE.eligibility, lang);
      }
      if (q.includes('dispatch') || q.includes('call hospital') || q.includes('all hospitals') || q.includes('అన్ని ఆసుపత్రులు') || q.includes('सभी अस्पताल')) {
        return BloodBotBrain.getLocalized(KNOWLEDGE_BASE.all_hospitals, lang);
      }

      let bestMatch = null;
      let highestScore = 0;

      for (const [key, item] of Object.entries(KNOWLEDGE_BASE)) {
        let score = 0;

        for (const kw of item.keywords) {
          const kwLower = kw.toLowerCase();
          if (q.includes(kwLower)) {
            score += Math.max(kwLower.length * 2.5, 4);
          }
        }

        const qWords = q.split(/\s+/);
        for (const word of qWords) {
          if (word.length > 2) {
            for (const kw of item.keywords) {
              if (kw.toLowerCase().includes(word)) score += 1.5;
            }
          }
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      if (highestScore >= 3 && bestMatch) {
        return BloodBotBrain.getLocalized(bestMatch, lang);
      }

      // Helpful multilingual fallback
      return BloodBotBrain.getFallback(queryText, lang);
    }

    static getLocalized(item, lang) {
      if (!item) return null;
      const trans = (item.translations && item.translations[lang]) || null;
      return {
        title: trans?.title || item.title,
        badge: trans?.badge || item.badge,
        answer: trans?.answer || item.answer,
        actions: trans?.actions || item.actions || [],
        isTool: item.isTool
      };
    }

    static getFallback(queryText, lang) {
      const fallbacks = {
        te: {
          title: '🤖 బ్లడ్‌బాట్ వైద్య సహాయకుడు',
          badge: 'సాధారణ సహాయం',
          answer: `మీరు అడిగారు: <em>"${escapeHtml(queryText)}"</em>.<br><br>
                   తరచుగా అడిగే ముఖ్య సమాచారం:<br><br>
                   • 🩸 <strong>రక్త పరిమాణం:</strong> సాధారణంగా <strong>350 ml నుండి 450 ml</strong> (~8-10% రక్తం).<br>
                   • ⏱️ <strong>వ్యవధి:</strong> పురుషులకు 3 నెలలు, మహిళలకు 4 నెలలు.<br>
                   • 🏥 <strong>హెల్ప్‌లైన్లు:</strong> KIMS సికింద్రాబాద్ (<code>+91 97015 16959</code>), అపోలో జూబ్లీహిల్స్ (<code>+91 87121 27287</code>).<br>
                   • 🧬 <strong>అనుకూలత:</strong> O- విశ్వ దాత, AB+ విశ్వ గ్రహీత.`,
          actions: [
            { label: '🧮 వాల్యూమ్ కాలిక్యులేటర్', tool: 'volume_calculator' },
            { label: '🩺 అర్హత పరీక్ష (10s)', tool: 'eligibility_wizard' },
            { label: '🏥 KIMS నంబర్', query: 'KIMS హాస్పిటల్ ఫోన్ నంబర్ ఏమిటి?' },
            { label: '👥 రక్త వర్గాలు', tool: 'compat_matrix:all' }
          ]
        },
        hi: {
          title: '🤖 ब्लडबॉट मेडिकल सहायक',
          badge: 'सामान्य सहायता',
          answer: `आपकी जिज्ञासा: <em>"${escapeHtml(queryText)}"</em>.<br><br>
                   यहाँ मुख्य विषयों की जानकारी उपलब्ध है:<br><br>
                   • 🩸 <strong>रक्त की मात्रा:</strong> <strong>350 ml से 450 ml</strong> (शरीर के कुल रक्त का ~8-10%).<br>
                   • ⏱️ <strong>समय अंतराल:</strong> पुरुषों के लिए 3 माह, महिलाओं के लिए 4 माह.<br>
                   • 🏥 <strong>हेल्पलाइन:</strong> KIMS सिकंदराबाद (<code>+91 97015 16959</code>), अपोलो जुबली हिल्स (<code>+91 87121 27287</code>).<br>
                   • 🧬 <strong>रक्त अनुकूलता:</strong> O- सर्वदाता है, AB+ सर्वग्राही है।`,
          actions: [
            { label: '🧮 वॉल्यूम कैलकुलेटर', tool: 'volume_calculator' },
            { label: '🩺 10s पात्रता जांच', tool: 'eligibility_wizard' },
            { label: '🏥 KIMS हेल्पलाइन', query: 'KIMS अस्पताल का फोन नंबर क्या है?' },
            { label: '👥 अनुकूलता चार्ट', tool: 'compat_matrix:all' }
          ]
        },
        ta: {
          title: '🤖 பிளட்பாட் மருத்துவ உதவியாளர்',
          badge: 'பொது உதவி',
          answer: `உங்கள் கேள்வி: <em>"${escapeHtml(queryText)}"</em>.<br><br>
                   முக்கிய தகவல்கள்:<br><br>
                   • 🩸 <strong>இரத்த அளவு:</strong> <strong>350 ml - 450 ml</strong>.<br>
                   • ⏱️ <strong>இடைவெளி:</strong> ஆண்களுக்கு 3 மாதம், பெண்களுக்கு 4 மாதம்.<br>
                   • 🏥 <strong>உதவி எண்:</strong> KIMS (<code>+91 97015 16959</code>), அப்பல்லோ (<code>+91 87121 27287</code>).`,
          actions: [
            { label: '🧮 இரத்த அளவு கணக்கீடு', tool: 'volume_calculator' },
            { label: '🩺 தகுதி சரிபார்ப்பு', tool: 'eligibility_wizard' },
            { label: '🏥 KIMS உதவி எண்', query: 'KIMS மருத்துவமனை உதவி எண்' }
          ]
        },
        kn: {
          title: '🤖 ಬ್ಲಡ್‌ಬಾಟ್ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ',
          badge: 'ಸಾಮಾನ್ಯ ಮಾಹಿತಿ',
          answer: `ನಿಮ್ಮ ಪ್ರಶ್ನೆ: <em>"${escapeHtml(queryText)}"</em>.<br><br>
                   ಮುಖ್ಯ ವಿವರಗಳು:<br><br>
                   • 🩸 <strong>ರಕ್ತದ ಪ್ರಮಾಣ:</strong> <strong>350 ml ರಿಂದ 450 ml</strong>.<br>
                   • ⏱️ <strong>ಅಂತರ:</strong> ಪುರುಷರಿಗೆ 3 ತಿಂಗಳು, ಮಹಿಳೆಯರಿಗೆ 4 ತಿಂಗಳು.<br>
                   • 🏥 <strong>ಸಹಾಯವಾಣಿ:</strong> KIMS (<code>+91 97015 16959</code>), ಅಪೊಲೊ (<code>+91 87121 27287</code>).`,
          actions: [
            { label: '🧮 ಪ್ರಮಾಣ ಕ್ಯಾಲ್ಕುಲೇಟರ್', tool: 'volume_calculator' },
            { label: '🩺 ಅರ್ಹತೆ ಪರಿಶೀಲನೆ', tool: 'eligibility_wizard' },
            { label: '🏥 KIMS ಸಂಖ್ಯೆ', query: 'KIMS ಆಸ್ಪತ್ರೆ ಸಹಾಯವಾಣಿ' }
          ]
        },
        es: {
          title: '🤖 Asistente Médico BloodBot',
          badge: 'Asistencia General',
          answer: `Entiendo su consulta: <em>"${escapeHtml(queryText)}"</em>.<br><br>
                   Temas más frecuentes:<br><br>
                   • 🩸 <strong>Volumen:</strong> <strong>350 ml a 450 ml</strong> (~8-10% del volumen corporal).<br>
                   • ⏱️ <strong>Intervalo:</strong> 3 meses hombres, 4 meses mujeres.<br>
                   • 🏥 <strong>Hospitales:</strong> KIMS (<code>+91 97015 16959</code>), Apollo (<code>+91 87121 27287</code>).<br>
                   • 🧬 <strong>Compatibilidad:</strong> O- Donante Universal, AB+ Receptor Universal.`,
          actions: [
            { label: '🧮 Calculadora de Volumen', tool: 'volume_calculator' },
            { label: '🩺 Chequeo de Elegibilidad', tool: 'eligibility_wizard' },
            { label: '🏥 Teléfono KIMS', query: 'Teléfono de KIMS Hospital' }
          ]
        },
        en: {
          title: '🤖 BloodBot Medical Assistant',
          badge: 'General Assistance',
          answer: `I understand you are asking: <em>"${escapeHtml(queryText)}"</em>.<br><br>
                   Frequently requested topics:<br><br>
                   • 🩸 <strong>Donation Volume:</strong> Standard donation is <strong>350 ml to 450 ml</strong> (~8-10% of total volume).<br>
                   • ⏱️ <strong>Interval:</strong> 3 months for men, 4 months for women.<br>
                   • 🏥 <strong>Helplines:</strong> KIMS Secunderabad (<code>+91 97015 16959</code>), Apollo Jubilee Hills (<code>+91 87121 27287</code>).<br>
                   • 🧬 <strong>Compatibility:</strong> O- is Universal Donor, AB+ is Universal Recipient.`,
          actions: [
            { label: '🧮 Open Volume Calculator', tool: 'volume_calculator' },
            { label: '🩺 10s Eligibility Check', tool: 'eligibility_wizard' },
            { label: '🏥 KIMS Number', query: 'What is the contact number for KIMS Hospital?' },
            { label: '👥 Compatibility', tool: 'compat_matrix:all' }
          ]
        }
      };
      return fallbacks[lang] || fallbacks.en;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 6. Multilingual Voice Helpers & Speech Engine
  let isSpeechEnabled = false;
  let activeUtterance = null;

  function updateEqualizer(active) {
    const eq = document.getElementById('bloodbot-equalizer');
    if (eq) {
      if (active) eq.classList.add('speaking');
      else eq.classList.remove('speaking');
    }
  }

  function showSpeakingBanner() {
    const banner = document.getElementById('bloodbot-speaking-banner');
    if (banner) banner.style.display = 'flex';
  }

  function hideSpeakingBanner() {
    const banner = document.getElementById('bloodbot-speaking-banner');
    if (banner) banner.style.display = 'none';
  }

  function stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    updateEqualizer(false);
    hideSpeakingBanner();
    activeUtterance = null;
    window.__bloodbotUtterance = null;
  }

  function getBestVoice(targetLang = null) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;

    const lang = targetLang || currentLanguage;
    const langPrefix = lang === 'en' ? 'en' : (LANGUAGES[lang]?.code?.split('-')[0] || lang);

    // Try matching specific language first
    const langVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
    if (langVoices.length > 0) {
      const preferred = langVoices.find(v =>
        v.name.includes('Natural') ||
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Jenny') ||
        v.name.includes('Aria')
      );
      return preferred || langVoices[0];
    }

    // Fallback to English
    const englishVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));
    return englishVoices[0] || voices[0] || null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      getBestVoice(currentLanguage);
    };
  }

  function speakResponse(text, forceSpeak = false, speakLang = null) {
    if ((!isSpeechEnabled && !forceSpeak) || typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.resume) {
        window.speechSynthesis.resume();
      }

      const lang = speakLang || currentLanguage;

      let cleanText = text
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, ' and ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/[•\*\#\-]/g, ' ')
        .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (cleanText.length > 350) {
        const sentenceBreak = cleanText.indexOf('.', 140);
        if (sentenceBreak !== -1 && sentenceBreak < 350) {
          cleanText = cleanText.substring(0, sentenceBreak + 1);
        } else {
          cleanText = cleanText.substring(0, 350) + '...';
        }
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      activeUtterance = utterance;
      window.__bloodbotUtterance = utterance;

      utterance.rate = 0.98;
      utterance.pitch = 1.0;
      utterance.lang = LANGUAGES[lang]?.code || 'en-US';

      const voice = getBestVoice(lang);
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
        updateEqualizer(true);
        showSpeakingBanner();
      };

      utterance.onend = () => {
        updateEqualizer(false);
        hideSpeakingBanner();
        activeUtterance = null;
        window.__bloodbotUtterance = null;
      };

      utterance.onerror = () => {
        updateEqualizer(false);
        hideSpeakingBanner();
        activeUtterance = null;
        window.__bloodbotUtterance = null;
      };

      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          updateEqualizer(false);
          hideSpeakingBanner();
        }
      }, 60);

    } catch (err) {
      console.warn('Speech synthesis error:', err);
      updateEqualizer(false);
      hideSpeakingBanner();
    }
  }


  // 7. Build and Inject Floating Widget
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
            <!-- Language Selector Dropdown -->
            <div class="bloodbot-lang-wrap">
              <select id="bloodbot-lang-select" class="bloodbot-lang-select" aria-label="Select Assistant Language" title="Change Language / భాష మార్చండి / भाषा बदलें">
                <option value="en">🌐 English</option>
                <option value="te">🇮🇳 తెలుగు</option>
                <option value="hi">🇮🇳 हिंदी</option>
                <option value="ta">🇮🇳 தமிழ்</option>
                <option value="kn">🇮🇳 ಕನ್ನಡ</option>
                <option value="es">🇪🇸 Español</option>
              </select>
            </div>
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
            <!-- Populated dynamically based on active language -->
          </div>
          <div class="bloodbot-faqs-scroll" id="bloodbot-faqs-list">
            <!-- Populated dynamically based on active category -->
          </div>
        </div>

        <!-- Messages Flow Scroll Area -->
        <div class="bloodbot-messages-area" id="bloodbot-messages-area">
          <!-- Initial Welcome Greeting Bubble -->
          <div class="bloodbot-msg bloodbot-msg-bot">
            <div class="bloodbot-msg-avatar">🤖</div>
            <div class="bloodbot-msg-content">
              <div class="bloodbot-msg-badge">✨ Multilingual Health Companion</div>
              <div class="bloodbot-msg-body">
                Hello! I am your <strong>BloodConnect AI Assistant</strong>.<br>
                <span style="font-size: 11.5px; color: var(--secondary-glow);">నమస్కారం! నేను తెలుగులో కూడా సమాధానం చెప్పగలను • नमस्ते! मैं हिंदी में भी सहायता कर सकता हूँ</span><br><br>
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
                  <button type="button" class="bot-tool-card-btn voice-trigger-btn" id="bot-welcome-voice-btn" onclick="window.startBloodBotVoice()">
                    <span class="tool-icon">🎙️</span>
                    <span class="tool-label">Voice Command Mode<br><small style="color:var(--text-dim);">Tap & speak your query</small></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Audio Equalizer Waveform & Voice Listening Overlay Card -->
        <div id="bloodbot-listening-overlay" class="bloodbot-listening-overlay" style="display: none;">
          <div class="listening-overlay-inner">
            <div class="listening-top-bar">
              <div class="listening-indicator">
                <span class="listening-live-dot"></span>
                <span class="listening-status-text" id="bloodbot-listening-status">Listening... Speak now</span>
              </div>
              <div class="listening-wave-bars">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
            <div class="listening-transcript" id="bloodbot-listening-transcript">
              Listening... Say: "What is KIMS helpline?" or "How much ml to donate?"
            </div>
            <div class="listening-footer-btns">
              <button type="button" class="listening-btn cancel" id="bloodbot-voice-cancel">Cancel</button>
              <button type="button" class="listening-btn send" id="bloodbot-voice-send">Done</button>
            </div>
          </div>
        </div>

        <!-- Speaking Banner Pill -->
        <div id="bloodbot-speaking-banner" class="bloodbot-speaking-banner" style="display: none;">
          <div class="speaking-banner-left">
            <span class="speaking-pulse-icon">🔊</span>
            <span class="speaking-banner-text">Reading answer aloud...</span>
          </div>
          <button type="button" class="speaking-stop-btn" id="bloodbot-speaking-stop" title="Stop Audio Narration">Stop ⏹️</button>
        </div>

        <!-- Chat Input Form with Enhanced Mic Button -->
        <form id="bloodbot-input-form" class="bloodbot-input-form" autocomplete="off">
          <input 
            type="text" 
            id="bloodbot-input-field" 
            class="bloodbot-input-field" 
            placeholder="Ask in English, తెలుగు, हिंदी... (e.g., KIMS helpline, ml required)" 
            aria-label="Ask a medical or donation question"
          />
          <!-- Interactive Voice Input Microphone Trigger -->
          <button type="button" id="bloodbot-mic-btn" class="bloodbot-mic-btn" title="Voice Command (Click to Speak)" aria-label="Speak Question via Microphone">
            🎤
          </button>
          <button type="submit" id="bloodbot-send-btn" class="bloodbot-send-btn" aria-label="Send message">
            <span>Send</span>
            <span>➤</span>
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


  // 9. Event Binding & Multilingual UI Management
  function initBloodBotEvents() {
    const launcher = document.getElementById('bloodbot-launcher');
    const chatWindow = document.getElementById('bloodbot-chat-window');
    const closeBtn = document.getElementById('bloodbot-close-btn');
    const clearBtn = document.getElementById('bloodbot-clear-btn');
    const voiceToggle = document.getElementById('bloodbot-voice-toggle');
    const voiceIcon = document.getElementById('bloodbot-voice-icon');
    const langSelect = document.getElementById('bloodbot-lang-select');
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

    let activeCategory = 'top';

    // Render FAQ Category Tabs Dynamically based on current language
    function renderFaqTabs() {
      if (!tabsContainer) return;
      tabsContainer.innerHTML = Object.keys(FAQ_CATEGORIES).map(key => {
        const cat = FAQ_CATEGORIES[key];
        const label = (typeof cat.label === 'object') ? (cat.label[currentLanguage] || cat.label.en) : cat.label;
        const isActive = key === activeCategory ? 'active' : '';
        return `<button type="button" class="bloodbot-category-tab ${isActive}" data-cat="${key}">${label}</button>`;
      }).join('');
    }

    // Render FAQ Chips for Active Category in current language
    function renderFaqChips(catKey) {
      if (!faqsList) return;
      activeCategory = catKey || activeCategory || 'top';
      const cat = FAQ_CATEGORIES[activeCategory] || FAQ_CATEGORIES.top;
      let chips = [];
      if (cat.chips) {
        if (Array.isArray(cat.chips)) {
          chips = cat.chips;
        } else if (typeof cat.chips === 'object') {
          chips = cat.chips[currentLanguage] || cat.chips.en || [];
        }
      }
      faqsList.innerHTML = chips.map(chip => `
        <button type="button" class="bloodbot-faq-chip" 
          ${chip.query ? `data-query="${escapeHtml(chip.query)}"` : ''} 
          ${chip.tool ? `data-tool="${escapeHtml(chip.tool)}"` : ''} 
          ${chip.href ? `data-href="${escapeHtml(chip.href)}"` : ''}>
          ${chip.label}
        </button>
      `).join('');
    }

    // Initial render
    renderFaqTabs();
    renderFaqChips('top');

    // Handle Tab Selection
    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.bloodbot-category-tab');
      if (!tab) return;
      tabsContainer.querySelectorAll('.bloodbot-category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      renderFaqChips(activeCategory);
      if (window.soundFX) window.soundFX.playRadarPing();
    });

    // Language Switcher Function
    function switchLanguage(newLang, announce = true) {
      if (!LANGUAGES[newLang]) newLang = 'en';
      currentLanguage = newLang;
      if (langSelect && langSelect.value !== newLang) {
        langSelect.value = newLang;
      }

      renderFaqTabs();
      renderFaqChips(activeCategory);

      // Update input placeholder in current language
      if (inputField) {
        const placeholders = {
          en: 'Ask in English, తెలుగు, हिंदी... (e.g., KIMS helpline, ml required)',
          te: 'తెలుగులో అడగండి... (ఉదా: KIMS నంబర్, ఎన్ని ml రక్తం, అర్హత)',
          hi: 'हिंदी में पूछें... (उदा: KIMS हेल्पलाइन, कितने ml खून, पात्रता)',
          ta: 'தமிழில் கேளுங்கள்... (KIMS உதவி எண், இரத்த அளவு)',
          kn: 'ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ... (KIMS ಸಹಾಯವಾಣಿ, ರಕ್ತದ ಪ್ರಮಾಣ)',
          es: 'Pregunta en español... (volumen en ml, hospital KIMS)'
        };
        inputField.placeholder = placeholders[newLang] || placeholders.en;
      }

      // Update active speech recognition language
      if (recognizer) {
        try {
          recognizer.lang = LANGUAGES[currentLanguage]?.code || 'en-US';
        } catch (e) {}
      }

      if (announce) {
        const langAnnouncements = {
          en: 'Switched to English. Ask me about blood donation volume (350ml/450ml), KIMS Hospital (+91 97015 16959), Apollo (+91 87121 27287), or compatibility!',
          te: 'తెలుగు భాష ఎంచుకోబడింది. రక్త పరిమాణం (350ml/450ml), KIMS ఆసుపత్రి (+91 97015 16959), అపోలో (+91 87121 27287), లేదా అర్హత గురించి ఏదైనా అడగండి!',
          hi: 'हिंदी भाषा चुनी गई है। रक्तदान में कितने ml (350ml/450ml), KIMS अस्पताल (+91 97015 16959), अपोलो (+91 87121 27287) या पात्रता के बारे में पूछें!',
          ta: 'தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது. இரத்த தான அளவு (350ml/450ml), KIMS மருத்துவமனை (+91 97015 16959), அப்பல்லோ அல்லது தகுதி பற்றி கேளுங்கள்!',
          kn: 'ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ. ರಕ್ತದ ಪ್ರಮಾಣ (350ml/450ml), KIMS ಆಸ್ಪತ್ರೆ (+91 97015 16959), ಅಪೊಲೊ ಅಥವಾ ಅರ್ಹತೆಯ ಬಗ್ಗೆ ಕೇಳಿ!',
          es: 'Idioma cambiado a español. ¡Pregúntame sobre el volumen de sangre (350ml/450ml), KIMS Hospital (+91 97015 16959), Apollo o compatibilidad!'
        };
        const text = langAnnouncements[newLang] || langAnnouncements.en;
        appendBotResponse({
          badge: LANGUAGES[newLang].flag + ' ' + LANGUAGES[newLang].name,
          title: '🌐 ' + LANGUAGES[newLang].label,
          answer: text,
          actions: [
            { label: '🧮 Calculator', tool: 'volume_calculator' },
            { label: '🩺 Screener', tool: 'eligibility_wizard' }
          ]
        }, isSpeechEnabled);
      }
    }

    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        switchLanguage(e.target.value, true);
      });
    }

    // Proactive Teaser Fact Cycling (every 6 seconds)
    let teaserIdx = 0;
    const rotateTeaser = () => {
      const facts = TEASER_FACTS[currentLanguage] || TEASER_FACTS.en;
      teaserIdx = (teaserIdx + 1) % facts.length;
      if (teaserText) {
        teaserText.style.opacity = '0';
        setTimeout(() => {
          teaserText.textContent = facts[teaserIdx].text;
          teaserText.style.opacity = '1';
        }, 250);
      }
    };
    const teaserInterval = setInterval(rotateTeaser, 6000);

    // Teaser click triggers chat
    teaserBubble.addEventListener('click', (e) => {
      if (e.target === teaserDismiss) return;
      toggleChat(true);
      const facts = TEASER_FACTS[currentLanguage] || TEASER_FACTS.en;
      const fact = facts[teaserIdx] || facts[0];
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

    // Voice Output Toggle in Header
    voiceToggle.addEventListener('click', () => {
      isSpeechEnabled = !isSpeechEnabled;
      voiceIcon.textContent = isSpeechEnabled ? '🔊' : '🔇';
      voiceToggle.style.color = isSpeechEnabled ? 'var(--accent-emerald)' : '';
      voiceToggle.title = isSpeechEnabled ? 'Voice Output: ON (Tap to mute)' : 'Voice Output: OFF (Tap to enable)';
      if (isSpeechEnabled) {
        speakResponse('Voice output activated. BloodBot will read answers aloud.', true);
      } else {
        stopSpeaking();
      }
    });

    // Voice UI Element References
    const listeningOverlay = document.getElementById('bloodbot-listening-overlay');
    const listeningStatus = document.getElementById('bloodbot-listening-status');
    const listeningTranscript = document.getElementById('bloodbot-listening-transcript');
    const listeningCancel = document.getElementById('bloodbot-voice-cancel');
    const listeningSend = document.getElementById('bloodbot-voice-send');
    const speakingStop = document.getElementById('bloodbot-speaking-stop');

    if (speakingStop) {
      speakingStop.addEventListener('click', () => {
        stopSpeaking();
      });
    }

    // 10. Robust Speech-to-Text & Multilingual Voice Command System
    let recognizer = null;
    let isListening = false;
    let capturedTranscript = '';

    const hasSpeechRecognition = typeof window !== 'undefined' && 
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

    function startListening() {
      if (!hasSpeechRecognition) {
        showVoiceUnsupportedCard();
        return;
      }

      if (isListening) {
        stopListening();
        return;
      }

      // Stop any ongoing TTS audio
      stopSpeaking();

      try {
        const SpeechRecClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognizer = new SpeechRecClass();
        recognizer.continuous = false;
        recognizer.interimResults = true;
        recognizer.maxAlternatives = 1;

        // Multilingual: dynamically select the user-chosen or detected language locale!
        recognizer.lang = LANGUAGES[currentLanguage]?.code || 'en-US';

        capturedTranscript = '';
        isListening = true;

        if (micBtn) {
          micBtn.classList.add('listening');
          micBtn.textContent = '⏹️';
          micBtn.title = 'Stop listening';
        }

        if (listeningOverlay) {
          listeningOverlay.style.display = 'block';
        }

        const listeningPrompts = {
          en: { status: 'Listening... Speak your question now', placeholder: 'Listening... Say: "What is KIMS helpline?" or "How much ml to donate?"' },
          te: { status: 'వింటున్నాను... మీ ప్రశ్న చెప్పండి', placeholder: 'వింటున్నాను... చెప్పండి: "KIMS నంబర్ ఎంత?" లేదా "ఎన్ని ml రక్తం కావాలి?"' },
          hi: { status: 'सुन रहा हूँ... अपना सवाल बोलें', placeholder: 'सुन रहा हूँ... बोलिए: "KIMS का नंबर क्या है?" या "कितने ml खून दान करें?"' },
          ta: { status: 'கேட்கிறேன்... உங்கள் கேள்வியைக் கூறுங்கள்', placeholder: 'கேட்கிறேன்... சொல்லுங்கள்: "KIMS உதவி எண்" அல்லது "எத்தனை ml?"' },
          kn: { status: 'ಕೇಳುತ್ತಿದ್ದೇನೆ... ಪ್ರಶ್ನೆ ಕೇಳಿ', placeholder: 'ಕೇಳುತ್ತಿದ್ದೇನೆ... ಹೇಳಿ: "KIMS ಸಹಾಯವಾಣಿ" ಅಥವಾ "ಎಷ್ಟು ml ರಕ್ತದಾನ?"' },
          es: { status: 'Escuchando... Di tu pregunta ahora', placeholder: 'Escuchando... Di: "¿Cuánto volumen de sangre?" o "¿Teléfono de KIMS?"' }
        };

        const p = listeningPrompts[currentLanguage] || listeningPrompts.en;
        if (listeningStatus) {
          listeningStatus.textContent = p.status;
        }
        if (listeningTranscript) {
          listeningTranscript.textContent = p.placeholder;
          listeningTranscript.classList.remove('has-text');
        }

        if (window.soundFX && window.soundFX.playRadarPing) {
          window.soundFX.playRadarPing();
        }

        recognizer.onstart = () => {
          isListening = true;
          if (listeningStatus) {
            listeningStatus.textContent = p.status;
          }
        };

        recognizer.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const part = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += part;
            } else {
              interimTranscript += part;
            }
          }

          const currentWords = (finalTranscript || interimTranscript).trim();
          if (currentWords) {
            capturedTranscript = currentWords;
            if (listeningTranscript) {
              listeningTranscript.textContent = `"${currentWords}"`;
              listeningTranscript.classList.add('has-text');
            }
            if (inputField) {
              inputField.value = currentWords;
            }
          }

          if (finalTranscript.trim()) {
            const confirmedQuery = finalTranscript.trim();
            stopListening();
            handleVoiceCommandOrQuery(confirmedQuery);
          }
        };

        recognizer.onerror = (event) => {
          console.warn('SpeechRecognition error:', event.error);
          stopListening();

          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            showMicPermissionCard();
          } else if (event.error === 'no-speech') {
            showNoSpeechNotification();
          } else if (event.error === 'network') {
            showNetworkVoiceNotification();
          }
        };

        recognizer.onend = () => {
          stopListening();
        };

        recognizer.start();

      } catch (err) {
        console.warn('Error launching speech recognition:', err);
        stopListening();
        if (err.name === 'NotAllowedError') {
          showMicPermissionCard();
        }
      }
    }

    function stopListening() {
      isListening = false;
      if (recognizer) {
        try { recognizer.stop(); } catch (e) {}
        recognizer = null;
      }
      if (micBtn) {
        micBtn.classList.remove('listening');
        micBtn.textContent = '🎤';
        micBtn.title = 'Voice Command (Click to Speak)';
      }
      if (listeningOverlay) {
        listeningOverlay.style.display = 'none';
      }
    }

    // Voice Action Buttons
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (isListening) {
          stopListening();
        } else {
          startListening();
        }
      });
    }

    if (listeningCancel) {
      listeningCancel.addEventListener('click', () => {
        stopListening();
      });
    }

    if (listeningSend) {
      listeningSend.addEventListener('click', () => {
        const text = capturedTranscript || (inputField ? inputField.value.trim() : '');
        stopListening();
        if (text) {
          handleVoiceCommandOrQuery(text);
        }
      });
    }

    function showMicPermissionCard() {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-bot';
      msgDiv.innerHTML = `
        <div class="bloodbot-msg-avatar">🎙️</div>
        <div class="bloodbot-msg-content">
          <div class="bloodbot-msg-badge">Microphone Access Required</div>
          <div class="bloodbot-msg-title">How to Enable Microphone in Browser</div>
          <div class="bloodbot-msg-body">
            To speak directly to BloodBot AI, allow microphone permissions for this site:<br><br>
            1. Look at your browser address bar (top left).<br>
            2. Click the <strong>🔒 Tune / Padlock</strong> icon.<br>
            3. Under Permissions, toggle <strong>Microphone</strong> to <strong>Allow</strong>.<br>
            4. Refresh or click the <strong>Retry Voice</strong> button below.
          </div>
          <div class="bloodbot-action-buttons">
            <button type="button" class="bloodbot-action-btn" id="retry-voice-permission-btn">🎙️ Retry Microphone</button>
            <button type="button" class="bloodbot-action-btn" data-query="How much ml of blood is required on a donation?">🩸 Ask ml required</button>
            <button type="button" class="bloodbot-action-btn" data-query="What is the helpline for KIMS Hospital?">🏥 Ask KIMS Hospital</button>
          </div>
        </div>
      `;
      messagesArea.appendChild(msgDiv);
      scrollToBottom();

      const retryBtn = msgDiv.querySelector('#retry-voice-permission-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => startListening());
      }
    }

    function showNoSpeechNotification() {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-bot';
      msgDiv.innerHTML = `
        <div class="bloodbot-msg-avatar">👂</div>
        <div class="bloodbot-msg-content">
          <div class="bloodbot-msg-badge">Voice Input</div>
          <div class="bloodbot-msg-title">No Voice Detected</div>
          <div class="bloodbot-msg-body">
            I didn't hear your voice. Please check your microphone connection, tap <strong>🎙️ Speak Again</strong>, and speak clearly.
          </div>
          <div class="bloodbot-action-buttons">
            <button type="button" class="bloodbot-action-btn" id="retry-voice-speech-btn">🎙️ Speak Again</button>
            <button type="button" class="bloodbot-action-btn" data-query="How much ml of blood is required on a donation?">🩸 Ask ml required</button>
            <button type="button" class="bloodbot-action-btn" data-query="What is the helpline for KIMS Hospital?">🏥 Ask KIMS Hospital</button>
          </div>
        </div>
      `;
      messagesArea.appendChild(msgDiv);
      scrollToBottom();

      const retryBtn = msgDiv.querySelector('#retry-voice-speech-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => startListening());
      }
    }

    function showNetworkVoiceNotification() {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-bot';
      msgDiv.innerHTML = `
        <div class="bloodbot-msg-avatar">🌐</div>
        <div class="bloodbot-msg-content">
          <div class="bloodbot-msg-badge">Network Notice</div>
          <div class="bloodbot-msg-title">Voice Recognition Service Busy</div>
          <div class="bloodbot-msg-body">
            The browser speech recognition service timed out or had a temporary network connection issue. You can try speaking again or type your question below.
          </div>
          <div class="bloodbot-action-buttons">
            <button type="button" class="bloodbot-action-btn" id="retry-voice-net-btn">🎙️ Try Again</button>
          </div>
        </div>
      `;
      messagesArea.appendChild(msgDiv);
      scrollToBottom();

      const retryBtn = msgDiv.querySelector('#retry-voice-net-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => startListening());
      }
    }

    function showVoiceUnsupportedCard() {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-bot';
      msgDiv.innerHTML = `
        <div class="bloodbot-msg-avatar">ℹ️</div>
        <div class="bloodbot-msg-content">
          <div class="bloodbot-msg-badge">Browser Compatibility</div>
          <div class="bloodbot-msg-title">Speech-to-Text Notice</div>
          <div class="bloodbot-msg-body">
            Voice speech recognition is natively supported in <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, and <strong>Safari</strong>.<br><br>
            You can type your questions in English, తెలుగు, or हिंदी in the box below!
          </div>
        </div>
      `;
      messagesArea.appendChild(msgDiv);
      scrollToBottom();
    }

    // Voice Command Dispatcher & Multilingual Intent Analyzer
    function handleVoiceCommandOrQuery(rawQuery) {
      const query = rawQuery.trim();
      if (!query) return;

      // Auto-detect language of spoken query
      const detectedLang = detectLanguage(query);
      if (detectedLang && detectedLang !== currentLanguage) {
        switchLanguage(detectedLang, false);
      }

      const lower = query.toLowerCase();

      // Intent 1: Volume Calculator
      if (lower.includes('volume') || lower.includes('calculator') || lower.includes('how much ml') || lower.includes('calculate blood') || lower.includes('calculate ml') ||
          lower.includes('ఎంత రక్తం') || lower.includes('ఎన్ని ml') || lower.includes('కాలిక్యులేటర్') || lower.includes('రక్త పరిమాణం') ||
          lower.includes('कितना ml') || lower.includes('कितने ml') || lower.includes('कैलकुलेटर') || lower.includes('रक्त की मात्रा') ||
          lower.includes('cuanto ml') || lower.includes('volumen') || lower.includes('eshtu ml') || lower.includes('ethanai ml')) {
        handleUserQuery(query, true);
        setTimeout(() => executeTool('volume_calculator'), 300);
        return;
      }

      // Intent 2: Eligibility Screener
      if (lower.includes('eligib') || lower.includes('screener') || lower.includes('can i donate') || lower.includes('fit to donate') || lower.includes('am i eligible') ||
          lower.includes('అర్హత') || lower.includes('పాత్') || lower.includes('पात्रता') || lower.includes('योग्यता') ||
          lower.includes('elegib') || lower.includes('requisitos') || lower.includes('தகுதி') || lower.includes('ಅರ್ಹತೆ')) {
        handleUserQuery(query, true);
        setTimeout(() => executeTool('eligibility_wizard'), 300);
        return;
      }

      // Intent 3: Blood Compatibility Matrix
      if (lower.includes('compatib') || lower.includes('matrix') || lower.includes('who can donate') || lower.includes('universal donor') || lower.includes('universal recipient') ||
          lower.includes('అనుకూలత') || lower.includes('సార్వత్రిక') || lower.includes('अनुकूलता') || lower.includes('सर्वदाता') || lower.includes('सर्वग्राही') ||
          lower.includes('compatibilidad') || lower.includes('donante universal') || lower.includes('பொருத்தம்') || lower.includes('ಹೊಂದಾಣಿಕೆ')) {
        handleUserQuery(query, true);
        setTimeout(() => executeTool('compat_matrix:all'), 300);
        return;
      }

      // Intent 4: Hospital Emergency Desks
      if (lower.includes('hospital') || lower.includes('dispatch') || lower.includes('emergency gate') || lower.includes('helpline') ||
          lower.includes('ఆసుపత్రి') || lower.includes('ఆస్పత్రి') || lower.includes('అస్పత్రి') ||
          lower.includes('अस्पताल') || lower.includes('மருத்துவமனை') || lower.includes('ಆಸ್ಪತ್ರೆ') || lower.includes('hospitales')) {
        handleUserQuery(query, true);
        setTimeout(() => executeTool('hospital_dispatch'), 300);
        return;
      }

      // Intent 5: Direct KIMS Hospital Inquiry
      if (lower.includes('kims') || lower.includes('కిమ్స్') || lower.includes('किम्स') || lower.includes('கிம்ஸ்') || lower.includes('ಕಿಮ್ಸ್')) {
        const kimsQueries = {
          en: 'What is the contact number and helpline for KIMS Hospital Begumpet?',
          te: 'KIMS హాస్పిటల్ బేగంపేట హెల్ప్‌లైన్ నంబర్ ఎంత?',
          hi: 'KIMS अस्पताल सिकंदराबाद का हेल्पलाइन नंबर क्या है?',
          ta: 'KIMS மருத்துவமனை உதவி எண் என்ன?',
          kn: 'KIMS ಆಸ್ಪತ್ರೆ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಎಷ್ಟು?',
          es: '¿Cuál es el número de teléfono del Hospital KIMS?'
        };
        handleUserQuery(kimsQueries[currentLanguage] || kimsQueries.en, true);
        return;
      }

      // Intent 6: Direct Apollo Hospital Inquiry
      if (lower.includes('apollo') || lower.includes('అపోలో') || lower.includes('अपोलो') || lower.includes('அப்பல்லோ') || lower.includes('ಅಪೊಲೊ')) {
        const apolloQueries = {
          en: 'What is the emergency helpline and gate for Apollo Hospital Jubilee Hills?',
          te: 'అపోలో హాస్పిటల్ జూబ్లీహిల్స్ ఎమర్జెన్సీ నంబర్ మరియు గేట్ ఏది?',
          hi: 'अपोलो अस्पताल जुबली हिल्स का आपातकालीन नंबर और गेट कौन सा है?',
          ta: 'அப்பல்லோ மருத்துவமனை உதவி எண் என்ன?',
          kn: 'ಅಪೊಲೊ ಆಸ್ಪತ್ರೆ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಎಷ್ಟು?',
          es: '¿Cuál es la línea de emergencia de Apollo Hospital?'
        };
        handleUserQuery(apolloQueries[currentLanguage] || apolloQueries.en, true);
        return;
      }

      // Intent 7: Stop Audio / Mute Command
      if (lower.includes('stop speaking') || lower.includes('mute') || lower.includes('stop audio') || lower.includes('stop talking') || lower.includes('be quiet') || lower.includes('shut up') ||
          lower.includes('ఆపు') || lower.includes('మాట్లాడకు') || lower.includes('రోకో') || lower.includes('बंद करो') || lower.includes('शांत') || lower.includes('parar') || lower.includes('silencio')) {
        stopSpeaking();
        appendBotResponse({
          title: '🔇 Voice Audio Stopped',
          badge: 'Voice Command',
          answer: 'Speech narration has been muted. Voice read-aloud is paused.',
          actions: [
            { label: '🔊 Unmute Voice', query: 'Unmute voice' }
          ]
        }, false);
        return;
      }

      // Intent 8: Clear Chat
      if (lower.includes('clear') && (lower.includes('chat') || lower.includes('screen') || lower.includes('conversation') || lower.includes('reset'))) {
        messagesArea.innerHTML = `
          <div class="bloodbot-msg bloodbot-msg-bot">
            <div class="bloodbot-msg-avatar">🤖</div>
            <div class="bloodbot-msg-content">
              <div class="bloodbot-msg-badge">Chat Reset via Voice</div>
              <div class="bloodbot-msg-body">
                Conversation cleared. How can I assist you with blood donation, ml required, or hospital information today?
              </div>
            </div>
          </div>
        `;
        speakResponse('Chat reset. How can I assist you today?', true);
        return;
      }

      // Standard query asked via voice -> automatic spoken narration!
      handleUserQuery(query, true);
    }

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

    function handleUserQuery(userText, isVoiceTrigger = false) {
      // Auto-detect language of prompt
      const detected = detectLanguage(userText);
      if (detected && detected !== currentLanguage) {
        switchLanguage(detected, false);
      }

      appendUserMessage(userText, isVoiceTrigger);
      if (window.soundFX) window.soundFX.playSuccessChime();
      const typingId = appendTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator(typingId);
        const match = BloodBotBrain.matchQuery(userText, currentLanguage);
        appendBotResponse(match, isVoiceTrigger);
      }, 400);
    }

    function appendUserMessage(text, isVoice = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'bloodbot-msg bloodbot-msg-user';
      msgDiv.innerHTML = `
        <div class="bloodbot-msg-content">
          ${isVoice ? '<div class="bloodbot-msg-badge" style="background:rgba(255,255,255,0.2);color:#fff;border-color:rgba(255,255,255,0.3);margin-bottom:3px;">🎙️ Voice Query</div>' : ''}
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

    function appendBotResponse(data, isVoiceTrigger = false) {
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

      // Read aloud if general voice output is enabled OR if query was initiated by voice command!
      if (isSpeechEnabled || isVoiceTrigger) {
        speakResponse(data.title + '. ' + data.answer, true, currentLanguage);
      }
    }

    function scrollToBottom() {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    window.startBloodBotVoice = () => {
      toggleChat(true);
      setTimeout(() => startListening(), 250);
    };

    window.stopBloodBotVoice = () => {
      stopListening();
    };

    window.stopBloodBotSpeech = () => {
      stopSpeaking();
    };

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
