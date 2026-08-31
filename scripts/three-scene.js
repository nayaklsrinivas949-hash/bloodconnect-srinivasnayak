/**
 * BloodConnect 3D - Three.js WebGL Interactive Scenes
 * 1. Hero 3D Pulsating Heart & Erythrocyte Stream
 * 2. 3D Geo-Proximity Match Radar
 * 3. 3D Anatomical Human Bio-Fitness Scanner & Hologram
 * 4. 3D Gold Medical Reward Token
 */

class BloodConnect3D {
  /**
   * Hero Scene on Landing Page: Realistic organic heart with biconcave red blood cells
   */
  static initHeroScene(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 500) || 500;
    const height = container.clientHeight || (container.parentElement ? container.parentElement.clientHeight : 460) || 460;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    let renderer;
    if (container.tagName === 'CANVAS') {
      renderer = new THREE.WebGLRenderer({
        canvas: container,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } else {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const heartLight = new THREE.PointLight(0xff0044, 4, 30);
    heartLight.position.set(0, 0, 5);
    scene.add(heartLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2);
    rimLight.position.set(5, 5, -2);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0x0284c7, 2, 20);
    bottomGlow.position.set(0, -4, 2);
    scene.add(bottomGlow);

    // Root 3D Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Organic Parametric 3D Heart Geometry
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 3,
      bevelSize: 0.25,
      bevelThickness: 0.35
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    const heartMat = new THREE.MeshStandardMaterial({
      color: 0x9f1239,
      emissive: 0x59031a,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1
    });

    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.scale.set(2.8, -2.8, 2.8);
    rootGroup.add(heartMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff0044,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Realistic Biconcave Erythrocytes (Red Blood Cells)
    const createRBCGeometry = () => {
      const rbcGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 16);
      return rbcGeo;
    };

    const rbcMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.8
    });

    const cellCount = 38;
    const cells = [];

    for (let i = 0; i < cellCount; i++) {
      const cell = new THREE.Mesh(createRBCGeometry(), rbcMat);
      const angle = (i / cellCount) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 2.2;
      const yOffset = (Math.random() - 0.5) * 3.5;

      cell.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );

      cell.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const speed = 0.008 + Math.random() * 0.012;
      const rotSpeed = 0.02 + Math.random() * 0.03;

