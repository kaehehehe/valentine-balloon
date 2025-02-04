import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Balloon({ delay, color, scene, scale }) {
  const model = scene.clone();
  const modelRef = useRef();

  // Initial settings
  const startY = -12;
  const endY = 7;
  const startX = (Math.random() - 0.5) * 10;
  const startZ = (Math.random() - 0.5) * 10;

  let position = startY;
  let direction = Math.random() * Math.PI * 2;
  const speed = Math.random() * 0.02 + 0.02;

  useEffect(() => {
    const targetMesh = model.children[0];
    targetMesh.material = targetMesh.material.clone();
    targetMesh.material.color.set(color);
  }, [model, color]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Once the delay is over, the balloon starts to rise
    if (elapsedTime > delay) {
      updatePosition();
    } else {
      setInitialPosition();
    }
  });

  const updatePosition = () => {
    if (position < endY) {
      position += speed;
      direction += 0.02;

      // Set the new position
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
    position = startY;
    modelRef.current.position.set(startX, position, startZ);
  };

  const setInitialPosition = () => {
    modelRef.current.position.set(startX, startY, startZ);
  };

  return (
    <mesh ref={modelRef}>
      <primitive object={model} scale={scale} />
    </mesh>
  );
}
