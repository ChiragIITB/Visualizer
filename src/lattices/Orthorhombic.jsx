import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { getVertices, fillAtomStates } from "../Utilities/utils";


export default function Orthorhombic({selMesh, onSelect, parametersArray}){

    console.log("rendering orthorhombic")
    console.log(`updated parameters : ${parametersArray}`)
    const [isSelected, setIsSelected] = useState(false)
    const ref = useRef(null)
    
    const geometry = useMemo(() => {
      const geom = new THREE.BufferGeometry();
    
      // Defining parameters
      // const a = 2, b = 3, c = 4;
      // const beta = Math.PI / 4; // 45 degrees
    
      console.log(parametersArray)
      // Assigning paramaters
      const a = parametersArray[0]; // x-axis
      const b = parametersArray[1]; // y-axis
      const c = parametersArray[2]; // z-axis
      
      // Define vertices (8 corner points of the unit cell)
      const strVertices = new Float32Array([
          0, 0, 0,    // 0: Origin
          a, 0, 0,    // 1: Along x-axis
          0, b, 0,    // 2: Along y-axis
          a, b, 0,    // 3: xy-plane corner
      
          0, 0, c,    // 4: Along z-axis
          a, 0, c,    // 5: Top face
          0, b, c,    // 6: Top face
          a, b, c     // 7: Top face
      ]);
      
      // Define face indices (triangular faces)
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
      
    
    
    
      console.log('1')
      geom.setAttribute('position', new THREE.BufferAttribute(strVertices, 3));
      geom.setIndex(new THREE.BufferAttribute(indices, 1));
      geom.computeVertexNormals(); // Ensure proper shading
      console.log('2')
    
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