import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Main from './Main';
import { AppContext } from './contexts/AppContext';
import FetchUserState from './async/FetchUserState';

function Router() {
  const appContext = useContext(AppContext);
  FetchUserState(appContext);
  if (appContext!.isSignedIn) {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Messages">Messages</Link></li>
        <li><Link to="/Compass">Compass</Link></li>
        <li><Link to="/Collections">Collections</Link></li>
      </ul>
    );
  }
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
  );
}

export default function App() {
  return (
    <div>
      <Main />
      <hr />
      <Router />
    </div>
  );
}
