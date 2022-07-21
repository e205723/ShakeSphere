import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CompassViewer from '../three/CompassViewer';

function Compass() {
  const appContext = useContext(AppContext);
  return (
    <div>
      <CompassViewer />
    </div>
  );
}
export default Compass;
