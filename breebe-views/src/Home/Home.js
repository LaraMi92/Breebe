//== NPM imports
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local imports
import './Home.scss';
import authMw from '../util/auth';

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

   const handleChanges = (event) => {

   }
  return (
  <div>
      <button type="button" onClick={logOut}>Me déconnecter</button>
      <button type="button" onClick={getBreebes}>Mes breebes</button>

      {breebes.length !== 0 && breebes.map((breebe) => (
          <div className="single-breebe" onClick={handleChanges}>{breebe}</div>
      ))}
  </div>
  );
}

export default Home;