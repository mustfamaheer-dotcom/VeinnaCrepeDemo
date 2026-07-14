import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { SITE_CONFIG } from "../utils/constants";
import "./HeroSection.css";

const headline = "Vienna Crepe";

const BADGES = [
  { text: "جودة عالية", x: "4%", y: "18%" },
  { text: "توصيل سريع", x: "2%", y: "52%" },
  { text: "أفضل الأسعار", x: "4%", y: "72%" },
];

export function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, containerW / containerH, 0.1, 1000);
    camera.position.set(0, 0.5, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(containerW, containerH);
    const dpr = Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.2 : 2);
    renderer.setPixelRatio(dpr);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const toDispose: { dispose: () => void }[] = [];

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff8c00, 0.5, 100);
    pointLight.position.set(-5, 3, 3);
    scene.add(pointLight);

    // Pizza Group - centered
    const pizzaGroup = new THREE.Group();
    pizzaGroup.position.set(0, 0, 0);
    scene.add(pizzaGroup);

    // --- Dough base ---
    const doughMat = new THREE.MeshStandardMaterial({
      color: 0xd4a574, roughness: 0.7, metalness: 0.05,
    });
    toDispose.push(doughMat);
    const doughGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.15, 48);
    toDispose.push(doughGeo);
    const dough = new THREE.Mesh(doughGeo, doughMat);
    dough.castShadow = true;
    dough.receiveShadow = true;
    pizzaGroup.add(dough);

    // --- Raised crust edge ---
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0xc4953a, roughness: 0.8, metalness: 0.02,
      emissive: 0x8a6a2a, emissiveIntensity: 0.05,
    });
    toDispose.push(crustMat);
    const crustGeo = new THREE.TorusGeometry(1.48, 0.18, 16, 48);
    toDispose.push(crustGeo);
    const crust = new THREE.Mesh(crustGeo, crustMat);
    crust.position.y = 0.07;
    crust.rotation.x = Math.PI / 2;
    crust.castShadow = true;
    crust.receiveShadow = true;
    pizzaGroup.add(crust);

    // --- Sauce layer (visible slightly at edge) ---
    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xbb2222, roughness: 0.9, metalness: 0,
    });
    toDispose.push(sauceMat);
    const sauceGeo = new THREE.CircleGeometry(1.3, 48);
    toDispose.push(sauceGeo);
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.rotation.x = -Math.PI / 2;
    sauce.position.y = 0.08;
    pizzaGroup.add(sauce);

    // --- Cheese layer ---
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xf5e6a0, roughness: 0.6, metalness: 0,
      emissive: 0xe8d48a, emissiveIntensity: 0.03,
    });
    toDispose.push(cheeseMat);
    const cheeseGeo = new THREE.CircleGeometry(1.25, 48);
    toDispose.push(cheeseGeo);
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.rotation.x = -Math.PI / 2;
    cheese.position.y = 0.09;
    pizzaGroup.add(cheese);

    // --- Cheese melt bumps (small irregular blobs) ---
    const meltMat = new THREE.MeshStandardMaterial({
      color: 0xf0d888, roughness: 0.7, metalness: 0,
    });
    toDispose.push(meltMat);
    const meltPositions = [
      { x: 0.5, z: 0.5 }, { x: -0.5, z: -0.5 }, { x: 0.7, z: -0.3 },
      { x: -0.6, z: 0.4 }, { x: 0.2, z: -0.8 }, { x: -0.3, z: 0.7 },
      { x: 0.8, z: 0.1 }, { x: -0.8, z: -0.1 }, { x: 0.3, z: -0.6 },
      { x: -0.4, z: 0.6 }, { x: 0.9, z: -0.5 }, { x: -0.9, z: 0.5 },
    ];
    for (const p of meltPositions) {
      const bump = new THREE.Mesh(new THREE.SphereGeometry(0.06 + Math.random() * 0.08, 8, 8), meltMat);
      bump.position.set(p.x, 0.1, p.z);
      bump.scale.y = 0.3 + Math.random() * 0.2;
      pizzaGroup.add(bump);
    }

    // --- Pepperoni slices ---
    const pepMat = new THREE.MeshStandardMaterial({
      color: 0xbc2a1a, roughness: 0.65, metalness: 0,
      emissive: 0x6a1a0a, emissiveIntensity: 0.05,
    });
    toDispose.push(pepMat);
    // Fat speck material for pepperoni
    const fatMat = new THREE.MeshStandardMaterial({
      color: 0xe8b84a, roughness: 0.5, metalness: 0,
    });
    toDispose.push(fatMat);
    const pepPositions = [
      { x: 0.2, z: 0.5 }, { x: -0.4, z: -0.3 }, { x: 0.6, z: -0.2 },
      { x: -0.7, z: 0.2 }, { x: 0.0, z: -0.6 }, { x: -0.2, z: 0.7 },
      { x: 0.5, z: -0.5 }, { x: -0.5, z: 0.5 }, { x: 0.3, z: -0.1 },
      { x: -0.1, z: -0.9 }, { x: 0.9, z: 0.3 }, { x: -0.8, z: -0.5 },
    ];
    for (const p of pepPositions) {
      const pep = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.06, 12), pepMat);
      pep.position.set(p.x, 0.11, p.z);
      pep.rotation.x = Math.random() * 0.15;
      pep.rotation.z = Math.random() * 0.15;
      pep.castShadow = true;
      pizzaGroup.add(pep);
      // Fat specks on top
      for (let f = 0; f < 3; f++) {
        const speck = new THREE.Mesh(
          new THREE.SphereGeometry(0.02, 6, 6),
          fatMat
        );
        speck.position.set(
          p.x + (Math.random() - 0.5) * 0.12,
          0.14,
          p.z + (Math.random() - 0.5) * 0.12
        );
        pizzaGroup.add(speck);
      }
    }

    // --- Basil leaves ---
    const basilMat = new THREE.MeshStandardMaterial({
      color: 0x3a8a2a, roughness: 0.8, metalness: 0,
      emissive: 0x2a6a1a, emissiveIntensity: 0.03,
      side: THREE.DoubleSide,
    });
    toDispose.push(basilMat);
    // Also some lighter green accent leaves
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x5aaa3a, roughness: 0.7, metalness: 0,
      side: THREE.DoubleSide,
    });
    toDispose.push(accentMat);
    const leafPositions = [
      { x: 0.65, z: 0.55, r: 0.3, mat: basilMat },
      { x: -0.55, z: -0.65, r: 0.25, mat: accentMat },
      { x: 0.85, z: -0.25, r: 0.2, mat: basilMat },
      { x: -0.75, z: 0.35, r: 0.22, mat: accentMat },
      { x: 0.1, z: 0.95, r: 0.18, mat: basilMat },
    ];
    for (const leaf of leafPositions) {
      const l = new THREE.Mesh(
        new THREE.PlaneGeometry(leaf.r, leaf.r * 0.6),
        leaf.mat
      );
      l.position.set(leaf.x, 0.13, leaf.z);
      l.rotation.y = Math.random() * Math.PI * 2;
      l.rotation.x = -0.2 + Math.random() * 0.4;
      l.rotation.z = Math.random() * 0.3;
      pizzaGroup.add(l);
    }

    // --- Shredded cheese / mozzarella dots ---
    const shredMat = new THREE.MeshStandardMaterial({
      color: 0xeee8c8, roughness: 0.5, metalness: 0,
    });
    toDispose.push(shredMat);
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.85;
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.03 + Math.random() * 0.04, 6, 6),
        shredMat
      );
      dot.position.set(
        Math.cos(angle) * radius,
        0.11,
        Math.sin(angle) * radius
      );
      dot.scale.set(1, 0.5 + Math.random() * 0.5, 1);
      pizzaGroup.add(dot);
    }



    const onResize = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    };
    window.addEventListener("resize", onResize);

    let animId: number;
    const startTime = Date.now();

    // Entrance: start scaled down
    pizzaGroup.scale.set(0.9, 0.9, 0.9);
    let entranceProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;

      // Entrance: scale 0.9 → 1.0 over 600ms
      if (entranceProgress < 1) {
        entranceProgress = Math.min(elapsed / 0.6, 1);
        const ease = 1 - Math.pow(1 - entranceProgress, 3);
        const s = 0.9 + ease * 0.1;
        pizzaGroup.scale.set(s, s, s);
      }

      // 360° rotation on both X and Y axes
      pizzaGroup.rotation.x += 0.006;
      pizzaGroup.rotation.y += 0.01;

      // Gentle floating
      pizzaGroup.position.y = Math.sin(now * 0.0015) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      toDispose.forEach((d) => d.dispose());
      renderer.forceContextLoss?.();
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-gradient" />
      <div className="hero-gradient-overlay" />
      <div className="hero-beige-curve" />
      <div className="hero-crepe-circle" />
      <div className="hero-crepe-circle" />
      <div className="hero-crepe-circle" />
      <div className="hero-crepe-circle" />
      <div className="hero-crepe-circle" />

      <div className="hero-canvas-wrapper" ref={canvasRef} />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="hero-logo-wrapper"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero-logo-ring" />
          <img
            src="/images/logo.jpeg"
            alt="Vienna Crepe"
            className="hero-logo"
          />
        </motion.div>

        <h1 className="hero-headline">
          {headline.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.05,
                duration: 0.4,
              }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + headline.length * 0.05 + 0.2, duration: 0.4 }}
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Link to="/menu" className="hero-cta-secondary">
            تصفح القائمة
          </Link>
        </motion.div>
      </motion.div>

      {BADGES.map((badge, i) => (
          <motion.div
            key={badge.text}
            className="hero-floating-badge"
            style={{ left: badge.x, top: badge.y }}
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: 2 + i * 0.2, duration: 0.6 },
              x: { delay: 2 + i * 0.2, duration: 0.6, ease: "easeOut" },
              y: {
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {badge.text}
          </motion.div>
        ))}

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="hero-scroll-line" />
        <span>اسفل</span>
      </motion.div>
    </section>
  );
}
