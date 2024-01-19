import styles from "./eraserBoard.module.css";
import Image from "next/image";
import eraser from "../../public/eraser.svg";

export default function EraserBoard({currentColor, handleEraser}) {
    return (
        <div className={styles.eraserboard}>
            <button style={{border: currentColor === "white" ? "2px solid #000" : "none"}} onClick={handleEraser}>
                <Image src={eraser} width={40} alt="error" priority />
            </button>
        </div>
    );
}