
import { useState, useRef, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'

// ATOMS / MOTIFS 

export default function Motif({vertex}){
    
    // console.log('Rendering')


    // Defining Atoms States
    const defAtomState = {
        isActive : false,
        isSelected : false,
        args : [0.1, 24, 24],
        color : 0x000000, 
        opacity : 0.5, 
        transparent : true,
        position : vertex
    }

    const hoverState = {
        color : 0x00ff00, 
        opacity : 0.75
    }

    const holdState = {
        color : 0xffff00, 
        opacity : 0.75
    }

    // Defining useState Variables

    const [timer, setTimer] = useState(null)
    const [atomState, setAtomState] = useState(defAtomState)
    const [color, setColor] = useState("blue");

    // Defining Atom References
    const atomRef = useRef(null)


    // Defining the Handle Functions

    const handlePointerOver = () => {
        console.log('Pointer Over')
        document.body.style.cursor = "pointer"

        // Re-render will color only if color has not changed
        // this is to prevent issues with the onPointerOut event
        if(atomState.color !== hoverState.color){
            setAtomState({
                ...atomState, 
                color : hoverState.color
            })
        }
    }

    const handlePointerOut = () => {
        console.log('Pointer Out')
        document.body.style.cursor = "default"

        // 
        if(!atomState.isActive){
            setAtomState({
                ...atomState, 
                color : defAtomState.color, 
                opacity : defAtomState.opacity
            })
        }
    }

    const handlePointerDown = (event) => {

        // setting hold time to generate the atom
        console.log('Pointer Down')
        console.log(event.button)

        setAtomState({
            ...atomState,
            color : holdState.color, 
            opacity : holdState.opacity
        })

        // Creating a atom-hold timer
        const newTimer = setTimeout(() => {

            // Generating the atom
            // basically increasing the size of the atom
            setAtomState({
                ...atomState, 
                isActive : true,
                args : [0.7, 24, 24], 
                opacity : 0.8
            })
            document.body.style.cursor = 'default'
        }, 500);
        setTimer(newTimer);
    }

    const handlePointerUp = () => {
        console.log('Pointer Up')
        clearTimeout(timer);

        // Assuming the pointers is still hovering
        setAtomState({
            ...atomState, 
            isSelected : true,
            color : hoverState.color, 
            opacity : hoverState.color
        })
    }


    return(
        <>
            <mesh className="Motif" key={uuidv4()} position = {vertex} ref = {atomRef}  
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <sphereGeometry args={atomState.args}/>
                <meshStandardMaterial 
                    color = {atomState.color} 
                    opacity = {atomState.opacity} 
                    transparent={atomState.transparent}/>
            </mesh>

            {/* HTML Button inside Canvas */}
{/* 
            { atomState.isActive && atomState.isSelected && 

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