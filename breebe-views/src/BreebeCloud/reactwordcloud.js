import React, {useRef} from 'react';
import ReactWordcloud from 'react-wordcloud';
import {saveSvgAsPng} from 'save-svg-as-png';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const SimpleWordcloud = ({words}) => {
     const wordRef = useRef(null);

     const handleSave = () => {
          const svg = wordRef.current.querySelector('svg');
          console.log(svg)
          saveSvgAsPng(svg, 'brumulus.png');
     }
     const options = {
          colors: ["#ACC5A6", "#778899", "#E2A9BD"],
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
          <button type="button" className="get-breebes" onClick={handleSave}>Sauvegarder</button>
          </>)
     
   
}


export default SimpleWordcloud;