import { useEffect } from "react"

import { getVertices } from "./utils"

export function useUpdateVertices(selMesh, strType, size, onSelect){
    useEffect(() => {
      if(selMesh.isSelected){
  
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
}