import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function PageTwo() {
  const appContext = useContext(AppContext);
  const changeUserName = () => {
    appContext!.setUserName('who');
  };
  return (
    <div>
      <p>PageTwo</p>
      <p>{appContext!.userName}</p>
      <button type="button" onClick={changeUserName}>Button</button>
    </div>
  );
}
export default PageTwo;
