import { ChangeEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';
import SignUp from '../async/SignUp';

export default function SignUpModal() {
  const appContext = useContext(AppContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => { setIsOpen(true); };
  const closeModal = () => { setIsOpen(false); };
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmingPassword, setConfirmingPassword] = useState('');
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onConfirmingPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmingPassword(event.target.value);
  };
  function SignUpButtonAction() {
    SignUp(appContext, userName, password);
    if (appContext!.isSignedIn) {
      closeModal();
    }
  }
  return (
    <div>
      <button type="button" onClick={openModal}>Sign Up</button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
      >
        <button type="button" onClick={closeModal}>close</button>
        <h1>Sign Up</h1>
        <p>Name:</p>
        <input type="text" value={userName} onChange={onNameChange} />
        <p>Password:</p>
        <input type="password" value={password} onChange={onPasswordChange} />
        <p>Confirm the Password:</p>
        <input type="password" value={confirmingPassword} onChange={onConfirmingPasswordChange} />
        <div>
          <button type="button" onClick={SignUpButtonAction}>Sign Up</button>
        </div>
      </Modal>
    </div>
  );
}
