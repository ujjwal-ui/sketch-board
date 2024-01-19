import colorTemplate from "../../colors"
import styles from "./colorPalette.module.css";

export default function ColorPalette({currentColor, handleColorChange}) {
    return (
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
    )
}