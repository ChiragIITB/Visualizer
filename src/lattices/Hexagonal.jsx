import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { getVertices, fillAtomStates } from "../Utilities/utils";


export default function Hexagonal({selMesh, onSelect, parametersArray}){

    console.log("rendering hexagonal")
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
      const a = parametersArray[0]
      const c = parametersArray[1] //height of the prism
      const beta = parametersArray[2]
      const gamma = parametersArray[3]
    
      // Define vertices

      // Hexagonal base coordinates
      const strVertices = new Float32Array([
          0, 0, 0,  // 0: Bottom center
          a, 0, 0,  // 1: Bottom right
          a / 2, (Math.sqrt(3) / 2) * a, 0,  // 2: Bottom top-right
          -a / 2, (Math.sqrt(3) / 2) * a, 0, // 3: Bottom top-left
          -a, 0, 0, // 4: Bottom left
          -a / 2, -(Math.sqrt(3) / 2) * a, 0, // 5: Bottom bottom-left
          a / 2, -(Math.sqrt(3) / 2) * a, 0,  // 6: Bottom bottom-right

          0, 0, c,  // 7: Top center
          a, 0, c,  // 8: Top right
          a / 2, (Math.sqrt(3) / 2) * a, c,  // 9: Top top-right
          -a / 2, (Math.sqrt(3) / 2) * a, c, // 10: Top top-left
          -a, 0, c, // 11: Top left
          -a / 2, -(Math.sqrt(3) / 2) * a, c, // 12: Top bottom-left
          a / 2, -(Math.sqrt(3) / 2) * a, c   // 13: Top bottom-right
      ]);

      // Define face indices (triangular faces)
      const indices = new Uint16Array([
          // Bottom hexagonal face
          0, 1, 2,  0, 2, 3,
          0, 3, 4,  0, 4, 5,
          0, 5, 6,  0, 6, 1,

          // Top hexagonal face
          7, 8, 9,  7, 9, 10,
          7, 10, 11,  7, 11, 12,
          7, 12, 13,  7, 13, 8,

          // Side faces (connecting bottom and top hexagons)
          1, 8, 9,  1, 9, 2,
          2, 9, 10, 2, 10, 3,
          3, 10, 11, 3, 11, 4,
          4, 11, 12, 4, 12, 5,
          5, 12, 13, 5, 13, 6,
          6, 13, 8, 6, 8, 1
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