"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./board.module.css";
import pencils from "../../pencils";
import ColorPalette from "../colorPalette/colorPalette";
import PencilBoard from "../pencilBoard/pencilBoard";
import EraserBoard from "../eraserBoard/eraserBoard";
import { socket } from "@/socket";

export default function Board() {
    const canvasRef = useRef();
    const drawRef = useRef(false);
    const drawingData = useRef([]);
    const drawingdataPointer = useRef(0);
    const [currentColor, setCurrentColor] = useState("black");
    const [currentPencilWidth, setCurrentPencilWidth] = useState(2);
    const currentColorRef = useRef();
    const pencilWidth = useRef(2);
    const eraserSelectedPencilColor = useRef("");


    useEffect(() => {
        const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
        context.strokeStyle = currentColor;
        currentColorRef.current = currentColor;
        pencilWidth.current = currentPencilWidth;
        context.lineWidth = currentPencilWidth;
        
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

            context.strokeStyle = currentColorRef.current;
            context.beginPath();
            context.moveTo(points.x, points.y);
            socket.emit("mousedown", {x: points.x, y: points.y});
        }

        function handleMouseMove(e) {
            if(!drawRef.current) return;
            const points = computerViewPoints(e);
            
            context.strokeStyle = currentColorRef.current;
            context.lineTo(points.x, points.y);
            context.stroke();
            socket.emit("mousemove", {x: points.x, y: points.y});
        }

        function handleMouseUp(e) {
            context.lineWidth = pencilWidth.current;
            context.strokeStyle = currentColorRef.current;
            drawRef.current = false;
            const drawing = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawingData.current.push(drawing);
            drawingdataPointer.current = drawingData.current.length - 1;
            
            const socketImageData = [];
            socketImageData.push(drawing);
            socket.emit("mouseup-event");
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
            if(drawingData.current.length === 0) return;

            socket.emit("canvas-resize");
            context.strokeStyle = currentColorRef.current;
            setCurrentColor(currentColorRef.current);
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            context.lineWidth = pencilWidth.current;

            drawingData.current.forEach((imageData) => context.putImageData(imageData, 0, 0));
        }

        function handleMouseDownSocket(coordinates) {
            context.lineWidth = pencilWidth.current;
            context.strokeStyle = currentColorRef.current;
            context.beginPath();
            context.moveTo(coordinates.x, coordinates.y);
        }

        function handleMouseMoveSocket(coordinates) {
            context.lineTo(coordinates.x, coordinates.y);
            context.stroke();
        }

        function handleMouseUpSocket() {
            const drawing = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawingData.current.push(drawing);
            drawingdataPointer.current = drawingData.current.length - 1;
        }

        function handlePencilChangedSocket(pencil) {
            if(currentColor === "black") // to remove the eraser if selected:
                setCurrentColor(eraserSelectedPencilColor.current);

            changePencilSize(pencil);
            setCurrentPencilWidth(pencils[pencil]);
        }

        function handleChangeColorSocket(color) {
            setCurrentColor(color);   
        }

        function handleEraserSocket() {
            eraserSelectedPencilColor.current = currentColorRef.current;
            setCurrentColor("white");
            setCurrentPencilWidth(10);
        }

        function handlerCanvasResizeSocket() {
            const recentDrawing = drawingData.current[drawingdataPointer.current];
            context.putImageData(recentDrawing, 0, 0);
        }

        function handleUndoChangesSocket() {
            console.log(drawingdataPointer.current);
            const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
            if(drawingdataPointer.current === 0)
                return context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
            if(drawingdataPointer.current > 0) 
                drawingdataPointer.current -= 1;
    
            const previousData = drawingData.current[drawingdataPointer.current];
            context.putImageData(previousData, 0, 0);
        }

        function handleRedoChangesSocket() {
            if(drawingData.current.length === 0) return;
            if(drawingdataPointer.current === drawingData.current.length) return drawingdataPointer.current -= 1;
    
            const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
            const latestData = drawingData.current[drawingdataPointer.current];
            context.putImageData(latestData, 0, 0);
            drawingdataPointer.current += 1;
        }
        
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("resize", handleCanvasResize);

        socket.on("mousedown", handleMouseDownSocket);
        socket.on("mousemove", handleMouseMoveSocket);
        socket.on("pencil-changed", handlePencilChangedSocket);
        socket.on("change-color", handleChangeColorSocket);
        socket.on("use-eraser", handleEraserSocket);
        socket.on("mouseup-event", handleMouseUpSocket);
        socket.on("canvas-resize", handlerCanvasResizeSocket);
        socket.on("undo-changes", handleUndoChangesSocket);
        socket.on("redo-changes", handleRedoChangesSocket);
        
        return () => {
            canvasRef.current.removeEventListener("mousedown", handleMouseDown);
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
            canvasRef.current.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("resize", handleCanvasResize);
            socket.off("mousedown", handleMouseDownSocket);
            socket.off("mousemove", handleMouseMoveSocket);
            socket.off("pencil-changed", handlePencilChangedSocket);
            socket.off("change-color", handleChangeColorSocket);
            socket.off("use-eraser", handleEraserSocket);
            socket.off("mouseup-event", handleMouseUpSocket);
            socket.off("canvas-resize", handlerCanvasResizeSocket);
            socket.off("undo-changes", handleUndoChangesSocket);
            socket.off("redo-changes", handleRedoChangesSocket);
        }

    }, []);

    function changePencilSize(pencil) {
        if(pencil === "pencil_1") {
            pencilWidth.current = pencils.pencil_1;
        }else if(pencil === "pencil_2") {
            pencilWidth.current = pencils.pencil_2;
        }else if(pencil === "pencil_3") {
            pencilWidth.current = pencils.pencil_3;
        }else {
            pencilWidth.current = pencils.pencil_4;
        }
    }

    function handleColorChange(e) {
        const color = e?.target?.id;
        socket.emit("change-color", color);
        setCurrentColor(color);
    }

    function handlePencilSize(e) {
        if(currentColor === "white") // to remove the eraser if selected:
            setCurrentColor(eraserSelectedPencilColor.current);

        const pencil = e?.target?.id || e;
        if(!pencil) return;

        changePencilSize(pencil);
        setCurrentPencilWidth(pencils[pencil]);
        socket.emit("pencil-changed", pencil);
    }

    function handleEraser() {
        eraserSelectedPencilColor.current = currentColorRef.current;
        socket.emit("use-eraser");

        setCurrentColor("white");
        setCurrentPencilWidth(10);
    }

    function undoChangesHandler() {    
        const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
        if(drawingdataPointer.current === 0) {
            socket.emit("undo-changes");
            return context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        if(drawingdataPointer.current > 0) 
            drawingdataPointer.current -= 1;

        const previousData = drawingData.current[drawingdataPointer.current];
        context.putImageData(previousData, 0, 0);
        socket.emit("undo-changes");
    }   

    function redoChangesHandler() {
        
        if(drawingData.current.length === 0) return;
        if(drawingdataPointer.current === drawingData.current.length) return drawingdataPointer.current -= 1;

        const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
        const latestData = drawingData.current[drawingdataPointer.current];
        context.putImageData(latestData, 0, 0);
        drawingdataPointer.current += 1;
        socket.emit("redo-changes");
    }

    return (
        <div className={styles.container}>
            <div className={styles.box_1}>
                <ColorPalette currentColor={currentColor} handleColorChange={handleColorChange} />
                <PencilBoard handlePencilSize={handlePencilSize} currentPencilWidth={currentPencilWidth} />
                <EraserBoard redoChangesHandler={redoChangesHandler} undoChangesHandler={undoChangesHandler} currentColor={currentColor} handleEraser={handleEraser}/>
            </div>

            <div className={styles.box_2}>
                <canvas className={styles.canvas} ref={canvasRef}></canvas>
            </div>
        </div>
    )
}
