import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";


function Product({ color, roughness, metalness, wireframe, animate }) {
  const group = useRef();

  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y += delta * 0.32;
    }
  });

  return (
    <group ref={group}>
      <Float speed={animate ? 1.2 : 0} rotationIntensity={0.12} floatIntensity={0.15}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusKnotGeometry args={[1.08, 0.32, 96, 16, 2, 3]} />
          <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
            wireframe={wireframe}
          />
        </mesh>

        <mesh position={[0, -0.1, 0]} scale={0.72} castShadow>
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial
            color={color}
            roughness={Math.min(1, roughness + 0.1)}
            metalness={Math.max(0, metalness - 0.08)}
            wireframe={wireframe}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene(props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [3.6, 2.4, 4.8], fov: 42 }}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance" }}
      fallback={
        <div className="canvas-fallback">
          <strong>3D is not available here.</strong>
          <span>Use a modern browser with WebGL enabled.</span>
        </div>
      }
    >
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 5, 3]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 1, -2]} intensity={8} distance={8} />
      <Product {...props} />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={8} blur={2.5} far={4} />
      <Environment preset="city" environmentIntensity={0.6} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        enableDamping
        dampingFactor={0.06}
      />
    </Canvas>
  );
}