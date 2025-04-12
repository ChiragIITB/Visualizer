
import { useState, useRef, useEffect } from 'react';
import { color } from 'three/tsl';
import {v4 as uuidv4} from 'uuid'

// ATOMS / MOTIFS 

export default function Motif({size, index, selMesh, updateSelMesh}){

    // Render Count of each motif
    const motifRenderCount = useRef(0)
    motifRenderCount.current++
    console.log(motifRenderCount.current)


    const atomState = selMesh.atomStates[index]
    if(atomState){
        console.log(`${index} : ${atomState}`)
    }

    // Defining Atoms States parameters
    const defAtomParameters = {
        isActive : false,
        isSelected : false,
        args : [0.1, 24, 24],
        color : 0x000000, 
        opacity : 0.5, 
        transparent : true,
        position : selMesh.vertices[index]
    }

    const activeState = {
        args : [size, 24, 24],
        color : 'yellow',
        opacity : 0.8,
    }

    const hoverState = {
        color : 'red', 
        opacity : 1
    }

    const holdState = {
        color : 'blue', 
        opacity : 0.8
    }


    // Defining useState Variables
    const [timer, setTimer] = useState(null)
    const [atomParams, setAtomParams] = useState(() => {
        if(atomState){
            // Active atom
            return({
                ...defAtomParameters,
                isActive : true,
                args : activeState.args,
                color : activeState.color,
                opacity : activeState.opacity
            })
        }

        else{
            return({
                ...defAtomParameters,
                isActive : false,
            })
        }
    })



    // Defining Atom References
    const atomRef = useRef(null)


    // Defining the Handle Functions
    
    // Hover-Start
    const handlePointerOver = () => {
        console.log('Pointer Over')
        document.body.style.cursor = "pointer"

        // Re-render will color only if color has not changed
        // this is to prevent issues with the onPointerOut event
        if(atomParams.color !== hoverState.color){
            setAtomParams({
                ...atomParams, 
                color : hoverState.color,
                opacity : hoverState.opacity
            })
        }
    }

    // Hover-End
    const handlePointerOut = () => {
        console.log('Pointer Out')
        document.body.style.cursor = "default"

        // if not activated
        // going to normal state
        if(atomParams.isActive){
            setAtomParams({
                ...atomParams, 
                color : activeState.color, 
                opacity : activeState.opacity
            })
        }
        else{
            setAtomParams({
                ...atomParams, 
                color : defAtomParameters.color, 
                opacity : defAtomParameters.opacity
            })
        }
    }

    // Hold-Start
    const handlePointerDown = (event) => {

        // setting hold time to generate the atom
        console.log('Pointer Down')
        console.log(event.button)

        // setting the Hold-State
        setAtomParams({
            ...atomParams,
            color : holdState.color,
            opacity : holdState.opacity
        })


        // Creating an atom-hold timer
        const newTimer = setTimeout(() => {

            // updated atomStates
            const newAtomStates = [
                ...selMesh.atomStates.slice(0, index),
                true,
                ...selMesh.atomStates.slice(index + 1)
            ]

            // udpated atomStates in selMesh
            updateSelMesh({
                ...selMesh,
                atomStates : newAtomStates
            })

            document.body.style.cursor = 'default'
        }, 500);

        // timer runs only if atom-not-active
        if(!atomParams.isActive){
            setTimer(newTimer);
        }
    }

    // Hold-End
    const handlePointerUp = () => {
        console.log('Pointer Up')
        clearTimeout(timer);

        // Assuming the pointers is still hovering
        setAtomParams({
            ...atomParams, 
            isSelected : true,
            color : hoverState.color, 
            opacity : hoverState.opacity
        })
    }


    return(
        <>
            <mesh className="Motif" key={uuidv4()} position = {defAtomParameters.position} ref = {atomRef}  
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <sphereGeometry args={atomParams.args}/>
                <meshStandardMaterial 
                    color = {atomParams.color} 
                    opacity = {atomParams.opacity} 
                    transparent={atomParams.transparent}/>
            </mesh>

            {/* HTML Button inside Canvas */}
{/* 
            { atomParams.isActive && atomParams.isSelected && 

            <Html position={[0, 0, 0]} center occlude>
            <button
                onClick={() => setColor(color === "blue" ? "red" : "blue")}
                style={{
                position: "absolute",
                top: "10px",
                right: "0px",
                height: "3rem", 
                width: "auto",
                padding: "1rem",
                fontSize: "14px",
                background: "white",
                border: "1px solid black",
                borderRadius: "0.5rem",
                cursor: "pointer",
                boxShadow: "10px 10px 20px black",
                opacity: "0.7"
                }}
            >
                Delete Atom 
            </button>
            </Html>
            } */}
        </>

    )
}