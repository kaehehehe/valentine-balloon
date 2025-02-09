import React from "react";
import { useGLTF } from "@react-three/drei";
import { Balloon } from "./Balloon";

const COLORS = ["#C30010", "#ff69b4", "#C683D7"];

const getColor = (index) => COLORS[index % COLORS.length];

export function CreateBalloon({ modelPath, count, scale }) {
  const { scene, error } = useGLTF(modelPath);

  if (error) {
    console.error("Error loading model:", error);
    return null;
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const color = getColor(index);
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
      })}
    </>
  );
}
