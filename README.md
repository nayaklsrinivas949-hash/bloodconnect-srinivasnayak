# BloodConnect 3D 🩸

A next-generation **3D Graphic Design Web Platform** connecting hospital emergency blood requests with nearby compatible donors in real-time within a configurable distance radius. Powered by **Three.js WebGL**, **Haversine Proximity Geosearch**, **Day-to-Day Donor Medical Fitness Tracking**, and a **Medical Benefits Points Redemption System**.

---

## 🌟 Key Features

- **🎮 Immersive 3D WebGL Graphics**:
  - **3D Hero Pulsating Heart & Blood Stream**: Interactive organic 3D heart with biological heartbeat rhythm, floating erythrocytes (red blood cells), platelets, and glowing plasma particles.
  - **3D Geo-Proximity Match Radar**: Holographic 3D city grid with concentric distance rings (1km, 5km, 10km, 25km, 50km), rotating sweep beam, and glowing laser arcs connecting requests to matching donors.
  - **3D Bio-Fitness Hologram**: Anatomical vitals scanner tracking donor readiness score and cooldown gauge.
  - **3D Metallic Gold Reward Token**: Interactive 3D medallion for the points redemption vault.
- **📍 Smart Distance & Proximity Range Finder**:
  - Configurable distance radius slider (1 km to 100 km).
  - Exact Haversine spherical distance calculation.
- **🧬 Smart Blood Group Compatibility Engine**:
  - Full ABO and Rh compatibility matrix ($O^-, O^+, A^-, A^+, B^-, B^+, AB^-, AB^+$).
  - Highlighting universal donors ($O^-$) and universal recipients ($AB^+$).
- **🏥 Hospital Admin Command Center (`admin.html`)**:
  - Emergency patient blood request dispatcher with urgency tiers (Critical, High, Standard).
  - Live 3D match radar with one-click SOS broadcasting.
  - **Hospital Visit Verification Terminal**: Verifies arriving donors, records hemoglobin & BP vitals, sets 56-day cooldown, and automatically awards **500 Redeem Points**.
- **📋 Donor Hub & Day-to-Day Medical Fitness Center (`donor.html`)**:
  - Daily health check-in form (sleep, hydration, vitals, medications) to evaluate real-time Medical Readiness Score.
  - 56-day donation cooldown timer and digital hospital check-in pass.
  - Nearby emergency blood requests matching donor blood group.
- **🪙 Medical Benefits & Points Redemption Store (`rewards.html`)**:
  - Earn points from blood donations (+500 pts) and daily health check-in streaks (+25 pts).
  - Redeem points for medical vouchers:
    1. *Comprehensive Lab & Blood Profile Test* (300 pts)
    2. *25% Pharmacy & Medicine Discount Pass* (400 pts)
    3. *Emergency Blood Reserve Token for Family* (600 pts)
    4. *Full Dental & Vision Diagnostic Checkup* (350 pts)
    5. *Annual Full Body Health & ECG Scan Coupon* (800 pts)
    6. *1-Year Emergency Ambulance Assistance Cover* (500 pts)

---

## 📁 Project Structure

```
bloodconnect/
├── index.html            # 3D Landing Page with Hero Heart & Compatibility Matrix
├── admin.html            # Hospital Admin Command Center & Verification Terminal
├── donor.html            # Donor Hub, 3D Bio-Scanner & Daily Fitness Tracker
├── radar.html            # Dedicated 3D Holographic Proximity Match Radar
├── rewards.html          # 3D Medical Benefits & Points Redemption Vault
├── receiver.html         # Patient / Emergency Blood Request Form
├── styles/
│   └── styles.css        # Cyber-medical glassmorphism design system & neon lighting
├── scripts/
│   ├── blood-data.js     # Unified state management & LocalStorage persistence
│   ├── matching-engine.js# Haversine distance & ABO/Rh compatibility algorithms
│   ├── three-scene.js    # Three.js WebGL engine for 3D Heart, Radar, Bio-Avatar & Coin
│   └── main.js           # UI helpers, navigation & emergency ticker
└── README.md             # Project documentation
```

---

## 🚀 How to Run

1. Clone or open the project directory:
   ```bash
   cd bloodconnect
   ```
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
3. No build tools or Node.js required! All 3D WebGL rendering runs natively via standard Three.js.

---

## 👨‍💻 Developer

- **Developer**: Srinivas Nayak
- **Email**: nayaklsrinivas949@gmail.com
- **GitHub**: [@nayaklsrinivas949-hash](https://github.com/nayaklsrinivas949-hash)
