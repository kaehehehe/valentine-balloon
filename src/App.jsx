import "./styles.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { CreateBalloon } from "./components/CreateBalloon";

const HEART_BALLOON_PATH = "heart-balloon.glb";
const LOVE_BALLOON_PATH = "love-balloon.glb";

export default function App() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
        fov: 45,
        near: 1,
        far: 50,
      }}
    >
      <pointLight position={[10, 10, 10]} />

      <CreateBalloon
        modelPath={HEART_BALLOON_PATH}
        count={45}
        scale={[0.5, 0.5, 0.5]}
      />

      <CreateBalloon
        modelPath={LOVE_BALLOON_PATH}
        count={5}
        scale={[1.6, 1.6, 1.6]}
      />

      <Environment files="rainbow.hdr" />
      <OrbitControls
        minDistance={10}
        maxDistance={10}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
