import styles from "./pencilBoard.module.css";
import pencils from "../../pencils";
import Image from "next/image";
import pencil from "../../public/pencil.svg";

export default function PencilBoard({currentPencilWidth, handlePencilSize}) {
    return (
        <div className={styles.pencilboard}>
        <button  id="pencil_1" style={{border: currentPencilWidth === pencils.pencil_1 ? "2px solid #000" : "none"}}>
             <Image id="pencil_1" onClick={(e) => handlePencilSize(e)} priority width={20} src={pencil} alt="error-loading"/>
        </button>
        <button onClick={(e) => handlePencilSize(e)} id="pencil_2" style={{border: currentPencilWidth === pencils.pencil_2 ? "2px solid #000" : "none"}}>
            <Image id="pencil_2" priority width={30} src={pencil} alt="error-loading"/>
        </button>
        <button onClick={(e) => handlePencilSize(e)} id="pencil_3" style={{border: currentPencilWidth === pencils.pencil_3 ? "2px solid #000" : "none"}}>
             <Image id="pencil_3" priority width={40} src={pencil} alt="error-loading"/>
        </button>
        <button onClick={(e) => handlePencilSize(e)} id="pencil_4" style={{border: currentPencilWidth === pencils.pencil_4 ? "2px solid #000" : "none"}}>
             <Image id="pencil_4" priority width={50} src={pencil} alt="error-loading"/>
        </button>
    </div>
    );
}