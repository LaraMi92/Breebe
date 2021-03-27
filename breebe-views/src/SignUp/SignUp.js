//== NPM imports
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './SignUp.scss';
import Input from '../Input/Input';
import Title from '../Title/Title';
import breebecurved from '../assets/breebecurved.svg';

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
        <div className="svgs">
         <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text">
        <defs>
            <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
        </defs>
        <text fill="#E2A9BD" fontSize="30" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
        <textPath startOffset="0" xlinkHref="#txt-path">N’a de convictions que celui qui n’a rien approfondi</textPath>
        </text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text">
        <defs>
            <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
        </defs>
        <text fill="#E2A9BD" fontSize="20" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
        <textPath startOffset="0" xlinkHref="#txt-path">Dans un monde sans mélancolie, les rossignols se mettraient à roter</textPath>
        </text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text">
        <defs>
            <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
        </defs>
        <text fill="#E2A9BD" fontSize="20" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
        <textPath startOffset="0" xlinkHref="#txt-path">Se méfier des penseurs dont l'esprit ne fonctionne qu'à partir d'une citation</textPath>
        </text>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text">
        <defs>
            <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
        </defs>
        <text fill="#E2A9BD" fontSize="30" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
        <textPath startOffset="0" xlinkHref="#txt-path">Espérer, c’est démentir l’avenir</textPath>
        </text>
        </svg>
    </div>
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