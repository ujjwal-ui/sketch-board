"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./board.module.css";
import colorTemplate from "../../colors";
import Image from "next/image";
import pencil from "../../public/pencil.svg";
import pencils from "../../pencils";

export default function Board() {
    const canvasRef = useRef();
    const drawRef = useRef(false);
    const drawingData = useRef([]);
    const [currentColor, setCurrentColor] = useState("black");
    const [currentPencilWidth, setCurrentPencilWidth] = useState(2);
    const currentColorRef = useRef();
    const pencilWidth = useRef(2);


    useEffect(() => {
        console.log("use effect _1", currentColor);
        const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
        context.strokeStyle = currentColor;
        currentColorRef.current = currentColor;
        pencilWidth.current = currentPencilWidth;
        
    }, [currentColor, currentPencilWidth]);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        context.strokeStyle = currentColor;
        context.lineWidth = pencilWidth.current;
        context.linecap = "round";

        function handleMouseDown(e) {
            drawRef.current = true;
            const points = computerViewPoints(e);

            context.lineWidth = pencilWidth.current;
            context.strokeStyle = currentColorRef.current;
            context.beginPath();
            context.moveTo(points.x, points.y);
        }

        function handleMouseMove(e) {
            if(!drawRef.current) return;
            const points = computerViewPoints(e);
            
            context.lineWidth = pencilWidth.current;
            context.strokeStyle = currentColorRef.current;
            context.lineTo(points.x, points.y);
            context.stroke();
        }

        function handleMouseUp(e) {
            context.lineWidth = pencilWidth.current;
            context.strokeStyle = currentColorRef.current;
            drawRef.current = false;
            const drawing = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawingData.current.push(drawing);
        }

        function computerViewPoints(e) {
            const canvas = canvasRef.current;
            if(!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            return {x, y};
        }

        function handleCanvasResize() {
            context.strokeStyle = currentColorRef.current;
            setCurrentColor(currentColorRef.current);
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            context.lineWidth = pencilWidth.current;

            drawingData.current.forEach((data) => {
                context.putImageData(data, 0, 0);
            });
        }
        
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("resize", handleCanvasResize);

        return () => {
            canvasRef.current.removeEventListener("mousedown", handleMouseDown);
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
            canvasRef.current.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("resize", handleCanvasResize);
        }

    }, []);

    function handleColorChange(e) {
        const color = e?.target?.id;
        setCurrentColor(color);
    }

    function handlePencilSize(e) {
        const pencil = e?.target?.id;
        if(!pencil) return;

        if(pencil === "pencil_1") {
            pencilWidth.current = pencils.pencil_1;
        }else if(pencil === "pencil_2") {
            pencilWidth.current = pencils.pencil_2;
        }else if(pencil === "pencil_3") {
            pencilWidth.current = pencils.pencil_3;
        }else {
            pencilWidth.current = pencils.pencil_4;
        }
        setCurrentPencilWidth(pencils[pencil]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.box_1}>
                <h4>Color palette</h4>
                <div className={styles.colorboard}>
                    <div id="yellow" onClick={(e) => handleColorChange(e)} 
                    className={styles.colorbox} style={{backgroundColor: colorTemplate.yellow, border: currentColor === "yellow" ? "3px solid white" : "none"}}></div>
                    <div id="red" onClick={(e) => handleColorChange(e)} className={styles.colorbox} 
                    style={{backgroundColor: colorTemplate.red, border: currentColor === "red" ? "3px solid white" : "none"}}></div>
                    <div id="blue" onClick={(e) => handleColorChange(e)} className={styles.colorbox} 
                    style={{backgroundColor: colorTemplate.blue, border: currentColor === "blue" ? "3px solid white" : "none"}} ></div>
                    <div id="green" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.green, border: currentColor === "green" ? "3px solid white" : "none"}}></div>
                    <div id="pink" onClick={(e) => handleColorChange(e)} className={styles.colorbox} 
                    style={{backgroundColor: colorTemplate.pink, border: currentColor === "pink" ? "3px solid white" : "none"}}></div>
                    <div id="black" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.black, border: currentColor === "black" ? "3px solid white" : "none"}}></div>
                
                <div id="purple" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.purple, border: currentColor === "purple" ? "3px solid white" : "none"}}></div>
                     <div id="grey" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.grey, border: currentColor === "grey" ? "3px solid white" : "none"}}></div>
                     <div id="orange" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.orange, border: currentColor === "orange" ? "3px solid white" : "none"}}></div>

                <div id="brown" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.brown, border: currentColor === "brown" ? "3px solid white" : "none"}}></div>
                    <div id="cadetblue" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.cadetblue, border: currentColor === "cadetblue" ? "3px solid white" : "none"}}></div>
                    <div id="chocolate" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.chocolate, border: currentColor === "chocolate" ? "3px solid white" : "none"}}></div>
                    <div id="deepskyblue" onClick={(e) => handleColorChange(e)} className={styles.colorbox}
                     style={{backgroundColor: colorTemplate.deepskyblue, border: currentColor === "deepskyblue" ? "3px solid white" : "none"}}></div>
                </div>

                <div className={styles.pencilsHeadingContainer}>
                    <h4>Pencils</h4>
                </div>
                <div className={styles.pencilboard}>
                    <button  id="pencil_1" style={{border: pencilWidth.current === pencils.pencil_1 ? "3px solid #000" : "none"}}>
                         <Image id="pencil_1" onClick={(e) => handlePencilSize(e)} priority width={20} src={pencil} alt="error-loading"/>
                    </button>
                    <button onClick={(e) => handlePencilSize(e)} id="pencil_2" style={{border: pencilWidth.current === pencils.pencil_2 ? "3px solid #000" : "none"}}>
                        <Image id="pencil_2" priority width={30} src={pencil} alt="error-loading"/>
                    </button>
                    <button onClick={(e) => handlePencilSize(e)} id="pencil_3" style={{border: pencilWidth.current === pencils.pencil_3 ? "3px solid #000" : "none"}}>
                         <Image id="pencil_3" priority width={40} src={pencil} alt="error-loading"/>
                    </button>
                    <button onClick={(e) => handlePencilSize(e)} id="pencil_4" style={{border: pencilWidth.current === pencils.pencil_4 ? "3px solid #000" : "none"}}>
                         <Image id="pencil_4" priority width={50} src={pencil} alt="error-loading"/>
                    </button>
                </div>
            </div>

            <div className={styles.box_2}>
                <canvas className={styles.canvas} ref={canvasRef}></canvas>
            </div>
        </div>
    )
}