      cells.push({ mesh: cell, angle, radius, yOffset, speed, rotSpeed });
      rootGroup.add(cell);
    }

    // 3. Ambient Plasma Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      // Cyan to Crimson particles
      if (Math.random() > 0.5) {
        colors[i] = 0.88; colors[i + 1] = 0.11; colors[i + 2] = 0.28;
      } else {
        colors[i] = 0.02; colors[i + 1] = 0.71; colors[i + 2] = 0.83;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction Parallax
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = mouseX * 0.5;
      targetRotX = mouseY * 0.4;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let time = 0;
    let heartbeatSpeed = 1.0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.02 * heartbeatSpeed;

      // Dual-phase Biological Heartbeat Rhythm (Lub-Dub)
      const beat1 = Math.pow(Math.sin(time * 3), 63);
      const beat2 = Math.pow(Math.sin(time * 3 + 0.4), 63) * 0.5;
      const beatScale = 1.0 + (beat1 + beat2) * 0.18;

      heartMesh.scale.set(2.8 * beatScale, -2.8 * beatScale, 2.8 * beatScale);
      coreMesh.scale.set(beatScale * 1.1, beatScale * 1.1, beatScale * 1.1);

      // Smooth Parallax Rotation
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;
      rootGroup.rotation.z = Math.sin(time * 0.5) * 0.04;

      // Rotate Red Blood Cells in Toroidal Stream
      cells.forEach(c => {
        c.angle += c.speed;
        c.mesh.position.x = Math.cos(c.angle) * c.radius;
        c.mesh.position.z = Math.sin(c.angle) * c.radius;
        c.mesh.position.y = c.yOffset + Math.sin(time + c.angle) * 0.3;

        c.mesh.rotation.x += c.rotSpeed;
        c.mesh.rotation.y += c.rotSpeed * 0.7;
      });

      // Float Particles
      particleSystem.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };
    animate();

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

    const donorNodes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateRadarData = (hospital, matchedDonors, maxRadiusKm = 30) => {
      // Clear previous nodes
      while (dynamicGroup.children.length > 0) {
        const obj = dynamicGroup.children[0];
        dynamicGroup.remove(obj);
      }
      donorNodes.length = 0;

      matchedDonors.forEach((m, idx) => {
        const d = m.donor;
        // Scale distance to radar radius (0 to 14 units max)
        const scaleFactor = 14 / maxRadiusKm;
        const distUnits = Math.min(14.5, m.distanceKm * scaleFactor);

        // Compute angle based on GPS delta
        const dLat = (d.lat - hospital.lat) * 111;
        const dLon = (d.lon - hospital.lon) * 111;
        const angle = Math.atan2(dLon, dLat);

        const xPos = Math.sin(angle) * distUnits;
        const zPos = Math.cos(angle) * distUnits;

        // Node Color based on medical fitness and exact blood match
        let nodeColor = 0x10b981; // Green = Fit & Ready
        if (m.isExactMatch) nodeColor = 0xe11d48; // Red = Exact Match
        if (!d.isMedicallyFit || d.cooldownDaysRemaining > 0) nodeColor = 0xf59e0b; // Amber = Cooldown

        const donorNodeGeo = new THREE.SphereGeometry(0.38, 16, 16);
        const donorNodeMat = new THREE.MeshStandardMaterial({
          color: nodeColor,
          emissive: nodeColor,
          emissiveIntensity: 0.6,
          roughness: 0.3
        });

        const donorMesh = new THREE.Mesh(donorNodeGeo, donorNodeMat);
        donorMesh.position.set(xPos, 0.4, zPos);
        donorMesh.userData = { donor: d, match: m };
        dynamicGroup.add(donorMesh);
        donorNodes.push(donorMesh);

        // Ground target ring
        const nodeRingGeo = new THREE.RingGeometry(0.45, 0.55, 16);
        const nodeRingMat = new THREE.MeshBasicMaterial({
          color: nodeColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const nodeRing = new THREE.Mesh(nodeRingGeo, nodeRingMat);
        nodeRing.rotation.x = Math.PI / 2;
        nodeRing.position.set(xPos, 0.05, zPos);
        dynamicGroup.add(nodeRing);

        // Glowing 3D Laser Arc connecting matching donor to hospital
        if (m.isCompatible && (d.isMedicallyFit && (d.cooldownDaysRemaining || 0) === 0)) {
          const midX = xPos * 0.5;
          const midZ = zPos * 0.5;
          const midY = 1.5 + (distUnits * 0.15); // Curved parabolic elevation

          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 1.2, 0),
            new THREE.Vector3(midX, midY, midZ),
            new THREE.Vector3(xPos, 0.4, zPos)
          );

          const points = curve.getPoints(24);
          const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
          const arcMat = new THREE.LineBasicMaterial({
            color: nodeColor,
            transparent: true,
            opacity: 0.7,
            linewidth: 2
          });
          const arcLine = new THREE.Line(arcGeo, arcMat);
          dynamicGroup.add(arcLine);
        }
      });
    };

    // Node Interaction on Hover / Click
    const onPointerDown = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(donorNodes);

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object;
        if (options.onDonorSelect && clickedNode.userData.donor) {
          options.onDonorSelect(clickedNode.userData.donor, clickedNode.userData.match);
        }
      }
    };
    container.addEventListener('pointerdown', onPointerDown);

    // Orbit Drag Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      radarGroup.rotation.y += deltaX * 0.008;
      radarGroup.rotation.x = Math.max(-0.2, Math.min(1.0, radarGroup.rotation.x + deltaY * 0.006));

      prevMousePos = { x: e.clientX, y: e.clientY };
    });

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
   * Advanced 3D Anatomical Human Bio-Vitals Scanner & Holographic Medical Matrix
   * Features:
   * - Articulated anatomical human mannequin with dual-layer cyber hologram shader
   * - Dynamic arterial blood tree with glowing erythrocyte nanoparticles flowing in real-time
   * - Dual-phase pulsating biological heart core with crimson point lighting
   * - Sweeping cyber-laser scanner plane with organ-triggered bio-pings
   * - Concentric orbital vitals gauges, compass base pedestal, and interactive mouse/touch controls
   */
  static initBioFitnessScanner(containerId, donor) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const width = Math.max(300, container.clientWidth || 380);
    const height = Math.max(320, container.clientHeight || 360);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Multi-Directional Cyber Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(amb);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    cyanLight.position.set(5, 6, 6);
    scene.add(cyanLight);

    const emeraldLight = new THREE.DirectionalLight(0x10b981, 2.0);
    emeraldLight.position.set(-5, -4, 4);
    scene.add(emeraldLight);

    const bottomGlow = new THREE.PointLight(0x0284c7, 3, 12);
    bottomGlow.position.set(0, -3.2, 2);
    scene.add(bottomGlow);

    const scanGroup = new THREE.Group();
    scanGroup.position.y = -0.25;
    scene.add(scanGroup);

    // Cyber Hologram Materials
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.85
    });

    const innerSolidMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x082f49,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.3,
      roughness: 0.25,
      metalness: 0.7
    });

    const addBodyPart = (geo, x, y, z, rotX = 0, rotY = 0, rotZ = 0) => {
      const wire = new THREE.Mesh(geo, wireMat);
      wire.position.set(x, y, z);
      wire.rotation.set(rotX, rotY, rotZ);
      scanGroup.add(wire);

      const solid = new THREE.Mesh(geo, innerSolidMat);
      solid.position.set(x, y, z);
      solid.rotation.set(rotX, rotY, rotZ);
      solid.scale.set(0.95, 0.95, 0.95);
      scanGroup.add(solid);

      return wire;
    };

    // 1. Head (Sculpted Cranium + Jawline)
    const headGeo = new THREE.SphereGeometry(0.42, 20, 20);
    headGeo.scale(0.85, 1.18, 0.95);
    addBodyPart(headGeo, 0, 2.2, 0);

    // Brain Hologram Matrix
    const brainGeo = new THREE.SphereGeometry(0.24, 14, 14);
    const brainMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.8 });
    const brainMesh = new THREE.Mesh(brainGeo, brainMat);
    brainMesh.position.set(0, 2.25, 0.05);
    scanGroup.add(brainMesh);

    // 2. Neck
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.4, 16);
    addBodyPart(neckGeo, 0, 1.65, 0);

    // 3. Thoracic Chest (Broad Pectoral Torso)
    const chestGeo = new THREE.CylinderGeometry(0.86, 0.66, 0.95, 18);
    chestGeo.scale(1.25, 1.0, 0.72);
    addBodyPart(chestGeo, 0, 1.05, 0);

    // 4. Waist & Abdomen
    const abdomenGeo = new THREE.CylinderGeometry(0.64, 0.68, 0.75, 18);
    abdomenGeo.scale(1.1, 1.0, 0.7);
    addBodyPart(abdomenGeo, 0, 0.35, 0);

    // 5. Pelvis
    const pelvisGeo = new THREE.CylinderGeometry(0.68, 0.58, 0.5, 18);
    pelvisGeo.scale(1.15, 1.0, 0.75);
    addBodyPart(pelvisGeo, 0, -0.15, 0);

    // 6. Shoulders (Deltoids)
    const shoulderGeo = new THREE.SphereGeometry(0.24, 14, 14);
    addBodyPart(shoulderGeo, -1.05, 1.35, 0);
    addBodyPart(shoulderGeo, 1.05, 1.35, 0);

    // 7. Arms (Upper Arms, Forearms, Hands)
    const upperArmGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.8, 14);
    addBodyPart(upperArmGeo, -1.15, 0.85, 0, 0, 0, 0.12);
    addBodyPart(upperArmGeo, 1.15, 0.85, 0, 0, 0, -0.12);

    const forearmGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.8, 14);
    addBodyPart(forearmGeo, -1.28, 0.1, 0, 0, 0, 0.08);
    addBodyPart(forearmGeo, 1.28, 0.1, 0, 0, 0, -0.08);

    const handGeo = new THREE.SphereGeometry(0.12, 12, 12);
    handGeo.scale(0.8, 1.4, 0.6);
    addBodyPart(handGeo, -1.33, -0.4, 0);
    addBodyPart(handGeo, 1.33, -0.4, 0);

    // 8. Legs (Thighs, Knees, Calves, Feet)
    const thighGeo = new THREE.CylinderGeometry(0.3, 0.22, 1.1, 16);
    thighGeo.scale(1.0, 1.0, 0.9);
    addBodyPart(thighGeo, -0.45, -0.85, 0, 0, 0, -0.05);
    addBodyPart(thighGeo, 0.45, -0.85, 0, 0, 0, 0.05);

    const kneeGeo = new THREE.SphereGeometry(0.18, 14, 14);
    addBodyPart(kneeGeo, -0.47, -1.45, 0.02);
    addBodyPart(kneeGeo, 0.47, -1.45, 0.02);

    const calfGeo = new THREE.CylinderGeometry(0.2, 0.14, 1.1, 16);
    addBodyPart(calfGeo, -0.47, -2.05, 0, 0, 0, -0.02);
    addBodyPart(calfGeo, 0.47, -2.05, 0, 0, 0, 0.02);

    const footGeo = new THREE.BoxGeometry(0.24, 0.15, 0.55);
    addBodyPart(footGeo, -0.48, -2.65, 0.12);
    addBodyPart(footGeo, 0.48, -2.65, 0.12);

    // 9. Central Neural Spine Column
    const spineGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.0, 14);
    const spineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.position.set(0, 0.65, -0.1);
    scanGroup.add(spineMesh);

    // 10. Circulatory Arterial Vascular Tree (3D Curved Blood Stream)
    const vascularGroup = new THREE.Group();
    scanGroup.add(vascularGroup);

    const arteryMat = new THREE.MeshBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.65 });

    // Aorta & Carotid branch
    const aortaGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.7, 8);
    const aorta = new THREE.Mesh(aortaGeo, arteryMat);
    aorta.position.set(0.08, 1.5, 0.05);
    vascularGroup.add(aorta);

    // Femoral Arteries
    const leftFemoral = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 1.8, 8), arteryMat);
    leftFemoral.position.set(-0.45, -1.35, 0);
    vascularGroup.add(leftFemoral);

    const rightFemoral = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 1.8, 8), arteryMat);
    rightFemoral.position.set(0.45, -1.35, 0);
    vascularGroup.add(rightFemoral);

    // Brachial Arm Arteries
    const leftArmArtery = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 1.3, 8), arteryMat);
    leftArmArtery.position.set(-1.2, 0.4, 0);
    leftArmArtery.rotation.z = 0.1;
    vascularGroup.add(leftArmArtery);

    const rightArmArtery = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 1.3, 8), arteryMat);
    rightArmArtery.position.set(1.2, 0.4, 0);
    rightArmArtery.rotation.z = -0.1;
    vascularGroup.add(rightArmArtery);

    // Real-Time Flowing Erythrocyte Nanoparticles in Vascular System
    const rbcParticleCount = 45;
    const rbcParticles = [];
    const rbcGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const rbcMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });

    for (let i = 0; i < rbcParticleCount; i++) {
      const p = new THREE.Mesh(rbcGeo, rbcMat);
      const branch = i % 4; // 0: Aorta/Neck, 1: Left Leg, 2: Right Leg, 3: Arms
      const progress = Math.random();
      scanGroup.add(p);
      rbcParticles.push({ mesh: p, branch, progress, speed: 0.008 + Math.random() * 0.006 });
    }

    // 11. Anatomical Pulsating Heart (Left Chest Cavity)
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0.12, 0.12);
    heartShape.bezierCurveTo(0.12, 0.12, 0.1, 0, 0, 0);
    heartShape.bezierCurveTo(-0.15, 0, -0.15, 0.18, -0.15, 0.18);
    heartShape.bezierCurveTo(-0.15, 0.28, -0.05, 0.38, 0.12, 0.48);
    heartShape.bezierCurveTo(0.3, 0.38, 0.4, 0.28, 0.4, 0.18);
    heartShape.bezierCurveTo(0.4, 0.18, 0.4, 0, 0.25, 0);
    heartShape.bezierCurveTo(0.18, 0, 0.12, 0.12, 0.12, 0.12);

    const heartExtrude = new THREE.ExtrudeGeometry(heartShape, { depth: 0.24, bevelEnabled: true, bevelSegments: 6, steps: 1, bevelSize: 0.08, bevelThickness: 0.12 });
    heartExtrude.center();

    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xff0033,
      emissiveIntensity: 1.0,
      roughness: 0.15,
      metalness: 0.6
    });

    const heartCore = new THREE.Mesh(heartExtrude, heartMat);
    heartCore.scale.set(1.3, -1.3, 1.3);
    heartCore.position.set(0.16, 1.15, 0.16);
    scanGroup.add(heartCore);

    const heartPulseLight = new THREE.PointLight(0xff0044, 3.0, 5);
    heartPulseLight.position.set(0.16, 1.15, 0.3);
    scanGroup.add(heartPulseLight);

    // 12. Vitals Orbital Ring Gauges
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 });
    const vitalRingChest = new THREE.Mesh(ringGeo1, ringMat1);
    vitalRingChest.rotation.x = Math.PI / 2;
    vitalRingChest.position.y = 1.15;
    scanGroup.add(vitalRingChest);

    const ringGeo2 = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.65 });
    const vitalRingWaist = new THREE.Mesh(ringGeo2, ringMat2);
    vitalRingWaist.rotation.x = Math.PI / 2;
    vitalRingWaist.position.y = 0.35;
    scanGroup.add(vitalRingWaist);

    // 13. Dynamic Dual Laser Scanner Sweep Plane
    const laserGroup = new THREE.Group();
    scanGroup.add(laserGroup);

    const laserDisk = new THREE.Mesh(
      new THREE.RingGeometry(0, 1.9, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
    );
    laserDisk.rotation.x = Math.PI / 2;
    laserGroup.add(laserDisk);

    const laserBorder = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.035, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.9 })
    );
    laserBorder.rotation.x = Math.PI / 2;
    laserGroup.add(laserBorder);

    // 14. Hologram Base Pedestal with Digital Compass Grid
    const pedestalGeo = new THREE.CylinderGeometry(1.75, 1.85, 0.1, 36);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.75
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -2.75;
    scanGroup.add(pedestal);

    // Interactive Drag to Rotate & Zoom
    let isUserDragging = false;
    let prevX = 0, prevY = 0;
    let targetRotY = 0, targetRotX = 0;

    container.addEventListener('mousedown', (e) => {
      isUserDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isUserDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isUserDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.012;
      targetRotX += dy * 0.006;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX));
      prevX = e.clientX;
      prevY = e.clientY;
    });

    // Touch Support for Mobile
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isUserDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isUserDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isUserDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      targetRotY += dx * 0.015;
      prevX = e.touches[0].clientX;
    }, { passive: true });

    // Mouse Wheel Zoom
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(5.0, Math.min(9.5, camera.position.z));
    }, { passive: false });

    // Animation Loop
    let animId;
    let scanTime = 0;
    let scanSurge = 1.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      scanTime += 0.03 * scanSurge;

      // Rotation inertia & gentle auto-rotation
      if (!isUserDragging) {
        targetRotY += 0.008;
      }
      scanGroup.rotation.y += (targetRotY - scanGroup.rotation.y) * 0.08;
      scanGroup.rotation.x += (targetRotX - scanGroup.rotation.x) * 0.08;

      // Vertical Laser Sweep (From Head +2.4 to Feet -2.6)
      const laserY = Math.sin(scanTime * 1.5) * 2.45;
      laserGroup.position.y = laserY;

      // Laser intensity modulation based on body scanning position
      if (Math.abs(laserY - 1.15) < 0.3) {
        // Highlighting Heart Region
        laserDisk.material.color.setHex(0xff0055);
        laserDisk.material.opacity = 0.7;
      } else if (laserY > 1.9) {
        // Highlighting Brain Region
        laserDisk.material.color.setHex(0x38bdf8);
        laserDisk.material.opacity = 0.6;
        brainMesh.rotation.y += 0.04;
      } else {
        laserDisk.material.color.setHex(0x06b6d4);
        laserDisk.material.opacity = 0.38;
      }

      // Dual-phase Biological Heartbeat Rhythm (Lub-Dub)
      const beat1 = Math.pow(Math.sin(scanTime * 3.6), 32);
      const beat2 = Math.pow(Math.sin(scanTime * 3.6 + 0.35), 32) * 0.45;
      const beatScale = 1.25 + (beat1 + beat2) * 0.4 * scanSurge;
      heartCore.scale.set(beatScale, -beatScale, beatScale);
      heartPulseLight.intensity = 2.5 + (beat1 + beat2) * 5.0 * scanSurge;

      // Flowing Erythrocyte Nanoparticles in Arteries
      rbcParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1.0) p.progress = 0;

        const prg = p.progress;
        if (p.branch === 0) {
          // Aorta / Neck flow
          p.mesh.position.set(0.08, 1.15 + prg * 1.05, 0.05);
        } else if (p.branch === 1) {
          // Left Leg Femoral flow
          p.mesh.position.set(-0.45, 0.2 - prg * 2.6, 0);
        } else if (p.branch === 2) {
          // Right Leg Femoral flow
          p.mesh.position.set(0.45, 0.2 - prg * 2.6, 0);
        } else {
          // Arms flow
          const armSide = (prg > 0.5) ? -1 : 1;
          const subPrg = (prg > 0.5) ? (prg - 0.5) * 2 : prg * 2;
          p.mesh.position.set(armSide * (1.05 + subPrg * 0.3), 1.25 - subPrg * 1.5, 0);
        }
      });

      // Vital Rings counter-rotation
      vitalRingChest.rotation.z += 0.012;
      vitalRingWaist.rotation.z -= 0.016;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return {
      triggerScanSurge: () => {
        scanSurge = 2.2;
        heartMat.emissive.setHex(0xff0022);
        if (window.soundFX) window.soundFX.playHeartbeat();
        setTimeout(() => {
          scanSurge = 1.0;
          heartMat.emissive.setHex(0xff0033);
        }, 3000);
      },
      destroy: () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
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
      color: 0xffb703,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.18
    });
    const coinMesh = new THREE.Mesh(coinGeo, coinMat);
    coinMesh.rotation.x = Math.PI / 2;
    scene.add(coinMesh);

    // Inner Rim
    const rimGeo = new THREE.TorusGeometry(1.75, 0.08, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1
    });
    const rim1 = new THREE.Mesh(rimGeo, rimMat);
    rim1.position.z = 0.13;
    coinMesh.add(rim1);

    const rim2 = new THREE.Mesh(rimGeo, rimMat);
    rim2.position.z = -0.13;
    coinMesh.add(rim2);

    // Blood Drop Emblem on Coin Face
    const emblemShape = new THREE.Shape();
    emblemShape.moveTo(0, 0.8);
    emblemShape.bezierCurveTo(0.6, 0.1, 0.6, -0.6, 0, -0.8);
    emblemShape.bezierCurveTo(-0.6, -0.6, -0.6, 0.1, 0, 0.8);

    const emblemGeo = new THREE.ExtrudeGeometry(emblemShape, { depth: 0.1, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.05, bevelThickness: 0.05 });
    emblemGeo.center();

    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0xef4444,
      emissiveIntensity: 0.7,
      metalness: 0.5,
      roughness: 0.2
    });

    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.scale.set(0.9, 0.9, 0.9);
    emblemMesh.position.z = 0.16;
    coinMesh.add(emblemMesh);

    // Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      coinMesh.rotation.y += deltaX * 0.015;
      coinMesh.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        coinMesh.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return {
      destroy: () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }
}

window.BloodConnect3D = BloodConnect3D;
