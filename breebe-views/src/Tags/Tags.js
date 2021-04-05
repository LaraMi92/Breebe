import './Tags.scss';

const Tags = ({breebes, filterTags, getBreebes}) => {
    const tags = breebes.filter(breebe => {
        if(breebe.tag !== null || breebe.tag !== ""){
         return breebe.tag;
        }
    }); 
    let tagsNotDuplicated = [];
    const removeDoubles = (array, key) => {
    return tagsNotDuplicated = [ ...new Map(array.map(item => [key(item), item])).values()];
    }
    removeDoubles(tags, item => item.tag);
    
    return( 
   <div className="tags"> 
       {/*  {breebes.map((breebe) => breebe.tag !== null && (<div className="tags--tag" key={breebe.breebeId} onClick={() => filterTags(breebe.breebeId)}>{breebe.tag}</div>))} */}
      {tagsNotDuplicated.map(breebe => (<div className="tags--tag" key={breebe.breebeId} onClick={() => filterTags(breebe.tag)}>{breebe.tag}</div>))}
        <div className="tags--tag all" onClick={getBreebes}>Tous</div>
    </div>)
};

export default Tags;