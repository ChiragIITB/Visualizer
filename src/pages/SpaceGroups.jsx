
import { Canvas }  from '@react-three/fiber';
import { useState } from 'react';
import { OrbitControls, Hud } from '@react-three/drei'

// CSS imports
import './SpaceGroups.css'

// Component Imports
import Monoclinic from '../lattices/Monoclinic';
import Triclinic from '../lattices/Triclinic';

// importing Utilities
import Ground from '../Utilities/Ground'


export default function SpaceGroups(){

    const [selMesh, setSelMesh] = useState({
        meshRef : null,
        isSelected : false, 
        vertices : [], 
        atomStates : []
    })

    const onSelect = (obj) => {
        setSelMesh(obj)
    }

    const parametersArray = [2, 2, 3, 45]
    // const parametersArrayTric = [1, 2, 3, 60, 30, 45]

    return(
        <div className="SpaceGroups-Page">
            <div className="CanvasContainer">
                <Canvas className='SG-Canvas'>

                    <Monoclinic selMesh={selMesh} onSelect={onSelect} parametersArray={parametersArray}></Monoclinic>   
                    {/* <Triclinic selMesh={selMesh} onSelect={onSelect} parametersArray={parametersArrayTric}></Triclinic>                  */}



                    {/* Utilities */}
                    <Hud>
                        <axesHelper args = {[5]}/>
                    </Hud>
                    <directionalLight position = {[0,0,2]}/>
                    <ambientLight position = {[0,0,2]} intensity = {0.5}/>
                    <OrbitControls/>
                    <Ground/>
                </Canvas>
            </div>
        </div>
    )
}