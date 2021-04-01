import './Brouvoir.scss';
import breebeback from '../assets/breebeback.svg';

const Brouvoir = ({breebe, word, closeBrouve}) => (
  <span className="modal-main brouvoir">
   Et si vous ajoutiez à cette breebe :
    <p>{breebe}</p>
    Le mot
    <p>{word}</p>
    ?
    <img src={breebeback} alt='go back' className='modal-main--go-back' onClick={closeBrouve}/>
    </span>
)

export default Brouvoir;