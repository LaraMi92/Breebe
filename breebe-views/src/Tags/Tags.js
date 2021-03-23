import './Tags.scss';

const Tags = ({breebes, filterTags}) => (
<div className="tags">
    {breebes.map((breebe) => breebe.tag !== null && (<div className="tags--tag" onClick={() => filterTags(breebe.breebeId)}>{breebe.tag}</div>))}
</div>
);

export default Tags;