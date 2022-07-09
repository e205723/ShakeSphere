import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DeviceOrientationControls } from '@react-three/drei';
import PropTypes from 'prop-types';
import Sphere from './Sphere';

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
