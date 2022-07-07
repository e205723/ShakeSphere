import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ModelViewer from '../three/ModelViewer';
import './Home.css';

function Home() {
  const appContext = useContext(AppContext);
  return (
    <div className="Home">
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Home.</p>
      <ModelViewer modelPath="/sample.glb" scale={40} position={[0, 0, 0]} />
    </div>
  );
}
export default Home;
