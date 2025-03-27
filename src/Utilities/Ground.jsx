
import { Grid } from '@react-three/drei';

// Setting up the ground
export default function Ground() {
    const gridConfig = {
      cellSize: 1,
      cellThickness: 0.5,
      cellColor: 'black',
      sectionSize: 3,
      sectionThickness: 1.5,
      sectionColor: 'gray',
      fadeDistance: 30,
      fadeStrength: 1,
      followCamera: false,
      infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}