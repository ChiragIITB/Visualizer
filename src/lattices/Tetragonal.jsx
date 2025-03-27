import { useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { div } from "three/tsl";
import { getVertices } from "../Utilities/utils";


export default function Tetragonal({onSelect, parametersArray}){

    console.log("rendering tetragonal")
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
      const a = parametersArray[0]; // a = b
      const c = parametersArray[1]; // Unique c-axis
      
      // Define vertices (8 corner points of the unit cell)
      const strVertices = new Float32Array([
          0, 0, 0,    // 0: Origin
          a, 0, 0,    // 1: Along x-axis
          0, a, 0,    // 2: Along y-axis
          a, a, 0,    // 3: xy-plane corner
      
          0, 0, c,    // 4: Along z-axis
          a, 0, c,    // 5: Top face
          0, a, c,    // 6: Top face
          a, a, c     // 7: Top face
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
    
    
    const selectMesh = () => {
      console.log('Tetragonal Selected')
    
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