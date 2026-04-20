import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const TesseractModel = () => {
  const { scene } = useGLTF("/models/tesseract.glb");
  const ref = useRef();

  // Runs once only — not every render
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color("#00ffff");
        child.material.emissiveIntensity = 1.5;
        child.material.toneMapped = false;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={ref} object={scene} scale={5} />;
};

useGLTF.preload("/models/tesseract.glb");

const MechCube = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 2]} intensity={2} color="#00ffff" />
        <pointLight position={[-2, -2, -2]} intensity={1} color="#0088ff" />

        <TesseractModel />

        <OrbitControls enableZoom={false} />

        <EffectComposer>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur={false}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default MechCube;
