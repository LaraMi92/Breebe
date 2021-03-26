//== NPM imports
import {useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//== Local Components imports
import './Home.scss';
import authMw from '../util/auth';
import Title from '../Title/Title';
import Input from '../Input/Input';
import User from '../User/User';
import Tags from '../Tags/Tags';
import quotes from '../assets/quotes';

// == SVGS
import breebepen from '../assets/breebepen.svg';
import breebescribble from '../assets/breebescribble.svg';
import breebeback from '../assets/breebeback.svg';
import breebecurved from '../assets/breebecurved.svg';

const Home = () => {
   const [AccountPage, setAccountPage] = useState(true);
   const [breebes, setBreebes] = useState([]);
   const [pseudo, setPseudo] = useState('');
   const [errors, setErrors] = useState([]);
   const [breebeId, setBreebeId] = useState('');
   const [bodyBreebe, setBody] = useState('');
   const [tagBreebe, setTag] = useState('');
   const [editMode, setEditMode] = useState(false);
   const [editedBreebe, setEditedBreebe] = useState('');
   const [breebesTagFiltered, setBreebesTagFiltered] = useState([]);
   const [placeholderEdit, setPlaceholderEdit] = useState('');

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
        <User pseudo={pseudo} onClick={logOut} />
     
      <button type="button"className="get-breebes" onClick={getBreebes}>Mes breebes</button>

      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text">
  <defs>
   
    <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
  </defs>

  <text fill="#E2A9BD" fontSize="30" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
    <textPath startOffset="0" xlinkHref="#txt-path">L'interminable est la spécialité des indécis</textPath>
  </text>
</svg>
            
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
                
                    <div>
                     <div className="single-breebe--text">{breebe.body}</div>
                    <div className="single-breebe--icons">
                     <img src={breebepen} 
                     className="single-breebe--edit"
                     alt="edit breebe"
                     onClick={() => {
                         setEditMode(true);
                         setBreebeId(breebe.breebeId)
                         setPlaceholderEdit(breebe.body)
                        }}
                     />
                     <img src={breebescribble} 
                     className="single-breebe--delete"
                     alt="delete breebe"
                     onClick={() => deleteBreebe(breebe)}
                     />
                     </div>
                    </div>
                </div>
      ))}
      {editMode && (
                    <div className="modal" >
                    <form className="modal-main">
                    <input
                    className="single-breebe--input"
                   placeholder={placeholderEdit}
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
                    className="single-breebe--edit-pen"
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
  </div>
  );
}

export default Home;