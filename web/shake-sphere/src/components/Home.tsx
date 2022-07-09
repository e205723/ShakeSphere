import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ModelViewer from '../three/ModelViewer';
import SphereViewer from '../three/SphereViewer';
import './Home.css';

function Home() {
  const appContext = useContext(AppContext);
  return (
    <div className="Home">
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Home.</p>
      <div className="Model">
        <ModelViewer modelPath="/sample.glb" scale={1.5} position={[0, -5, 0]} />
      </div>
      <div className="Model">
        <SphereViewer modelPath="/sample.png" />
      </div>
    </div>
  );
}
export default Home;
