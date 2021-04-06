import './Brouvoir.scss';
import breebeback from '../assets/breebeback.svg';

const Brouvoir = ({breebe, word, closeBrouve}) => (
  <span className="modal-main brouvoir">
  <p className="brouvoir--space"> Et si vous ajoutiez à cette breebe :</p>
    <p className="bolder">{breebe}</p>
    <p className="brouvoir--space">Le mot</p>
    <p className="bolder">{word}</p>
    <p className="brouvoir--space"> ?</p>
    <img src={breebeback} alt='go back' className='modal-main--go-back' onClick={closeBrouve}/>
    </span>
)

export default Brouvoir;