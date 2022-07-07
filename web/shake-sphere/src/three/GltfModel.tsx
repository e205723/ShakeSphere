import React, { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

interface GltfModelArg {
  modelPath: string,
  scale: number,
  position: Array<number>,
}

const GltfModel = function createGltfModel(arg: GltfModelArg) {
  const ref = useRef<Mesh>(null);
  const gltf = useLoader(GLTFLoader, arg.modelPath);
  const [hovered, hover] = useState(false);

  useFrame(() => {
    ref.current!.rotation.y += 0.003;
  });
  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={arg.position}
      scale={hovered ? arg.scale * 1.2 : arg.scale}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    />
  );
};

export default GltfModel;
