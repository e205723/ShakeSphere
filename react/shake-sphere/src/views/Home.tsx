import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ModelViewer from '../three/ModelViewer';
import SignUpModal from '../modals/SignUpModal';
import SignInModal from '../modals/SignInModal';
import './Home.css';

async function fetchUserName() {
  const appContext = useContext(AppContext);
  const welcomeURL = 'http://localhost/api/welcome';

  await fetch(welcomeURL)
    .then((response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response.json());
      }
      return Promise.reject();
    })
    .then((json) => json!.name)
    .then((name) => {
      appContext!.setIsSignedIn(true);
      appContext!.setUserName(name);
    });
}

function Welcome() {
  const appContext = useContext(AppContext);
  fetchUserName();
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
        <ModelViewer modelPath="/armeria.glb" scale={1.5} position={[0, -5, 0]} />
      </div>
      <SignUpModal />
      <SignInModal />
    </div>
  );
}
export default Home;
