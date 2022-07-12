import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function Log() {
  const appContext = useContext(AppContext);
  return (
    <div>
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Log.</p>
    </div>
  );
}
export default Log;
