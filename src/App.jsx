import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BravaisLattices from './pages/BravaisLattices';
import SpaceGroups from './pages/SpaceGroups';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<BravaisLattices/>} />
        <Route path="/space-groups" element={<SpaceGroups/>} />
      </Routes>
  );
}
