import { useRef, Suspense } from 'react';
import { useLoader, Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';
import PropTypes from 'prop-types';

interface GltfModelArg {
  modelPath: string,
  scale: number,
  position: Array<number>,
  rotation: Array<number>,
}

const GltfModel = function createGltfModel(arg: GltfModelArg) {
  const ref = useRef<Mesh>(null);
  const gltf = useLoader(GLTFLoader, arg.modelPath);

  // useFrame(() => {
  //   ref.current!.rotation.y += 0.003;
  // });
  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={arg.position}
      scale={arg.scale}
      rotation={arg.rotation}
    />
  );
};

const ArmeriaViewer = function createModelViewer({ scale, position, rotation }: {
  scale: number;
  position: number[];
  rotation: number[];
}) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <GltfModel modelPath="/armeria_s.glb" scale={scale} position={position} rotation={rotation} />
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          maxDistance={5}
          minDistance={5}
        />
      </Suspense>
    </Canvas>
  );
};

ArmeriaViewer.propTypes = {
  scale: PropTypes.number,
  position: PropTypes.arrayOf(PropTypes.number.isRequired),
  rotation: PropTypes.arrayOf(PropTypes.number.isRequired),
};

ArmeriaViewer.defaultProps = {
  scale: 1.5,
  position: [0, -3.5, 0],
  rotation: [0, 0, 0],
};

export default ArmeriaViewer;
