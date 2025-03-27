import { useState, useRef, useEffect, useMemo } from 'react';
import { LineLoop, MeshBasicMaterial } from 'three/src/Three.Core.js';
import * as THREE from 'three';

import { getVertices } from '../Utilities/utils'



// Rendering the Monoclinic 

export default function Monoclinic({onSelect, parametersArray}){

  console.log("rendering monoclinic")
  // console.log(`updated parameters : ${parametersArray}`)
  const [isSelected, setIsSelected] = useState(false)
  const ref = useRef(null)

  parametersArray.forEach(element => {
    console.log(typeof(element))
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();

    // Defining parameters
    // const a = 2, b = 3, c = 4;
    // const beta = Math.PI / 4; // 45 degrees

    // console.log(parametersArray)
    // Assigning paramaters
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

    console.log(typeof(a))
    console.log(c)
    console.log(Math.cos(beta))
    console.log(c * Math.cos(beta))
    console.log(typeof(a + (c * Math.cos(beta))))

    geom.setAttribute('position', new THREE.BufferAttribute(strVertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    geom.computeVertexNormals(); // Ensure proper shading

    return geom;
  }, [parametersArray]);


  const selectMesh = () => {
    console.log('Monclinic Selected')

    const atomPositions = getVertices(ref)

    if(!isSelected){

      setIsSelected(true)
      
      onSelect({
        meshRef : null,
        isSelected : true, 
        vertices : atomPositions
      })
    }
  }

  return(
    <mesh geometry = {geometry} ref={ref}
    onClick = {selectMesh}>
        <meshStandardMaterial color="blue" side={THREE.DoubleSide} metalness={0.3} roughness={0.8} />
        {/* <VertexPoints /> */}

              {/* Add edges */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial attach="material" color="black" />
      </lineSegments>
      </mesh>
    )
}