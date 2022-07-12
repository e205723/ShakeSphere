import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Messages from './views/Messages';
import Compass from './views/Compass';
import Collections from './views/Collections';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/Compass" element={<Compass />} />
      <Route path="/Collections" element={<Collections />} />
    </Routes>
  );
}
export default Main;
