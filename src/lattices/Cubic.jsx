
import { useState, useRef, useEffect } from 'react';


// function to get the vertices of the cube
function getVertices(cubeRef){

    const positions = cubeRef.current.geometry.attributes.position.array

    // Calculating vertice positions
    let cubeVertices = []
    let cubeVertexSet = new Set();
    for (let i = 0; i < positions.length; i += 3) {
        const vertex = `${positions[i]}, ${positions[i+1]}, ${positions[i+2]}`;
        cubeVertexSet.add(vertex)
    }

    // converting extracting vertices from string
    cubeVertices = Array.from(cubeVertexSet).map((vStr) => vStr.split(','))

    return cubeVertices
}



export default function Cubic({position, size, onSelect}) {

    const [isSelected, setIsSelected] = useState(false)
    const [cubeProps, setCubeProps] = useState({color : 'yellow'})

    const cubeRef = useRef()
    

    // Function to handle selection of Mesh
    const selectMesh = () => {

        // Changes the select-status
        setIsSelected(!isSelected)
        setCubeProps({color : !isSelected ? 'red' : 'yellow'})
        
        // Getting the vertices of the cube
        const cubeVertices = getVertices(cubeRef)

        // Higher level function to implement the changes
        onSelect({meshRef : cubeRef, isSelected : !isSelected, cubeVertices : cubeVertices})
    }


    // Rendering the Cubic mesh
    return (
        <mesh position = {position} ref = {cubeRef}
            onClick = {selectMesh}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color = {cubeProps.color}/>
        </mesh>
    )
}