import { useState } from 'react';
import './App.css';
import CanvasComp from './CanvasComp.jsx';

function App() {
  
  return (
    <div className="AppContainer">

      <h1>3D Visualizer</h1>
      <CanvasComp></CanvasComp>

    </div>
  );
}

export default App;
