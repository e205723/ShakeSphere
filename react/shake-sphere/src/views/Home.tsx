import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ModelViewer from '../three/ModelViewer';
import SignUpModal from '../modals/SignUpModal';
import './Home.css';

function Home() {
  const appContext = useContext(AppContext);

  return (
    <div className="Home">
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Home.</p>
      <div className="Model">
        <ModelViewer modelPath="/armeria.glb" scale={1.5} position={[0, -5, 0]} />
      </div>
      <SignUpModal />
    </div>
  );
}
export default Home;
