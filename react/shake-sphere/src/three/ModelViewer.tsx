import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PropTypes from 'prop-types';
import GltfModel from './GltfModel';

const ModelViewer = function createModelViewer({ modelPath = '', scale = 1, position = [0, 0, 0] }) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <GltfModel modelPath={modelPath} scale={scale} position={position} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

ModelViewer.propTypes = {
  modelPath: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default ModelViewer;
