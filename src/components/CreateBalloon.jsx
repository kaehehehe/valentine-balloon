import React from "react";
import { useGLTF } from "@react-three/drei";
import { Balloon } from "./Balloon";
import { HEART_BALLOON_PATH } from "../App";

const COLORS = ["#C30010", "#ff69b4", "#C683D7"];
const HEART_BALLOON_SCALE = 0.5;
const LOVE_BALLOON_SCALE = 1.6;

const getColor = (index) => COLORS[index % COLORS.length];

export function CreateBalloon({ modelPath, count }) {
  const { scene, error } = useGLTF(modelPath);

  if (error) {
    console.error("Error loading model:", error);
    return null;
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const color = getColor(index);
        return (
          <Balloon
            key={index}
            scene={scene}
            color={color}
            scale={
              modelPath === HEART_BALLOON_PATH
                ? HEART_BALLOON_SCALE
                : LOVE_BALLOON_SCALE
            }
          />
        );
      })}
    </>
  );
}
