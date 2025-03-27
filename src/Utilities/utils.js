


// To find the vertices in a structure

export function getVertices(ref, strType){

  const positions = ref.current.geometry.attributes.position.array

  console.log(positions)

  // Calculating vertice positions
  let Vertices = []
  let VertexSet = new Set();
  for (let i = 0; i < positions.length; i += 3) {
      const vertex = `${positions[i]}, ${positions[i+1]}, ${positions[i+2]}`;
      VertexSet.add(vertex)
  }

  // String vertices to 2D Array
  Vertices = Array.from(VertexSet).map((vStr) => vStr.split(','))

  console.log(Vertices)

  if(strType === 'body-centered'){
    console.log(getBodyCenter(Vertices))
  }

  return Vertices
}


export function getBodyCenter(vertices){
  let center = [0, 0, 0]

  vertices.forEach(vertex => {
    
    center = center.map((num, index) => num + Number(vertex[index]))
  });

  return center
}

// export function getFaceCenters(ref){

// }