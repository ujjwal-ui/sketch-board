"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./board.module.css";

export default function Board() {
    const canvasRef = useRef();
    const drawRef = useRef(false);
    let startPointX, startPointY;

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        context.strokeStyle = "#000";
        context.lineWidth = 4;
        context.linecap = "round";

        function handleMouseDown(e) {
            drawRef.current = true;
            const points = computerViewPoints(e);

            context.beginPath();
            context.moveTo(points.x, points.y);
        }

        function handleMouseMove(e) {
            if(!drawRef.current) return;
            const points = computerViewPoints(e);

            console.log(points.x, points.y);
            context.lineTo(points.x, points.y);
            context.stroke();
        }

        function handleMouseUp(e) {
            drawRef.current = false;
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
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
        
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("resize", handleCanvasResize);

        return () => {
            canvasRef.current.removeEventListener("mousedown", handleMouseDown);
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
            canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        }

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.box_1}>
                <h4>editing tools</h4>
            </div>

            <div className={styles.box_2}>
                <canvas className={styles.canvas} ref={canvasRef}></canvas>
            </div>
        </div>
    )
}