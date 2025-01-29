import { useState } from 'react';
import './App.css';
import CanvasComp from './CanvasComp.jsx';

function App() {

  const [displayStr, setDisplayStr] = useState('Cubic')

  return (
    <div className="AppContainer">

      <h1>3D Visualizer</h1>

      <div className='CanvasContainer'>

        <select className='displayStr' name="" id="" value={displayStr}
          onChange={(e) => setDisplayStr(e.target.value)}>

          <option value="Cubic">Cubic</option>
          <option value="Monoclinic">Monoclinic</option>
        </select>

        <CanvasComp displayStr={displayStr}></CanvasComp>

      </div>

    </div>
  );
}

export default App;
