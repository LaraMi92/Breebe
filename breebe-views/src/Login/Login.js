//== NPM imports
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './Login.scss';
import proxy from '../util/proxy';
import Title from '../Title/Title';
import Input from '../Input/Input';
import EmptyWarning from '../EmptyWarning/EmptyWarning';
import Loader from '../assets/Loader.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);
    const [empty, setEmpty] = useState(false);

    const history = useHistory();

    const handleEmail = (event) => {
        setEmpty(false);
       setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setEmpty(false);
        setPassword(event.target.value)
     }

     const handleSubmit = (event) => {
         setLoader(true);
         event.preventDefault();
         setLoader(true);
         const userData = {
             email: email,
             password: password,
         };
         axios.post(`${proxy}/login`, userData)
               .then((response) => {
                   localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                   setLoader(false);
                   history.push('/');
               })
               .catch((error) => {
                   setErrors(error);
                   setLoader(false);
               })
               .finally(() => setLoader(false))
     }

     const refuseSubmit = () => {
         setEmpty(true);
     }
  return (
      <div>
           <div className="svgs">
         <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text">
        <defs>
            <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
        </defs>
        <text fill="#E2A9BD" fontSize="20" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
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
        <text fill="#E2A9BD" fontSize="20" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
        <textPath startOffset="0" xlinkHref="#txt-path">Le tort de la philosophie est d'être trop supportable</textPath>
        </text>
        </svg>
    </div>
      <Title />
      <div className="intro">Pour écrire, synthétiser, expérimenter, recommencer, rater mieux.</div>
    <form onSubmit={handleSubmit}>
        <Input
        type="email"
        placeholder="Email"
        onChange={handleEmail}
        value={email}
        />

        <Input
        type="password"
        placeholder="Mot de passe"
        onChange={handlePassword}
        value={password}
        />
    {empty && <EmptyWarning />}
    {loader && <div className="display"><img src={Loader} className="display--loader" alt="loader" /></div>}
    {!email.includes('@') || password.length < 3 ? (<button type="button"className="submit--sign" onClick={refuseSubmit}>Se connecter </button>) : 
    (<button type="submit"className="submit--sign" onClick={handleSubmit}>Se connecter </button>)}
    <div className="link"><a href="/signup">Je n'ai pas de compte Breebe</a></div>
    </form>
    </div>
  );
}

export default Login;