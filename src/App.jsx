import "./styles.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Balloon } from "./components/Balloon";

const colors = ["#C30010", "#ff69b4", "#C683D7"];

export default function App() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 1,
        far: 50,
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {Array.from({ length: 60 }, (_, index) => {
        const color = colors[index % colors.length];
        const delay = Math.random() * 2;
        return <Balloon key={index} delay={delay} color={color} />;
      })}
      <Environment files="rainbow.hdr" />
      <OrbitControls minDistance={1} maxDistance={10} />
    </Canvas>
  );
}
