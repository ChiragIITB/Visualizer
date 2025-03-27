import { useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { div } from "three/tsl";
import { getVertices } from "../Utilities/utils";


export default function Rhombohedral({onSelect, parametersArray}){

    console.log("rendering rhombohedral")
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
      const a = parametersArray[0]; // a = b = c
      const alpha = parametersArray[1]/180 * Math.PI; // α = β = γ (rhombohedral angle)
      
      // Define vertices (based on the rhombohedral skew)
      const strVertices = new Float32Array([
          0, 0, 0,   // 0: Origin
          a, 0, 0,   // 1: Along x-axis
          a * Math.cos(alpha), a * Math.sin(alpha), 0,   // 2: y-axis skewed by α
          a + (a * Math.cos(alpha)), a * Math.sin(alpha), 0,  // 3: xy-plane edge
          
          a * Math.cos(alpha), 0, a * Math.sin(alpha),   // 4: Along z-axis (skewed)
          a + (a * Math.cos(alpha)), 0, a * Math.sin(alpha), // 5
          a * Math.cos(alpha) + (a * Math.cos(alpha)), a * Math.sin(alpha), a * Math.sin(alpha),  // 6
          a + (a * Math.cos(alpha)) + (a * Math.cos(alpha)), a * Math.sin(alpha), a * Math.sin(alpha)  // 7
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
      console.log('rhombohedral Selected')
    
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