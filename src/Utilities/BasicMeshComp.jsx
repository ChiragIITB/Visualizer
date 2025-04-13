import * as THREE from 'three';
import React from 'react';

// ===============
// TO BE USED ....
// ===============

const BasicMeshComp = React.forwardRef(({ geometry, selectMesh }, meshRef) => {

  return (
    <mesh geometry={geometry} ref={meshRef} onClick={selectMesh}>
      <meshStandardMaterial
        color="lightgreen"
        side={THREE.DoubleSide}
        metalness={0.3}
        roughness={0.8}
        opacity={0.7}
        transparent
      />
      
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial attach="material" color="black" />
      </lineSegments>
    </mesh>
  );
});

export default BasicMeshComp;
