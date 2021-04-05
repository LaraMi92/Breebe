import '../Tags/Tags.scss';

const Tags = ({breebes, appendTag}) => {
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

    const setClassName = (event, breebe) => {
      event.target.classList.toggle('--darker');
        if(event.target.className === "tags--tag --darker"){
         appendTag(breebe)
      } else {
        appendTag('');
      }
    }

   return( <div className="tags">
      {tagsNotDuplicated.map(breebe => (<div className="tags--tag" key={breebe.breebeId} onClick={(event) => {
          setClassName(event, breebe.tag)}}>
        {breebe.tag}</div>))}
    
    </div>)
};

export default Tags;