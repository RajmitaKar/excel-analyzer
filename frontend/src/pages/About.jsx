import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// 3D Cube component (spinning)
const Cube = ({ position, color }) => {
  return (
    <mesh position={position} rotation={[0.4, 0.6, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const About = () => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-purple-900 via-black to-pink-900 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* 3D Background */}
      <Canvas
        className="absolute inset-0 z-0"
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />

        {/* Cubes */}
        <Cube position={[-2, 1, 0]} color="#7dd3fc" />
        <Cube position={[2, -1, 0]} color="#c084fc" />
        <Cube position={[0, -2, -1]} color="#a5b4fc" />
      </Canvas>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About Excel Analyzer
        </h1>

        <p className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed mx-auto mb-8">
          <span className="block mb-4">
            Excel Analyzer is a powerful tool designed to simplify your data
            workflows. Upload Excel files and instantly visualize insights with
            interactive analytics.
          </span>

          <span className="block mb-4">
            Our platform transforms raw spreadsheets into clear, visual
            dashboards. Instead of scrolling through endless rows and columns,
            you get charts, summaries, and key patterns highlighted instantly.
          </span>

          <span className="block mb-4">
            With Excel Analyzer, you don’t need to be a data expert. The tool is
            built for professionals, students, and businesses who want quick
            insights without spending hours on manual calculations.
          </span>

          <span className="block">
            This website is part of a continuous project — in the future, you
            will see more features like{" "}
            <b>advanced AI-driven analysis, collaboration tools, and
            customizable reports</b>.
          </span>
        </p>

        {/* Bullet Points */}
        <div className="flex flex-col md:flex-row justify-center gap-6 text-left text-gray-300 max-w-3xl mx-auto">
          <div className="bg-white/10 p-4 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">✔️ Easy to Use</h3>
            <p>
              No need for advanced skills. Just upload your Excel file and get
              instant insights.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">📊 Instant Insights</h3>
            <p>
              See your data come alive with charts, summaries, and meaningful
              patterns.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">🔮 Future Ready</h3>
            <p>AI-driven analysis and collaboration features are on the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
