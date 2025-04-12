
import { useState, useRef, useEffect } from 'react';
import { useUpdateVertices } from '../Utilities/customHooks';
import { getVertices, fillAtomStates } from '../Utilities/utils';


export default function Cubic({strType, selMesh, position, size, onSelect}) {

    console.log('Rendering cube')


    // RENDER CHECK
    // const renderCount = useRef(0)
    // renderCount.current++
    // console.log(`CubeRender : ${renderCount.current}`)

    // defining reference
    const ref = useRef()

    // useState definitions
    const [isSelected, setIsSelected] = useState(false)
    const [cubeProps, setCubeProps] = useState({
        color : 'lightgreen',
        opacity : 0.9
    })

    
    // Function to handle selection of Mesh
    const selectMesh = () => {
        
        console.log('Cubic Selected')
        
        // Changes the select-status
        setCubeProps({
            ...cubeProps, 
            color : 'green', 
            opacity : 0.9
        })
        
        // Getting the vertices of the cube
        const atomPositions = getVertices(ref, strType)
        
        // Higher level function to implement the changes
        if(!isSelected){
            setIsSelected(true)
            
            onSelect({
                ...selMesh,
                meshRef : ref,
                isSelected : true, 
                vertices : atomPositions,
                atomStates : fillAtomStates(atomPositions)
            })
        }
        
        // REMOVE THE else PART WHEN MOTIF CODE WORKS
        else{
            onSelect({
                ...selMesh, 
                vertices : atomPositions
            })
        }
        
    }
    
    // Updating vertices on strParameter changes
    // console.log('calling getVertices')

    // WHEN NOT USING CUSTOM HOOK
    useEffect(() => {
        if(isSelected){
    
            const updatedPositions = getVertices(selMesh.meshRef, strType)
            
            // checking if there are new vertices 
            const isNewVertex = JSON.stringify(updatedPositions) === JSON.stringify(selMesh.vertices)
            if(!isNewVertex){
                console.log("updating vertices")
                onSelect({
                    ...selMesh,
                    vertices : updatedPositions
                })
            }
        }
    }, [size])


    // using CUSTOM HOOK
    // useUpdateVertices(selMesh, strType, size, onSelect)

    
    
    // Rendering the Cubic mesh
    return (
        <mesh position = {position} ref = {ref}
        onClick = {selectMesh}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color = {cubeProps.color} opacity={cubeProps.opacity} transparent/>
        </mesh>
    )
}