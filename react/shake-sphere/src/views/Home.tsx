import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import FetchUserState from '../async/FetchUserState';
import ModelViewer from '../three/ModelViewer';
import SignUpModal from '../modals/SignUpModal';
import SignInModal from '../modals/SignInModal';
import './Home.css';

function Welcome() {
  const appContext = useContext(AppContext);
  FetchUserState(appContext);
  if (appContext!.isSignedIn) {
    return (
      <div>
        <p>{`Hello, ${appContext!.userName}!`}</p>
      </div>
    );
  }
  return (
    <div>
      <p>Please, sign in.</p>
    </div>
  );
}

function Home() {
  return (
    <div className="Home">
      <Welcome />
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
