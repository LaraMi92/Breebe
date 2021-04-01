import './Brouvoir.scss';

const Brouvoir = ({breebe, word}) => (
  <span className="modal-main brouvoir">
   Et si vous ajoutiez à cette breebe :
    <p>{breebe}</p>
    Le mot
    <p>{word}</p>
    ?
    </span>
)

export default Brouvoir;