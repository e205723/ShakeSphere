import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page1" element={<PageOne />} />
      <Route path="/page2" element={<PageTwo />} />
    </Routes>
  );
}
export default Main;
