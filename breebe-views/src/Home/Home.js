//== NPM imports
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local Components imports
import './Home.scss';
import authMw from '../util/auth';
import Title from '../Title/Title';
import Input from '../Input/Input';
import User from '../User/User';
import Tags from '../Tags/Tags';

// == SVGS
import breebepen from '../assets/breebepen.svg';
import breebescribble from '../assets/breebescribble.svg';
import breebeback from '../assets/breebeback.svg';

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
   const [editMode, setEditMode] = useState(false);
   const [editedBreebe, setEditedBreebe] = useState('');

   const setNewBreebe = (event) => {
       setBody(event.target.value);
   }

   const handleSubmitNew = (event) => {
        event.preventDefault();
        authMw(history);
        const newBreebe = {
            body: bodyBreebe,
            tag: null
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

   const handleEdit = (event) => {
        setEditedBreebe(event.target.value);
   }

   const refuseEdit = () => (
       <div>Ne me laissez pas vide</div>
   )

   const handleTag = (event) => {
       setTag(event.target.value);
   }

   const filterTags = (id) => {
        const filteredTag = breebes.filter((breebe) => breebe.breebeId === id);
        setBreebes(filteredTag);
   }

   const submitEdit = (event) => {
        authMw(history);
        event.preventDefault();
        const edited = {
            body: editedBreebe,
            tag: tagBreebe
        };
        const options = {
            url: `/breebe/${breebeId}`,
            method: 'put',
            data: edited
        }
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}`};
        axios(options)
             .then(() => window.location.reload())
             .catch((error) => setErrors(error))
       
   }

   const deleteBreebe = (breebe) => {
       authMw(history);
       const authToken = localStorage.getItem('AuthToken');
       axios.defaults.headers.common = {Authorization: `${authToken}`};
       let id = breebe.breebeId;
       axios.delete(`breebe/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                setErrors(error)
            })
   }
  return (
  <div>
      <Title />
        <User pseudo={pseudo} />
      <button type="button"className="log-out" onClick={logOut}>Me déconnecter</button>
      <button type="button"className="get-breebes" onClick={getBreebes}>Mes breebes</button>
    
    <form>
      <Input
      type="text"
      placeholder="une nouvelle breebe...|"
      onChange={setNewBreebe}
      value={bodyBreebe}
      />
        <button type="submit" onClick={handleSubmitNew} className="submit-breebe">''</button>
    </form>
   {breebes.length !== 0 && <Tags breebes={breebes} filterTags={filterTags}/>} 

    <div className="breebes">
      {breebes.length !== 0 && breebes.map((breebe, index) => (
                <div key={index} className="single-breebe">
                {editMode === false ? (
                    <div>
                     <div className="single-breebe--text">{breebe.body}</div>

                     <img src={breebepen} 
                     className="single-breebe--edit"
                     alt="edit breebe"
                     onClick={() => {
                         setEditMode(true);
                         setBreebeId(breebe.breebeId)
                        }}
                     />
                     <img src={breebescribble} 
                     className="single-breebe--delete"
                     alt="delete breebe"
                     onClick={() => deleteBreebe(breebe)}
                     />
                    </div>
                ) : (
                    <div>
                    <form className="single-breebe--form">
                    <input
                    className="single-breebe--input"
                    placeholder={breebe.body}
                    value={editedBreebe}
                    onChange={handleEdit}
                    />
                    <input
                     className="single-breebe--tag-edit"
                     placeholder="thème"
                     value={tagBreebe}
                     onChange={handleTag}
                     />
                    <img src={breebepen} 
                    className="single-breebe--edit"
                    alt="edit breebe"
                    onClick={ editedBreebe === '' ? refuseEdit : submitEdit}
                    />
                      <img src={breebeback}
                    className="single-breebe--back" 
                    onClick={() => setEditMode(false)} 
                    alt="go back"
                    />
                    </form>
                  
                   </div>
                  
                )
            }
                </div>
             
        
        
      ))}
      </div>
  </div>
  );
}

export default Home;