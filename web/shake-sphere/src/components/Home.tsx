import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function Home() {
  const appContext = useContext(AppContext);
  return (
    <div>
      <p>{`Hello, ${appContext!.userName}?`}</p>
    </div>
  );
}
export default Home;
