import "./styles.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { CreateBalloon } from "./components/CreateBalloon";

export default function App() {
  const { scene: heartBalloon } = useGLTF("heart-balloon.glb");
  const { scene: loveBalloon } = useGLTF("love-balloon.glb");

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

      {CreateBalloon({
        scene: heartBalloon,
        count: 45,
        scale: [0.5, 0.5, 0.5],
      })}

      {CreateBalloon({
        scene: loveBalloon,
        count: 5,
        scale: [1.6, 1.6, 1.6],
      })}

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
