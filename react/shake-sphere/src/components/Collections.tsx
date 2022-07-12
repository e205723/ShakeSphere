import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function Collections() {
  const appContext = useContext(AppContext);
  return (
    <div>
      <p>{`Hello, ${appContext!.userName}.`}</p>
      <p>This page is Collections.</p>
    </div>
  );
}
export default Collections;
