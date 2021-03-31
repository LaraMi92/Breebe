import './Tags.scss';

const Tags = ({breebes, filterTags, getBreebes}) => (
    <div className="tags">
        {breebes.map((breebe) => breebe.tag !== null && (<div className="tags--tag" key={breebe.breebeId} onClick={() => filterTags(breebe.breebeId)}>{breebe.tag}</div>))}
        <div className="tags--tag all" onClick={getBreebes}>Tous</div>
    </div>
    );

export default Tags;