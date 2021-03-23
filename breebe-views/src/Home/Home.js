//== NPM imports
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './Home.scss';
import authMw from '../util/auth';
import Title from '../Title/Title';
import Input from '../Input/Input';
import User from '../User/User';

const Home = () => {
   const [AccountPage, setAccountPage] = useState(true);
   const [breebes, setBreebes] = useState([]);
   const [pseudo, setPseudo] = useState('');
   const [errors, setErrors] = useState([]);

   const history = useHistory();

   const logOut = (event) => {
       localStorage.removeItem('AuthToken');
        history.push('/login');
   }
   useEffect(() => {
       authMw(history);
       const authToken = localStorage.getItem('AuthToken');
       axios.defaults.headers.common = { Authorization: `${authToken}`};
       axios.get('/user')
            .then((response) => {
                setPseudo(response.data.userCredentials.pseudo);
            })
            .catch((error) => {
                if(error.response.status === 403){
                    history.push("/login")
                };
                setErrors(error);
            })
   })

   const getBreebes = () => {
    axios.get('/breebes')
    .then((response) => {
        setBreebes(response.data);
    })
    .catch((error) => {
        setErrors(error);
    })
   }
   
   const [breebeId, setBreebeId] = useState('');
   const [bodyBreebe, setBody] = useState('');
   const [tagBreebe, setTag] = useState('');

   const setNewBreebe = (event) => {
       setBody(event.target.value);
   }

   const handleSubmitNew = (event) => {
        event.preventDefault();
        authMw(history);
        const newBreebe = {
            body: bodyBreebe,
            tag: "default"
        };
        const options = {
            url: '/breebe',
            method: 'post',
            data: newBreebe
        };
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = {Authorization: `${authToken}`};
        axios(options)
            .then(()=> window.location.reload())
            .catch((error) => setErrors(error))
   }
  return (
  <div>
      <Title />
        <User pseudo={pseudo} />
      <button type="button" onClick={logOut}>Me déconnecter</button>
      <button type="button" onClick={getBreebes}>Mes breebes</button>
    
    <form>
      <Input
      type="text"
      placeholder="une nouvelle breebe...|"
      onChange={setNewBreebe}
      value={bodyBreebe}
      />
        <button type="submit" onClick={handleSubmitNew} className="submit-breebe">''</button>
    </form>
      {breebes.length !== 0 && breebes.map((breebe) => (
          <div className="single-breebe">{breebe}</div>
      ))}
  </div>
  );
}

export default Home;