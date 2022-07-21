import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ArmeriaViewer from '../three/ArmeriaViewer';
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
          <ArmeriaViewer />
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
        <ArmeriaViewer />
      </div>
      <SignUpModal />
      <SignInModal />
    </div>
  );
}
export default Home;
