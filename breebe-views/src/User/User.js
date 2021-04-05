import './User.scss';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import breebeback from '../assets/breebeback.svg';

const User = ({pseudo, logOut}) => {
  const history = useHistory();
  const closeModal = (e) => {
    if(e.target.className ==='modal' || e.target.className === 'modal-main--back') {
        e.stopPropagation();
        
        history.push('/')
    }
}
  return(
  <div>
    <div className="modal" onClick={closeModal}>
    <div className="modal-user user--intro">
    Bonjour {pseudo},
    <p>Bienvenue dans votre espace Breebe. </p>
    <p className="bolder"> Une fois votre breebe écrite et soumise, vous pouvez y apposer un thème. </p>
     <p> Cela vous permettra de retrouver vos Breebes plus aisément.</p>
    <p className="bolder"> Vous voulez savoir quels sont les mots que vous utilisez le plus fréquemment ? </p>
      <p>Le Brumulus est là pour ça. </p><p>N'hésitez pas à le sauvegarder.</p>
    <p className="bolder"> Vous manquez d'inspiration ?</p><p> L'Abreeboir sélectionnera une de vos breebes pour la refaçonner.</p>
    <div className="user--intro--btns">
    <img src={breebeback} className='modal-main--back' alt="go back" onClick={closeModal} />
        <button className="user--logout" type="button" onClick={logOut}>déconnexion</button>
    </div>
    </div>
    </div>
    
    </div>
  
  )
}

export default User;