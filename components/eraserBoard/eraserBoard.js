import styles from "./eraserBoard.module.css";
import Image from "next/image";
import eraser from "../../public/eraser.svg";
import undo  from "../../public/undo.svg";
import redo from "../../public/redo.svg";

export default function EraserBoard({currentColor, handleEraser, undoChangesHandler, redoChangesHandler}) {
    return (
        <div className={styles.eraserboard}>
            <button style={{border: currentColor === "white" ? "2px solid #000" : "none"}} onClick={handleEraser}>
                <Image src={eraser} width={40} alt="error" priority />
            </button>
            <button onClick={undoChangesHandler} >
                <Image src={undo} width={40} alt="error" priority />
            </button>
            <button onClick={redoChangesHandler}>
                <Image src={redo} width={40} alt="error" priority />
            </button>
        </div>
    );
}