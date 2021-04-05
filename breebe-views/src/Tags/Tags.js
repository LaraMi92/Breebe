import './Tags.scss';

const Tags = ({breebes, filterTags, getBreebes}) => {
    const tags = breebes.filter(breebe => {
        if(breebe.tag !== null || breebe.tag !== ""){
         return breebe.tag;
        }
    });
    console.log(tags);
    const unique = Array.from(new Set(tags));
    console.log(unique);
   return( <div className="tags">
    
       {/*  {breebes.map((breebe) => breebe.tag !== null && (<div className="tags--tag" key={breebe.breebeId} onClick={() => filterTags(breebe.breebeId)}>{breebe.tag}</div>))} */}
      {unique.map(breebe => (<div className="tags--tag" key={breebe.breebeId} onClick={() => filterTags(breebe.breebeId)}>{breebe.tag}</div>))}
        <div className="tags--tag all" onClick={getBreebes}>Tous</div>
    </div>)
};

export default Tags;