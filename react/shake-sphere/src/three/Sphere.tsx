import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader, DoubleSide } from 'three';

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

export default Sphere;
