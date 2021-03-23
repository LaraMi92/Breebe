//== NPM imports
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './SignUp.scss';
import Input from '../Input/Input';
import Title from '../Title/Title';

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
    <div>
        <Title />
    <form onSubmit={handleSubmit}>
        <Input
        type="email"
        onChange={handleEmail}
        placeholder="Email"
        value={email}
        />
        <Input
        type="text"
        onChange={handlePseudo}
        placeholder="Pseudo"
        value={pseudo}
        />
        <Input
        type="password"
        onChange={handlePassword}
        placeholder="Mot de passe"
        value={password}
        />
    <button type="submit"onClick={handleSubmit} className="submit">S'enregistrer</button>
    <div className="link"><a href="/login">J'ai un compte Breebe</a></div>
    </form>
    </div>
  );
}

export default SignUp;