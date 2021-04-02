import React, {useRef} from 'react';
import ReactWordcloud from 'react-wordcloud';
import {saveSvgAsPng} from 'save-svg-as-png';
import breebeback from '../assets/breebeback.svg';
import './BreebeCloud.scss';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const SimpleWordcloud = ({words, closeCloud}) => {
     const wordRef = useRef(null);

     const handleSave = () => {
          const svg = wordRef.current.querySelector('svg');
          console.log(svg)
          saveSvgAsPng(svg, 'brumulus.png');
     }
     const options = {
          colors: ["#ACC5A6", "#778899", "#000000"],
          enableTooltip: false,
          deterministic: false,
          fontFamily: "impact",
          fontSizes: [30, 60],
          fontStyle: "normal",
          fontWeight: "normal",
          padding: 1,
          rotations: 3,
          rotationAngles: [0, 90],
          scale: "sqrt",
          spiral: "archimedean",
          transitionDuration: 1000
        };
        return(
          <>
          <span ref={wordRef}>
          <ReactWordcloud words={words} options={options} />
          </span>
          <div className="cloud--buttons">
          <button type="button" className="get-breebes" onClick={handleSave}>Sauvegarder</button>
          <img src={breebeback} alt="go back" className="get-breebes go-back" onClick={closeCloud}/>
          </div>
          </>)
     
   
}


export default SimpleWordcloud;