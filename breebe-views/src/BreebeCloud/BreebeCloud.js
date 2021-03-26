import './BreebeCloud.scss';
import {useEffect, useRef, useLayoutEffect} from 'react';
import * as D3 from 'd3';
import d3 from './cloud';


const BreebeCloud = ({breebes}) => {
    

    const wordFreq = (string) => {
    
        let words = string.toString().replace(/[.]/g, '').split(/\s/);
        let freqMap = {};
        let arr = [];
        let final = [];
        words.forEach(function(w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        });
        console.log(freqMap);
        arr = Object.entries(freqMap);
       final.push(arr.map(el => ({text: el[0], value: el[1]})))
        return final;
    }
    
    const sizedWords = wordFreq(breebes.toString());
    console.log(sizedWords);

   //set graph dimensions
   const margin = {top: 10, right: 10, bottom: 10, left: 10};
   const width = 1000 - margin.left - margin.right;
   const height = 1000 - margin.top - margin.bottom;
    useEffect(() => {
    //append svg to page
    const svg = D3.select('.breebe-cloud')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', 'translate('+ margin.left + ',' + margin.top +")");
                    
    //take the output of layout above and draw words
    const draw = (words) => (
        svg.append('g')
            .attr('transform', `translate(${layout.size()[0]/2}, ${layout.size()[1]/2})`)
            .selectAll("text")
            .data(words)
        .enter().append('text')
            .style('font-size', d => d.size +'px')
            .attr('text-anchor', 'middle')
            .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
            .text(d => d.text)
    
    )
    
    //construct a cloud instance
    const layout = d3.cloud()
                      .size([width, height])
                      .words(Object.entries(sizedWords).map(d => {
                        return {text: d[0], size: d[1]}
                        }))
                      .padding(10)
                      .fontSize(d => d.size * 10)
                      .on('end', draw);
    layout.start();
   }, [height, width, margin])
   

    return(

        <div className="breebe-cloud">
            <svg
            width={width}
            height={height}>

            </svg>
        </div>
)
};

export default BreebeCloud;