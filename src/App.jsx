import "./styles.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Balloon } from "./components/Balloon";

const colors = ["#C30010", "#ff69b4", "#C683D7"];

const createBalloons = ({ scene, count, scale }) => {
  return Array.from({ length: count }, (_, index) => {
    const color = colors[index % colors.length];
    const delay = Math.random() * 2;
    return (
      <Balloon
        key={index}
        scene={scene}
        delay={delay}
        color={color}
        scale={scale}
      />
    );
  });
};

export default function App() {
  const { scene: heartBalloon } = useGLTF("heart-balloon.glb");
  const { scene: loveBalloon } = useGLTF("love-balloon.glb");

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 1,
        far: 50,
      }}
    >
      <pointLight position={[10, 10, 10]} />

      {createBalloons({
        scene: heartBalloon,
        count: 60,
        scale: [0.5, 0.5, 0.5],
      })}

      {createBalloons({
        scene: loveBalloon,
        count: 10,
        scale: [1.6, 1.6, 1.6],
      })}

      <Environment files="rainbow.hdr" />
      <OrbitControls
        minDistance={1}
        maxDistance={10}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI}
        maxAzimuthAngle={Math.PI}
      />
    </Canvas>
  );
}
