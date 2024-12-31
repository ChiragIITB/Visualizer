import {Canvas, useThree, useFrame}  from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import { div } from 'three/tsl';
import { DirectionalLight } from 'three';
import { OrbitControls, Grid } from '@react-three/drei';

// Css imports
import './CanvasComp.css'


function CubeComp({position, size, onSelect}) {

    const [isSelected, setIsSelected] = useState(false)
    const [cubeProps, setCubeProps] = useState({color : 'yellow'})

    const cubeRef = useRef()
    
    const selectMesh = () => {
        setIsSelected(!isSelected)
        setCubeProps({color : !isSelected ? 'red' : 'yellow'})
        const positions = cubeRef.current.geometry.attributes.position.array
        
        let cubeVertices = []
        let cubeVertexSet = new Set();
        for (let i = 0; i < positions.length; i += 3) {
            const vertex = `${positions[i]}, ${positions[i+1]}, ${positions[i+2]}`;
            cubeVertexSet.add(vertex)
        }
        
        cubeVertices = Array.from(cubeVertexSet).map((vStr) => vStr.split(','))

        onSelect({meshRef : cubeRef, isSelected : !isSelected, cubeVertices : cubeVertices})
    }
    

    return (
        <mesh position = {position} ref = {cubeRef}
            onClick = {selectMesh}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color = {cubeProps.color}/>
        </mesh>
    )
}


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


function Atoms({vertex}){

    return(
            <mesh position = {vertex}>
                <sphereGeometry args={[0.5, 24, 24]}/>
                <meshStandardMaterial color = {'black'}/>
            </mesh>

    )
}

function CanvasComp(){

    const [selMesh, setSelMesh] = useState({
        meshRef : null,
        isSelected : false, 
        cubeVertices : []
    })

    return(
        <Canvas className='CanvasComp'>
            <directionalLight position = {[0,0,2]}/>
            <ambientLight position = {[0,0,2]} intensity = {0.5}/>
            <CubeComp position = {[0, 0, 0]} size = {[2, 2, 2]} onSelect = {(obj) => setSelMesh(obj)}></CubeComp>
            {selMesh.cubeVertices.map((vertex) => {
                if(selMesh.isSelected){
                    return <Atoms vertex = {vertex}/>
                }
            })}
            <OrbitControls/>
            <Ground/>
        </Canvas>
    )
}

export default CanvasComp