import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Messages from './components/Messages';
import Compass from './components/Compass';
import Collections from './components/Collections';

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
