//== NPM imports
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './Login.scss';
import Title from '../Title/Title';
import Input from '../Input/Input';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const handleEmail = (event) => {
       setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
     }

     const handleSubmit = (event) => {
         event.preventDefault();
         setLoader(true);
         const userData = {
             email: email,
             password: password,
         };
         axios.post('/login', userData)
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
        placeholder="Email"
        onChange={handleEmail}
        />

        <Input
        type="password"
        placeholder="Mot de passe"
        onChange={handlePassword}
        />
    <button type="submit"onClick={handleSubmit}>Se connecter</button>
    </form>
    </div>
  );
}

export default Login;