import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function Messages() {
  const appContext = useContext(AppContext);
  return (
    <div>
      <p>{`Hello, ${appContext!.userName}!`}</p>
      <p>This page is Log.</p>
    </div>
  );
}
export default Messages;
