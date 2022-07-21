import { useRef, Suspense } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
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

const CompassViewer = function createModelViewer({
  scale = 0.5,
  position = [0, 0, 0],
  rotation = [Math.PI / 2, 0, 0],
}) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <GltfModel modelPath="/compass.glb" scale={scale} position={position} rotation={rotation} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

CompassViewer.propTypes = {
  scale: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default CompassViewer;
