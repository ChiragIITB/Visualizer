
import { useState, useRef, useEffect } from 'react';
import { getVertices } from '../Utilities/utils';


export default function Cubic({strType, position, size, onSelect}) {

    console.log('Rendering cube')

    const [isSelected, setIsSelected] = useState(false)
    const [cubeProps, setCubeProps] = useState({color : 'yellow'})

    // Reference for the Cube
    const ref = useRef()

    
    
    // Function to handle selection of Mesh
    const selectMesh = () => {

        console.log('Cubic Selected')
        
        // Changes the select-status
        setCubeProps({color : 'red'})
        
        // Getting the vertices of the cube
        const atomPositions = getVertices(ref, strType)

        // Higher level function to implement the changes
        if(!isSelected){

            setIsSelected(true)
            
            onSelect({
              meshRef : null,
              isSelected : true, 
              vertices : atomPositions
            })
          }
    }


    // Rendering the Cubic mesh
    return (
        <mesh position = {position} ref = {ref}
            onClick = {selectMesh}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color = {cubeProps.color} opacity={0.5} transparent/>
        </mesh>
    )
}