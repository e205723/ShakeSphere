import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Compass from './components/Compass';
import Log from './components/Log';
import Collections from './components/Collections';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Compass" element={<Compass />} />
      <Route path="/Log" element={<Log />} />
      <Route path="/Collections" element={<Collections />} />
    </Routes>
  );
}
export default Main;
