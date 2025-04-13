import { Canvas }  from '@react-three/fiber';
import { useState } from 'react';
import { OrbitControls, Hud } from '@react-three/drei';

import {v4 as uuidv4} from 'uuid'

// Css imports
import './CanvasComp.css'

// Component Imports
import Cubic from './lattices/Cubic'
import Monoclinic from './lattices/Monoclinic'
import Triclinic from './lattices/Triclinic'
import Tetragonal from './lattices/Tetragonal'
import Hexagonal from './lattices/Hexagonal'
import Orthorhombic from './lattices/Orthorhombic'
import Rhombohedral from './lattices/Rhombohedral'

// importing the utilities
import Motif from './Utilities/Motif';
import Ground from './Utilities/Ground';
import { Group } from 'three/examples/jsm/libs/tween.module.js';

// ------------------------------


// Rendering Canvas

function CanvasComp({displayStr, strType, strParameters, atomSize}){

    const [selMesh, setSelMesh] = useState({
        meshRef : null,
        isSelected : false, 
        vertices : [], 
        atomStates : []
    })

    console.log(selMesh.atomStates)

    const Structure = () => {

        switch (displayStr) {
            case 'cubic':
                const a = Object.values(strParameters)[0]
                let size = [a, a, a]
                return(
                    <Cubic strType = {strType} selMesh={selMesh} position = {[0, 0, 0]} size = {size} onSelect = {(obj) => setSelMesh(obj)}></Cubic>
                )

            case 'monoclinic':
                return(
                    <Monoclinic selMesh={selMesh} onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'triclinic':
                return(
                    <Triclinic selMesh={selMesh} onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'tetragonal':
                return(
                    <Tetragonal  selMesh={selMesh} onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'hexagonal':
                return(
                    <Hexagonal  selMesh={selMesh} onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'orthorhombic':
                return(
                    <Orthorhombic  selMesh={selMesh} onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'rhombohedral':
                return(
                    <Rhombohedral  selMesh={selMesh} onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )
        
            default:
                break;
            }
        }
        

    return(
        <Canvas className='CanvasComp'
            camera={{ position: [6, 6, 6], fov: 60 }}>

                


            {/* to display the structure */}
            {Structure()}


            {/* Rendering Atoms */}
            {selMesh.vertices.map((vertex, index) => {
                if(selMesh.isSelected){
                    return <Motif key={uuidv4()} size={atomSize} index={index} selMesh={selMesh} updateSelMesh={(obj)=>setSelMesh(obj)}/>
                }
                if(strType === 'body-centered'){
                    return <Motif key={uuidv4()} vertex = {[0,0,0]}/>
                }
            })}

            {/* Utilities */}
            <Hud>
                <axesHelper args = {[5]}/>
            </Hud>
            <directionalLight position = {[0,0,2]}/>
            <ambientLight position = {[0,0,2]} intensity = {0.5}/>
            <OrbitControls/>
            <Ground/>
        </Canvas>

    )
}

export default CanvasComp