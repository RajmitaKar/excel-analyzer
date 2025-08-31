import React, {useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const Dashboard = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // dark background

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // 3D Bar Graphs (fade violet)
    const bars = [];
    const numBars = 25;
    for (let i = 0; i < numBars; i++) {
      const height = Math.random() * 10 + 2;
      const geometry = new THREE.BoxGeometry(1.5, height, 1.5);
      const material = new THREE.MeshStandardMaterial({
        color: 0xdda0ff, // fade violet/light violet
        roughness: 0.6,
        metalness: 0.3,
      });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(i * 2 - numBars, height / 2 - 1, 0);
      scene.add(bar);
      bars.push(bar);
    }

    // Cubes (bluish-gray)
    const cubes = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 2 + 1;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshStandardMaterial({ color: 0x4b4b8b }); // dark bluish-gray
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 10,
        (Math.random() - 0.5) * 50
      );
      scene.add(cube);
      cubes.push(cube);
    }

    // Bloom effect
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, // strength
      0.4, // radius
      0.2 // threshold
    );
    composer.addPass(bloomPass);

    // Camera position
    let angle = 0;
    const radius = 35;
    camera.position.y = 15;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      bars.forEach((bar) => {
        bar.rotation.y += 0.002;
      });

      cubes.forEach((cube) => {
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
      });

      angle += 0.001;
      camera.position.x = radius * Math.sin(angle);
      camera.position.z = radius * Math.cos(angle);
      camera.lookAt(0, 0, 0);

      composer.render();
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
     if (mountRef.current && renderer.domElement) {
    mountRef.current.removeChild(renderer.domElement);
  }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      {/* Topbar */}
      <div className="bg-black text-white p-4 flex justify-between items-center z-20 relative">
        <h1 className="font-bold text-xl">Home</h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>

      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0"></div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
        <h1 className="text-white text-6xl font-bold mb-12">
          Welcome to ExcelAnalyzer
        </h1>
        <Link to="/excel-analyzer">
          <button className="bg-gradient-to-b from-purple-600 to-pink-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:bg-purple-700 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
