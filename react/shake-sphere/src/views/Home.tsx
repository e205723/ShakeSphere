import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import ModelViewer from '../three/ModelViewer';
import SphereViewer from '../three/SphereViewer';
import './Home.css';

function Home() {
  const appContext = useContext(AppContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="Home">
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Home.</p>
      <div className="Model">
        <ModelViewer modelPath="/sample.glb" scale={1.5} position={[0, -5, 0]} />
      </div>
      <div className="Model">
        <SphereViewer modelPath="/sample.png" />
      </div>
      <button type="button" onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
      >
        <button type="button" onClick={closeModal}>close</button>
        <h2>Hello</h2>
      </Modal>
    </div>
  );
}
export default Home;
