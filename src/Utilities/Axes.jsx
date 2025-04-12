import { useRef, useEffect } from 'react';
import { AxesHelper } from 'three';


export default function Axes(){

    const axesRef = useRef()
    const axesSize = 

    
    useEffect(() => {
        if(axesRef.current){
            axesRef.current.position
        }
    })


    return(
        <AxesHelper axesRef={axesRef} args={[axesSize]}/>
    )
}