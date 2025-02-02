import React from "react";
import { Balloon } from "./Balloon";

const colors = ["#C30010", "#ff69b4", "#C683D7"];

export function CreateBalloon({ scene, count, scale }) {
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
}
