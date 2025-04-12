import { useState, useRef, useEffect, useMemo } from 'react';
import { LineLoop, MeshBasicMaterial } from 'three/src/Three.Core.js';
import * as THREE from 'three';

import { getVertices } from '../Utilities/utils'



// Rendering the Monoclinic 

export default function Monoclinic({selMesh, onSelect, parametersArray}){

  
  console.log("rendering monoclinic")
  
  // defining the reference
  const ref = useRef()

  // useState definintions
  const [isSelected, setIsSelected] = useState(false)

  // useMemo to reduce repeated calculations
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();

    const a = parametersArray[0]
    const b = parametersArray[1]
    const c = parametersArray[2]
    const beta = parametersArray[3]/180 * (Math.PI)

    // Define vertices
    const strVertices = new Float32Array([
        0, 0, 0,  // 0
        a, 0, 0,  // 1
        0, b, 0,  // 2
        a, b, 0,  // 3
        c * Math.cos(beta), 0, c * Math.sin(beta),  // 4
        c * Math.cos(beta), b, c * Math.sin(beta),  // 5
        a + c * Math.cos(beta), 0, c * Math.sin(beta),  // 6
        a + c * Math.cos(beta), b, c * Math.sin(beta)   // 7
    ]);

    // Define face indices
    const indices = new Uint16Array([
        // Bottom face
        0, 1, 4,  1, 6, 4,
        // Top face
        2, 3, 5,  3, 7, 5,
        // Front face
        0, 2, 4,  2, 5, 4,
        // Back face
        1, 3, 6,  3, 7, 6,
        // Left face
        0, 1, 2,  1, 3, 2,
        // Right face
        4, 5, 6,  5, 7, 6
    ]);


    geom.setAttribute('position', new THREE.BufferAttribute(strVertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    geom.computeVertexNormals(); // Ensure proper shading

    return geom;
  }, [parametersArray]);

  // Handle Selection of the Mesh
  const selectMesh = () => {
    console.log('Monoclinic Selected')

    const atomPositions = getVertices(ref)

    if(!isSelected){
      setIsSelected(true)
      
      onSelect({
        ...selMesh,
        meshRef : ref,
        isSelected : true,
        vertices : atomPositions
      })
    }

    else{
      onSelect({
        ...selMesh,
        vertices : atomPositions
      })
    }
  }

      // WHEN NOT USING CUSTOM HOOK
      useEffect(() => {
        if(isSelected){
    
            const updatedPositions = getVertices(selMesh.meshRef)
            
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
    }, [parametersArray])


    // using CUSTOM HOOK
    // useUpdateVertices(selMesh, strType, size, onSelect)


  return(
    <mesh geometry = {geometry} ref={ref}
    onClick = {selectMesh}>
        <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} metalness={0.3} roughness={0.8} opacity={0.7} transparent/>
        {/* <VertexPoints /> */}

              {/* Add edges */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial attach="material" color="black" />
      </lineSegments>
      </mesh>
    )
}