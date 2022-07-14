import { ChangeEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../contexts/AppContext';

function SignInModal() {
  const appContext = useContext(AppContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => { setIsOpen(true); };
  const closeModal = () => {
    setIsOpen(false);
    fetch('http://localhost/api/welcome')
      .then((response) => response.json())
      .then((json) => json!.name)
      .then((name) => appContext?.setUserName(name));
  };
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const sendSignInInfo = () => {
    fetch('http://localhost/api/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        name: userName,
        password,
      }),
    });
  };
  return (
    <div>
      <button type="button" onClick={openModal}>Sign In</button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
      >
        <button type="button" onClick={closeModal}>close</button>
        <h1>Sign In</h1>
        <p>Name:</p>
        <input type="text" value={userName} onChange={onNameChange} />
        <p>Password:</p>
        <input type="password" value={password} onChange={onPasswordChange} />
        <div>
          <button type="button" onClick={sendSignInInfo}>Sign In</button>
        </div>
      </Modal>
    </div>
  );
}
export default SignInModal;
