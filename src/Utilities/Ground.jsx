
import { Grid } from '@react-three/drei';

// Setting up the ground
export default function Ground() {
    const gridConfig = {
      cellSize: 1,
      cellThickness: 0.5,
      cellColor: '#393E46',
      sectionSize: 3,
      sectionThickness: 0.8,
      sectionColor: '#393E46',
      fadeDistance: 40,
      fadeStrength: 1,
      followCamera: false,
      infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}