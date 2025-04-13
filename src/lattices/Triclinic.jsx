import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

import { getVertices, fillAtomStates } from "../Utilities/utils";
import BasicMeshComp from "../Utilities/BasicMeshComp";


export default function Triclinic({selMesh, onSelect, parametersArray}){

  // defining reference
  const ref = useRef()

  // useState definitions
  const [isSelected, setIsSelected] = useState(false)
  
  // useMemo - to reduce computations
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
  
    // Assigning paramaters
    const a = parametersArray[0]
    const b = parametersArray[1]
    const c = parametersArray[2]
    const alpha = parametersArray[3]/180 * Math.PI
    const beta = parametersArray[4]/180 * Math.PI
    const gamma = parametersArray[5]/180 * Math.PI
  
    // Define vertices
    const strVertices = new Float32Array([
      0, 0, 0,  // 0: Origin
      a, 0, 0,  // 1: Along x-axis
      b * Math.cos(gamma), b * Math.sin(gamma), 0,  // 2: Along y-axis
      a + b * Math.cos(gamma), b * Math.sin(gamma), 0,  // 3: xy-plane corner
  
      c * Math.cos(beta), 
      c * (Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma), 
      c * Math.sqrt(1 - Math.cos(beta) ** 2 - ((Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma)) ** 2), // 4: Along z-axis
  
      a + c * Math.cos(beta), 
      c * (Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma), 
      c * Math.sqrt(1 - Math.cos(beta) ** 2 - ((Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma)) ** 2), // 5
  
      b * Math.cos(gamma) + c * Math.cos(beta), 
      b * Math.sin(gamma) + c * (Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma), 
      c * Math.sqrt(1 - Math.cos(beta) ** 2 - ((Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma)) ** 2), // 6
  
      a + b * Math.cos(gamma) + c * Math.cos(beta), 
      b * Math.sin(gamma) + c * (Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma), 
      c * Math.sqrt(1 - Math.cos(beta) ** 2 - ((Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma)) / Math.sin(gamma)) ** 2) // 7
  ]);
  
  
  const indices = new Uint16Array([
      // Bottom face
      0, 1, 2,  1, 3, 2,
      // Top face
      4, 5, 6,  5, 7, 6,
      // Front face
      0, 2, 4,  2, 6, 4,
      // Back face
      1, 3, 5,  3, 7, 5,
      // Left face
      0, 1, 4,  1, 5, 4,
      // Right face
      2, 3, 6,  3, 7, 6
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
        vertices : atomPositions,
        atomStates : fillAtomStates(atomPositions)
      })
    }

    else{
      onSelect({
        ...selMesh,
        vertices : atomPositions
      })
    }

    console.log(atomPositions)
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
    <mesh geometry={geometry} ref={ref} onClick={selectMesh}>
      <meshStandardMaterial
            color="lightgreen"
            side={THREE.DoubleSide}
            // metalness={0.3}
            // roughness={0.8}
            opacity={0.6}
            transparent
            />
          
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geometry]} />
          <lineBasicMaterial attach="material" color="green"/>
        </lineSegments>
    </mesh>

    // TO MAKE A COMMON MESH COMPONENT
    // <BasicMeshComp geometry={geometry} meshRef={ref} selectMesh={selectMesh}/>
    )
}