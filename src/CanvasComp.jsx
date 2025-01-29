import {Canvas, useThree, useFrame}  from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import { DirectionalLight } from 'three';
import { OrbitControls, Grid } from '@react-three/drei';

import {v4 as uuidv4} from 'uuid'

// Css imports
import './CanvasComp.css'


// Component Imports
import Cubic from './lattices/Cubic'
import Monoclinic from './lattices/Monoclinic'


function Ground() {
    const gridConfig = {
      cellSize: 1,
      cellThickness: 0.5,
      cellColor: 'black',
      sectionSize: 3,
      sectionThickness: 1.5,
      sectionColor: 'gray',
      fadeDistance: 30,
      fadeStrength: 1,
      followCamera: false,
      infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
  }


// ------------------------------
// Rendering the Canvas Component


function Motif({vertex}){
    
    console.log('Rendering')


    // Defining Atoms States
    const defAtomState = {
        isActive : false, 
        args : [0.1, 24, 24],
        color : 0x000000, 
        opacity : 0.5, 
        transparent : true,
        position : vertex
    }

    const hoverState = {
        color : 0x00ff00, 
        opacity : 1
    }

    const holdState = {
        color : 0xffff00, 
        opacity : 1
    }

    // Defining useState Variables

    const [timer, setTimer] = useState(null)
    const [atomState, setAtomState] = useState(defAtomState)

    // Defining Atom References
    const atomRef = useRef(null)


    // Defining the Handle Functions

    const handlePointerOver = () => {
        console.log('Pointer Over')
        document.body.style.cursor = "pointer"

        // Re-render will color only if color has not changed
        // this is to prevent issues with the onPointerOut event
        if(atomState.color !== hoverState.color){
            setAtomState({
                ...atomState, 
                color : hoverState.color
            })
        }
    }

    const handlePointerOut = () => {
        console.log('Pointer Out')
        document.body.style.cursor = "default"

        // 
        if(!atomState.isActive){
            setAtomState({
                ...atomState, 
                color : defAtomState.color, 
                opacity : defAtomState.opacity
            })
        }
    }

    const handlePointerDown = () => {

        // setting hold time to generate the atom
        console.log('Pointer Down')

        setAtomState({
            ...atomState,
            color : holdState.color, 
            opacity : holdState.opacity
        })

        // Creating a atom-hold timer
        const newTimer = setTimeout(() => {

            // Generating the atom
            // basically increasing the size of the atom
            setAtomState({
                ...atomState, 
                isActive : true,
                args : [0.7, 24, 24], 
                opacity : 1
            })
            document.body.style.cursor = 'default'
        }, 500);
        setTimer(newTimer);
    }

    const handlePointerUp = () => {
        console.log('Pointer Up')
        clearTimeout(timer);

        // Assuming the pointers is still hovering
        setAtomState({
            ...atomState, 
            color : hoverState.color, 
            opacity : hoverState.color
        })
    }


    return(
            <mesh className="Motif" key={uuidv4()} position = {vertex} ref = {atomRef}  
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <sphereGeometry args={atomState.args}/>
                <meshStandardMaterial 
                    color = {atomState.color} 
                    opacity = {atomState.opacity} 
                    transparent={atomState.transparent}/>
            </mesh>

    )
}

function CanvasComp({displayStr}){

    const [selMesh, setSelMesh] = useState({
        meshRef : null,
        isSelected : false, 
        cubeVertices : []
    })

    return(
        <Canvas className='CanvasComp'>
            <directionalLight position = {[0,0,2]}/>
            <ambientLight position = {[0,0,2]} intensity = {0.5}/>


            <Cubic position = {[0, 0, 0]} size = {[2, 2, 2]} onSelect = {(obj) => setSelMesh(obj)}></Cubic>
            {selMesh.cubeVertices.map((vertex, index) => {
                if(selMesh.isSelected){
                    return <Motif key={uuidv4()} vertex = {vertex}/>
                }
            })}

            {/* <Monoclinic/> */}

            
            <OrbitControls/>
            <Ground/>
        </Canvas>
    )
}

export default CanvasComp