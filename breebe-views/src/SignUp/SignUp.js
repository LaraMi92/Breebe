//== NPM imports
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './SignUp.scss';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const handleEmail = (event) => {
       setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
     }
    
    const handlePseudo = (event) => {
        setPseudo(event.target.value)
    }

     const handleSubmit = (event) => {
         event.preventDefault();
         setLoader(true);
         const userData = {
             email: email,
             password: password,
             pseudo: pseudo
         };
         axios.post('/signup', userData)
               .then((response) => {
                   localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                   setLoader(false);
                   history.push('/');
               })
               .catch((error) => {
                   setErrors(error);
                   setLoader(false);
               })
     }
  return (
    <form onSubmit={handleSubmit}>
        <input
        type="email"
        onChange={handleEmail}
        placeholder="Email"
        />
        <input 
        type="text"
        onChange={handlePseudo}
        placeholder="Pseudo"
        />
        <input
        type="password"
        onChange={handlePassword}
        placeholder="Mot de passe"
        />
    <button type="submit"onClick={handleSubmit}>S'enregistrer</button>
    <a href="/login">Déjà un compte ?</a>
    </form>
  );
}

export default SignUp;