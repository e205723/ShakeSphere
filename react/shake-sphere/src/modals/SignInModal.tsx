import { ChangeEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import sendSignInInfo from './SignInModalFeatures';

function SignInModal() {
  const appContext = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => { setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); };
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  async function sendSignInInfoButtonAction() {
    await sendSignInInfo(appContext, userName, password);
  }
  return (
    <div>
      <button type="button" onClick={openModal}>Sign In</button>
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
      >
        <button type="button" onClick={closeModal}>close</button>
        <h1>Sign In</h1>
        <p>Name:</p>
        <input type="text" value={userName} onChange={onNameChange} />
        <p>Password:</p>
        <input type="password" value={password} onChange={onPasswordChange} />
        <div>
          <button type="button" onClick={sendSignInInfoButtonAction}>Sign In</button>
        </div>
      </Modal>
    </div>
  );
}
export default SignInModal;
