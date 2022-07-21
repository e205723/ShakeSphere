import { useRef, Suspense } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
// import { useLoader, Canvas, useFrame } from '@react-three/fiber';
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

const ArmeriaViewer = function createModelViewer({
  scale = 1.5,
  position = [0, -3.3, 0],
  rotation = [Math.PI / 15, 0, 0],
}) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <GltfModel modelPath="/armeria_s.glb" scale={scale} position={position} rotation={rotation} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

ArmeriaViewer.propTypes = {
  scale: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default ArmeriaViewer;
