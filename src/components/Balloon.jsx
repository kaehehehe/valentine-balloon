import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const START_Y = -12; // 풍선의 시작 Y 위치
const END_Y = 7; // 풍선의 종료 Y 위치
const POSITION_OFFSET = 10; // X 및 Z 위치의 최대 오프셋
const BASE_SPEED = 0.02; // 풍선 상승의 기본 속도
const SPEED_VARIATION = 0.02; // 기본 속도에 추가되는 변동
const X_OFFSET_MULTIPLIER = 0.2; // X 위치의 진동에 대한 배수
const Z_OFFSET_MULTIPLIER = 0.1; // Z 위치의 진동에 대한 배수
const DIRECTION_CHANGE = 0.02; // 매 프레임마다 방향 변화량

export function Balloon({ color, scene, scale }) {
  const model = scene.clone();
  const modelRef = useRef();

  const startX = (Math.random() - 0.5) * POSITION_OFFSET;
  const startZ = (Math.random() - 0.5) * POSITION_OFFSET;

  let position = START_Y;
  let direction = Math.random() * Math.PI * 2;
  const speed = Math.random() * BASE_SPEED + SPEED_VARIATION;
  const delay = Math.random() * 10;

  const targetMesh = model.children[0];
  targetMesh.material = targetMesh.material.clone();
  targetMesh.material.color.set(color);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    elapsedTime > delay ? updatePosition() : setInitialPosition();
  });

  const updatePosition = () => {
    if (position < END_Y) {
      position += speed;
      direction += DIRECTION_CHANGE;

      const xOffset = Math.sin(direction) * X_OFFSET_MULTIPLIER;
      const zOffset = Math.cos(direction) * Z_OFFSET_MULTIPLIER;
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
