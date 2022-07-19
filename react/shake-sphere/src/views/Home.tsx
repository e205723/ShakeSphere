import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ModelViewer from '../three/ModelViewer';
import SignUpModal from '../modals/SignUpModal';
import SignInModal from '../modals/SignInModal';
import './Home.css';

function Home() {
  const appContext = useContext(AppContext);
  if (appContext!.isSignedIn) {
    return (
      <div className="Home">
        <div>
          <p>{`Hello, ${appContext!.userName}!`}</p>
        </div>
        <p>This page is Home.</p>
        <div className="Model">
          <ModelViewer modelPath="/armeria_s.glb" scale={1.5} position={[0, -3.3, 0]} />
        </div>
      </div>
    );
  }
  return (
    <div className="Home">
      <div>
        <p>Please, sign in.</p>
      </div>
      <p>This page is Home.</p>
      <div className="Model">
        <ModelViewer modelPath="/armeria_s.glb" scale={1.5} position={[0, -3.3, 0]} />
      </div>
      <SignUpModal />
      <SignInModal />
    </div>
  );
}
export default Home;
