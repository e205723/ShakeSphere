import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function PageOne() {
  const appContext = useContext(AppContext);

  const changeThemeColor = () => {
    appContext!.setThemeColor('dark');
  };

  return (
    <div>
      <p>PageOne</p>
      <p>{appContext!.themeColor}</p>
      <button type="button" onClick={changeThemeColor}>Button</button>
    </div>
  );
}
export default PageOne;
