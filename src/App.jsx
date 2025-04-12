import { useState } from 'react';
import './App.css';
import CanvasComp from './CanvasComp.jsx';

import { div, min } from 'three/tsl';

// importing the json file 
import strData from './StructureData.json'

function findStrData(displayStr){
  const str = strData.find((s) => s.id == displayStr)
  console.log(`strJsonData : ${str.name}`)

  return str
}

function App() {
  
  console.log("APP render")
  // useState definitions
  const [displayStr, setDisplayStr] = useState('cubic')
  const [strType, setStrType] = useState('simple')
  
  // Finding the structure data
  const str = findStrData(displayStr)
  const [atomSize, setAtomSize] = useState(0.5)
  // Defining parValues (After 'str')
  const [strParameters, setStrParameters] = useState(str.parameters)

  return (
    <div className="AppContainer">

      <h1>3D Visualizer</h1>

      <div className='CanvasContainer'>
        <div className='SelectSection'>

          {/* Structure Choice */}
          <div className='displayStr-container'>
            <label htmlFor="displayStr">Choose your lattice</label>
            <select className='displayStr' name="" id="displayStr" value={displayStr}
              onChange={(e) => {
                setDisplayStr(e.target.value)
                setStrParameters(() => {
                  const newStr = findStrData(e.target.value)
                  console.log(newStr.parameters)
                  return newStr.parameters
                })
                }}>

                {strData.map((str, index) => {
                  return <option key={index} value={str.name.toLowerCase()}>{str.name}</option>
                })}
              {/* <option value="cubic">Cubic</option>
              <option value="monoclinic">Monoclinic</option> */}
            </select>
          </div>


          {/* Lattice Type Choice */}
          {
            str.type &&

            <div className='strType-container'>
              <label htmlFor="strType">Choose the type</label>
              <select className='strType' name="" id="strType" value={strType}
                onChange={(e) => {
                  setStrType(e.target.value)
                  }}>
                  {
                    str.type.map((type, index) => {
                      return <option key={index} value={type.toLowerCase()}>{type}</option>
                    })
                  }
              </select>
            </div>
          }

          {/* Parameter Adjustment Form */}
          {
            str.parameters &&

            <div className='par-container'>
              <form action="">
                <div className="par-input">
                  <label htmlFor="atomSize">Atom Size</label>
                  <input type="number" min={1} id='atomSize' step={0.1} value={atomSize} 
                    onChange={(e) => {
                      setAtomSize(e.target.value)
                    }}/>
                </div>
                {
                  Object.keys(strParameters).map((parameter, index) => {
                    return (
                    <div className='par-input' key={index}>
                      <label htmlFor={`par-${parameter}`}>{parameter}</label>
                      <input type="number" min={1} id={`par-${parameter}`} value={strParameters[parameter]}
                        onChange={(e) => {
                          setStrParameters(strParameters => {

                            // updating strParameters
                            const updated = {...strParameters}
                            updated[parameter] = Number(e.target.value)
                            console.log(`updating par : ${updated.a}`)
                            return updated

                          })
                        }}/>
                    </div>)
                  })
                }
              </form>
            </div>
          }

            {/* <div>
              <h1>display parameter</h1>
              <p>{strParameters.a}</p>
            </div> */}

            <button className='resetButton' 
              onClick={() => setStrParameters(str.parameters)}>Reset</button>

        </div>
        <CanvasComp displayStr={displayStr}
                    strType={strType}
                    strParameters={strParameters}
                    atomSize={atomSize}
                    >
        </CanvasComp>

      </div>

    </div>
  );
}

export default App;
