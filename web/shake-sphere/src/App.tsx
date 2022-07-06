import { Link } from 'react-router-dom';
import Main from './Main';
import { AppContextProvider } from './contexts/AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Compass">Compass</Link></li>
          <li><Link to="/Log">Log</Link></li>
          <li><Link to="/Collections">Collections</Link></li>
        </ul>
        <hr />
        <Main />
      </div>
    </AppContextProvider>
  );
}
