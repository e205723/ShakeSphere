import { useRef, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader, DoubleSide } from 'three';
import { DeviceOrientationControls } from '@react-three/drei';
import PropTypes from 'prop-types';

interface SphereArg {
  modelPath: string,
}

const Sphere = function createSphere(arg: SphereArg) {
  const ref = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, arg.modelPath);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[125, 50, 50]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
      />
    </mesh>
  );
};

const ModelViewer = function createModelViewer({ modelPath = '' }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Sphere modelPath={modelPath} />
        <DeviceOrientationControls />
      </Suspense>
    </Canvas>
  );
};

ModelViewer.propTypes = {
  modelPath: PropTypes.string.isRequired,
};

export default ModelViewer;
