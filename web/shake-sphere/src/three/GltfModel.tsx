import { useRef } from 'react';
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

  useFrame(() => {
    ref.current!.rotation.y += 0.003;
  });
  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={arg.position}
      scale={arg.scale}
    />
  );
};

export default GltfModel;
