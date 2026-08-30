/**
 * BloodConnect 3D - Interactive 3D WebGL Graphics Engine
 * Powered by Three.js (r128).
 * Provides:
 * 1. Hero 3D Pulsating Heart & Blood Cell Stream
 * 2. 3D Holographic Proximity Distance Radar
 * 3. 3D Bio-Fitness Body Scanner Hologram
 * 4. 3D Metallic Gold Reward Token
 */

class BloodConnect3D {
  /**
   * Hero Section: 3D Pulsating Heart & Flowing Erythrocyte Cells
   */
  static initHeroScene(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff4d6d, 2.2);
    dirLight.position.set(8, 12, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 25);
    pointLight.position.set(-6, -4, 6);
    scene.add(pointLight);

    const heartLight = new THREE.PointLight(0xff0044, 4, 15);
    heartLight.position.set(0, 0, 2);
    scene.add(heartLight);

    // Group for all elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Procedural 3D Heart Geometry
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.3, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const extrudeSettings = {
      depth: 0.8,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 4,
      bevelSize: 0.3,
      bevelThickness: 0.3
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    // Heart Material with glossy red organic look
    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      emissive: 0x59031a,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.15,
      ior: 1.4
    });

    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.rotation.z = Math.PI; // Correct orientation
    heartMesh.scale.set(2.2, 2.2, 2.2);
    mainGroup.add(heartMesh);

    // Glowing Hologram Torus Ring around Heart
    const ringGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ringMesh2.material.color.setHex(0xff007f);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.y = Math.PI / 4;
    mainGroup.add(ringMesh2);

    // 2. Erythrocyte (Red Blood Cells) Stream
    // A biconcave disc can be approximated by a flattened torus or squashed sphere
    const rbcGeo = new THREE.TorusGeometry(0.35, 0.18, 16, 32);
    const rbcMat = new THREE.MeshStandardMaterial({
      color: 0xcc0033,
      roughness: 0.3,
      metalness: 0.2,
      bumpScale: 0.05
    });

    const cellCount = 35;
    const cells = [];
    for (let i = 0; i < cellCount; i++) {
      const cell = new THREE.Mesh(rbcGeo, rbcMat.clone());
      const angle = (i / cellCount) * Math.PI * 2;
      const radius = 4.2 + Math.sin(i * 3) * 1.2;
      cell.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        Math.sin(angle) * (radius * 0.7) + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 5
      );
      cell.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = 0.5 + Math.random() * 0.6;
      cell.scale.set(scale, scale, scale * 0.6); // squashed disc
      cell.userData = {
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        basePos: cell.position.clone()
      };
      mainGroup.add(cell);
      cells.push(cell);
    }

    // 3. Glowing Plasma Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      // Color variation between blood crimson and life cyan
      if (Math.random() > 0.4) {
        particleColors[i * 3] = 1.0;     // R
        particleColors[i * 3 + 1] = 0.15; // G
        particleColors[i * 3 + 2] = 0.3;  // B
      } else {
        particleColors[i * 3] = 0.2;     // R
        particleColors[i * 3 + 1] = 0.7;  // G
        particleColors[i * 3 + 2] = 1.0;  // B
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotY = x * 0.4;
      targetRotX = -y * 0.3;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Pulse state
    let heartbeatSpeed = 1.0;
    let pulseTime = 0;

    // Animation Loop
    let animationId;
    const animate = (time) => {
      animationId = requestAnimationFrame(animate);
      pulseTime += 0.04 * heartbeatSpeed;

      // Heartbeat pulse math (lub-dub rhythm)
      const beatCycle = pulseTime % (Math.PI * 2);
      let beatScale = 1.0;
      if (beatCycle < 0.4) {
        beatScale = 1.0 + Math.sin(beatCycle / 0.4 * Math.PI) * 0.18;
      } else if (beatCycle > 0.6 && beatCycle < 1.0) {
        beatScale = 1.0 + Math.sin((beatCycle - 0.6) / 0.4 * Math.PI) * 0.11;
      }

      heartMesh.scale.set(2.2 * beatScale, 2.2 * beatScale, 2.2 * beatScale);

      // Rings rotation
      ringMesh1.rotation.z += 0.008;
      ringMesh2.rotation.z -= 0.006;
      ringMesh2.rotation.y += 0.004;

      // Animate blood cells
      cells.forEach((cell, idx) => {
        cell.rotation.x += cell.userData.rotSpeedX;
        cell.rotation.y += cell.userData.rotSpeedY;
        const offset = Math.sin(pulseTime + idx) * 0.4;
        cell.position.y = cell.userData.basePos.y + offset;
        cell.position.x = cell.userData.basePos.x + Math.cos(pulseTime * 0.5 + idx) * 0.3;
      });

      // Animate particles
      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;

      // Smooth mouse follow
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return {
      triggerEmergencyPulse: () => {
        heartbeatSpeed = 2.4;
        heartMat.emissive.setHex(0xff0033);
        heartLight.intensity = 8;
        setTimeout(() => {
          heartbeatSpeed = 1.0;
          heartMat.emissive.setHex(0x59031a);
          heartLight.intensity = 4;
        }, 4000);
      },
      destroy: () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  /**
   * 3D Proximity Distance Radar Visualization
   */
  static initRadar3DScene(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 22, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dir.position.set(10, 20, 10);
    scene.add(dir);

    // Root Group
    const radarGroup = new THREE.Group();
    scene.add(radarGroup);

    // 1. Radar Circular Floor Grid
    const gridHelper = new THREE.GridHelper(30, 20, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.1;
    radarGroup.add(gridHelper);

    // 2. Concentric Distance Rings (1km, 5km, 10km, 25km, 50km equivalent)
    const ringRadii = [3, 6, 9, 12, 15];
    const ringColors = [0x06b6d4, 0x0ea5e9, 0x3b82f6, 0x6366f1, 0x8b5cf6];

    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.05, r + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[idx] || 0x06b6d4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      radarGroup.add(ringMesh);
    });

    // 3. Sweeping Radar Beam
    const sweepGeo = new THREE.CircleGeometry(15, 64, 0, Math.PI / 3);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    });
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    sweepMesh.rotation.x = Math.PI / 2;
    radarGroup.add(sweepMesh);

    // 4. Center Hospital Beacon Marker
    const hospGeo = new THREE.CylinderGeometry(0.5, 0.7, 1.2, 8);
    const hospMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2
    });
    const hospitalMesh = new THREE.Mesh(hospGeo, hospMat);
    hospitalMesh.position.set(0, 0.6, 0);
    radarGroup.add(hospitalMesh);

    // Hospital Glowing Cross
    const crossHGeo = new THREE.BoxGeometry(0.6, 0.18, 0.18);
    const crossVGeo = new THREE.BoxGeometry(0.18, 0.6, 0.18);
    const crossMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const crossH = new THREE.Mesh(crossHGeo, crossMat);
    const crossV = new THREE.Mesh(crossVGeo, crossMat);
    crossH.position.set(0, 1.4, 0);
    crossV.position.set(0, 1.4, 0);
    radarGroup.add(crossH);
    radarGroup.add(crossV);

    // Dynamic Elements Group (Donors and Laser Arcs)
    const dynamicGroup = new THREE.Group();
    radarGroup.add(dynamicGroup);

    // Raycasting for Donor Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let clickableDonorMeshes = [];

    // Camera Drag & Rotation
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;

    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        radarGroup.rotation.y += deltaX * 0.008;
        radarGroup.rotation.x = Math.max(-0.2, Math.min(1.0, radarGroup.rotation.x + deltaY * 0.008));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    // Donor Click Event Listener
    renderer.domElement.addEventListener('click', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableDonorMeshes);

      if (intersects.length > 0) {
        const selectedDonor = intersects[0].object.userData.donor;
        if (options.onDonorSelect) {
          options.onDonorSelect(selectedDonor);
        }
      }
    });

    // Update Function for rendering donors
    const updateRadarData = (hospital, matchedDonors = [], radiusKm = 25) => {
      // Clear previous dynamic elements
      while (dynamicGroup.children.length > 0) {
        const obj = dynamicGroup.children[0];
        dynamicGroup.remove(obj);
      }
      clickableDonorMeshes = [];

      const hospLat = hospital ? hospital.lat : 19.0596;
      const hospLon = hospital ? hospital.lon : 72.8295;

      // Scale factor: max radius maps to radar radius 15
      const scaleToRadar = 15 / (radiusKm || 25);

      matchedDonors.forEach((item, idx) => {
        const donor = item.donor || item;
        const distKm = item.distanceKm !== undefined ? item.distanceKm : 5;

        // Calculate angular position based on lat/lon relative to hospital
        const dLat = (donor.lat - hospLat) * 111; // ~km per degree
        const dLon = (donor.lon - hospLon) * 111 * Math.cos(hospLat * Math.PI / 180);

        const radarX = dLon * scaleToRadar;
        const radarZ = -dLat * scaleToRadar;

        // Color coding:
        // Green = Fit & Compatible
        // Crimson = Critical Target Match
        // Amber = In Cooldown / Temporarily Ineligible
        let markerColor = 0x10b981; // Emerald
        if (item.isExactMatch && donor.isMedicallyFit) {
          markerColor = 0xe11d48; // Crimson exact
        } else if (!donor.isMedicallyFit || donor.cooldownDaysRemaining > 0) {
          markerColor = 0xf59e0b; // Amber cooldown
        }

        // 3D Sphere Marker
        const sphereGeo = new THREE.SphereGeometry(0.45, 16, 16);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: markerColor,
          emissive: markerColor,
          emissiveIntensity: 0.4,
          roughness: 0.3
        });
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        sphereMesh.position.set(radarX, 0.6, radarZ);
        sphereMesh.userData = { donor, matchInfo: item };
        dynamicGroup.add(sphereMesh);
        clickableDonorMeshes.push(sphereMesh);

        // Pulsing radar blip ring below donor
        const blipGeo = new THREE.RingGeometry(0.4, 0.7, 24);
        const blipMat = new THREE.MeshBasicMaterial({
          color: markerColor,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        });
        const blipMesh = new THREE.Mesh(blipGeo, blipMat);
        blipMesh.rotation.x = Math.PI / 2;
        blipMesh.position.set(radarX, 0.05, radarZ);
        dynamicGroup.add(blipMesh);

        // 3D Connecting Laser Arc to Hospital if within radius and fit
        if (donor.isMedicallyFit && distKm <= radiusKm) {
          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0.8, 0),
            new THREE.Vector3(radarX * 0.5, 3.5, radarZ * 0.5),
            new THREE.Vector3(radarX, 0.6, radarZ)
          );
          const points = curve.getPoints(30);
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const lineMat = new THREE.LineBasicMaterial({
            color: markerColor,
            transparent: true,
            opacity: 0.75,
            linewidth: 2
          });
          const line = new THREE.Line(lineGeo, lineMat);
          dynamicGroup.add(line);
        }
      });
    };

    // Animation Loop
    let animId;
    let radarTime = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      radarTime += 0.02;

      // Rotate sweep beam
      sweepMesh.rotation.z -= 0.025;

      // Pulse beacon
      const pulse = 1.0 + Math.sin(radarTime * 4) * 0.15;
      hospitalMesh.scale.set(pulse, 1.0, pulse);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return {
      updateRadarData,
      setTopDownView: () => {
        camera.position.set(0, 32, 0.01);
        camera.lookAt(0, 0, 0);
        radarGroup.rotation.set(0, 0, 0);
      },
      setIsometricView: () => {
        camera.position.set(0, 22, 28);
        camera.lookAt(0, 0, 0);
      },
      destroy: () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  /**
   * 3D Bio-Fitness Body Scanner Hologram for Donor Profile
   */
  static initBioFitnessScanner(containerId, donor) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0x38bdf8, 2);
    light.position.set(5, 10, 7);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const scanGroup = new THREE.Group();
    scene.add(scanGroup);

    // Anatomical Stylized Wireframe Torso / Human Silhouette
    const torsoGeo = new THREE.CylinderGeometry(0.9, 0.7, 2.8, 16, 12, true);
    const torsoMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.y = -0.2;
    scanGroup.add(torsoMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, torsoMat);
    headMesh.position.y = 1.8;
    scanGroup.add(headMesh);

    // Glowing Heart Core
    const heartCoreGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const heartCoreMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xff0044,
      emissiveIntensity: 0.8
    });
    const heartCore = new THREE.Mesh(heartCoreGeo, heartCoreMat);
    heartCore.position.set(0.18, 0.5, 0.2);
    scanGroup.add(heartCore);

    // Vital Rings around body
    const ringGeo = new THREE.TorusGeometry(1.4, 0.03, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scanGroup.add(ring);

    // Horizontal Scanning Laser Plane
    const laserGeo = new THREE.RingGeometry(0, 1.5, 32);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const laserPlane = new THREE.Mesh(laserGeo, laserMat);
    laserPlane.rotation.x = Math.PI / 2;
    scanGroup.add(laserPlane);

    let animId;
    let scanTime = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      scanTime += 0.03;

      // Rotate silhouette
      scanGroup.rotation.y += 0.01;

      // Laser scanning up and down
      laserPlane.position.y = Math.sin(scanTime * 2) * 1.8;

      // Heart pulse
      const beat = 1.0 + Math.sin(scanTime * 5) * 0.15;
      heartCore.scale.set(beat, beat, beat);

      renderer.render(scene, camera);
    };
    animate();

    return {
      destroy: () => {
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  /**
   * 3D Gold Reward Token Visualizer for Medical Benefits Store
   */
  static initRewardToken3D(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);
    const goldLight1 = new THREE.DirectionalLight(0xffd700, 2.5);
    goldLight1.position.set(5, 5, 6);
    scene.add(goldLight1);
    const goldLight2 = new THREE.DirectionalLight(0xff8c00, 1.5);
    goldLight2.position.set(-5, -5, 4);
    scene.add(goldLight2);

    // 3D Coin Cylinder
    const coinGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.25, 64);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber Gold
      metalness: 0.9,
      roughness: 0.15
    });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.rotation.x = Math.PI / 2;
    scene.add(coin);

    // Outer Bevel Ring
    const coinRingGeo = new THREE.TorusGeometry(1.95, 0.08, 16, 64);
    const coinRingMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.1 });
    const ringMesh = new THREE.Mesh(coinRingGeo, coinRingMat);
    scene.add(ringMesh);

    // Center Emblem (Stylized Blood Drop + Plus)
    const dropGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const dropMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0x990022,
      metalness: 0.4,
      roughness: 0.2
    });
    const drop = new THREE.Mesh(dropGeo, dropMat);
    drop.scale.set(0.9, 1.3, 0.6);
    drop.position.set(0, 0.1, 0.15);
    scene.add(drop);

    // Mouse drag rotation
    let isDragging = false;
    let prevX = 0, prevY = 0;
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        coin.rotation.y += deltaX * 0.015;
        ringMesh.rotation.y += deltaX * 0.015;
        drop.rotation.y += deltaX * 0.015;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    });

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        coin.rotation.y += 0.015;
        ringMesh.rotation.y += 0.015;
        drop.rotation.y += 0.015;
      }
      renderer.render(scene, camera);
    };
    animate();

    return {
      destroy: () => {
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }
}

window.BloodConnect3D = BloodConnect3D;
