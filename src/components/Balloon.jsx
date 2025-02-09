import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const START_Y = -12;
const END_Y = 7;
const POSITION_OFFSET = 10;

export function Balloon({ delay, color, scene, scale }) {
  const model = scene.clone();
  const modelRef = useRef();

  const startX = (Math.random() - 0.5) * POSITION_OFFSET;
  const startZ = (Math.random() - 0.5) * POSITION_OFFSET;

  let position = START_Y;
  let direction = Math.random() * Math.PI * 2;
  const speed = Math.random() * 0.02 + 0.02;

  useEffect(() => {
    const targetMesh = model.children[0];
    targetMesh.material = targetMesh.material.clone();
    targetMesh.material.color.set(color);
  }, [model, color]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    elapsedTime > delay ? updatePosition() : setInitialPosition();
  });

  const updatePosition = () => {
    if (position < END_Y) {
      position += speed;
      direction += 0.02;

      const xOffset = Math.sin(direction) * 0.2;
      const zOffset = Math.cos(direction) * 0.1;
      modelRef.current.position.set(
        startX + xOffset,
        position,
        startZ + zOffset
      );
    } else {
      resetPosition();
    }
  };

  const resetPosition = () => {
    position = START_Y;
    modelRef.current.position.set(startX, position, startZ);
  };

  const setInitialPosition = () => {
    modelRef.current.position.set(startX, START_Y, startZ);
  };

  return (
    <mesh ref={modelRef}>
      <primitive object={model} scale={scale} />
    </mesh>
  );
}
