import SphereViewer from '../three/SphereViewer';
import './Collections.css';

function Collections() {
  return (
    <div>
      <div className="sphere-viewer">
        <SphereViewer modelPath="/sample.png" />
      </div>
    </div>
  );
}
export default Collections;
