import { useState, useRef, useEffect } from 'react';
import { LineLoop, MeshBasicMaterial } from 'three/src/Three.Core.js';



export default function Monoclinic(){

    let a = 2, b = 3, c = 5

    const vertices = [
        a, b, c,  // vertex 1
        0, b, c,  // vertex 2
        0, 0, c,  // vertex 3
        0, 0, 0,  // vertex 4
        a, 0, c,  // vertex 5 
        a, 0, 0,  // vertex 6
        a, b, 0,  // vertex 7 
        0, b, 0   // vertex 8
      ];

      const indices = [
        6, 7, 1, 1, 8, 6,
        1, 2, 4, 4, 3, 1, 
      ];
    return(
        <mesh>
            <polyhedronGeometry args={[vertices, indices, 1, 0]}/>
            <meshBasicMaterial color = {'blue'} />
        </mesh>
    )
}