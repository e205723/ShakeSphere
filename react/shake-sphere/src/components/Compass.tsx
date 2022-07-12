import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function Compass() {
  const appContext = useContext(AppContext);
  return (
    <div>
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Compass.</p>
    </div>
  );
}
export default Compass;
