import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const SimpleWordcloud = ({words}) => {
     const options = {
          colors: ["#ACC5A6", "#778899", "#E2A9BD"],
          enableTooltip: false,
          deterministic: false,
          fontFamily: "impact",
          fontSizes: [5, 60],
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
    
     <ReactWordcloud words={words} options={options}/>)
   
}


export default SimpleWordcloud;