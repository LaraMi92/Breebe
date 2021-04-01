import './User.scss';
import {useState} from 'react';
import breebeback from '../assets/breebeback.svg';

const User = ({pseudo, logOut}) => {
  const [modal, setModal] = useState(false);
  const closeModal = (e) => {
    if(e.target.className ==='modal' || e.target.className === 'modal-main--back') {
        e.stopPropagation();
        setModal(false)
    }
}
  return(
  <div>
    <div className="user" onClick={() => setModal(true)}>
    {modal ? <div className="modal" onClick={closeModal}>
    <div className="modal-main user--intro">
    Bonjour {pseudo},
    <p>Bienvenue dans votre espace Breebe. </p>
    <p className="bolder"> Une fois votre breebe écrite et soumise, vous pouvez y apposer un thème. </p>
     <p> Cela vous permettra de retrouver vos Breebes plus aisément.</p>
    <p className="bolder"> Vous voulez savoir quels sont les mots que vous utilisez le plus fréquemment ? </p>
      <p>Le Brumulus est là pour ça. </p><p>N'hésitez pas à le sauvegarder.</p>
    <p className="bolder"> Vous manquez d'inspiration ?</p><p> L'Abreeboir sélectionnera une de vos breebes pour la refaçonner.</p>
    <img src={breebeback} className='modal-main--back' alt="go back" onClick={closeModal}/>
    </div>
    </div>
    
    :  
    <div className="user--name">{pseudo}</div>}
    </div>
    <div className="user--logout">
        <div onClick={logOut}>déconnexion</div>
    </div>
    </div>
  )
}

export default User;