import {Canvas, useThree, useFrame}  from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import { DirectionalLight } from 'three';
import { OrbitControls, Grid, Html } from '@react-three/drei';

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

// ------------------------------


// Rendering Canvas

function CanvasComp({displayStr, strType, strParameters}){

    const [selMesh, setSelMesh] = useState({
        meshRef : null,
        isSelected : false, 
        vertices : [], 
    })

    const trial = 2

    const Structure = () => {
        switch (displayStr) {
            case 'cubic':
                const a = Object.values(strParameters)[0]
                let size = [a, a, a]
                return(
                    <Cubic strType = {strType} position = {[0, 0, 0]} size = {size} onSelect = {(obj) => setSelMesh(obj)}></Cubic>
                )

            case 'monoclinic':
                return(
                    <Monoclinic  onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'triclinic':
                return(
                    <Triclinic  onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'tetragonal':
                return(
                    <Tetragonal  onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'hexagonal':
                return(
                    <Hexagonal  onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'orthorhombic':
                return(
                    <Orthorhombic  onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )

            case 'rhombohedral':
                return(
                    <Rhombohedral  onSelect = {(obj) => setSelMesh(obj)} parametersArray={Object.values(strParameters)} />
                )
        
            default:
                break;
        }
    }

    return(
        <Canvas className='CanvasComp'>

            {/* to display the structure */}
            {Structure()}


            {/* Rendering Atoms */}
            {selMesh.vertices.map((vertex, index) => {
                if(selMesh.isSelected){
                    return <Motif key={uuidv4()} vertex = {vertex}/>
                }
                if(strType === 'body-centered'){
                    console.log('hi')
                    return <Motif key={uuidv4()} vertex = {[0,0,0]}/>
                }
            })}

            {/* Utilities */}
            <directionalLight position = {[0,0,2]}/>
            <ambientLight position = {[0,0,2]} intensity = {0.5}/>
            <OrbitControls/>
            <Ground/>
        </Canvas>

    )
}

export default CanvasComp