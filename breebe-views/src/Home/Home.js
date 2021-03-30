//== NPM imports
import {useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SimpleCloud from '../BreebeCloud/reactwordcloud';
import {saveSvgAsPng} from 'save-svg-as-png';

//== Local Components imports
import './Home.scss';
import authMw from '../util/auth';
import Title from '../Title/Title';
import Input from '../Input/Input';
import User from '../User/User';
import Tags from '../Tags/Tags';
import EmptyWarning from '../EmptyWarning/EmptyWarning';


// == SVGS
import breebepen from '../assets/breebepen.svg';
import breebescribble from '../assets/breebescribble.svg';
import breebeback from '../assets/breebeback.svg';
import Loader from '../assets/Loader.svg';

const Home = () => {
   
   const [breebes, setBreebes] = useState([]);
   const [pseudo, setPseudo] = useState('');
   const [errors, setErrors] = useState([]);
   const [error, setError] = useState('');
   const [breebeId, setBreebeId] = useState('');
   const [bodyBreebe, setBody] = useState('');
   const [tagBreebe, setTag] = useState('');
   const [editMode, setEditMode] = useState(false);
   const [editedBreebe, setEditedBreebe] = useState('');
   const [breebesTagFiltered, setBreebesTagFiltered] = useState([]);
   const [singleBreebe, setSingleBreebe] = useState({});
   const [empty, setEmpty] = useState(false);
   const [cloud, setCloud] = useState([]);
   const [loader, setLoader] = useState(true);
   const [words, showWords] = useState(false);

   const history = useHistory();

   const logOut = () => {
       localStorage.removeItem('AuthToken');
        history.push('/login');
   }
   useEffect(() => {
       authMw(history);
       
       const authToken = localStorage.getItem('AuthToken');
       axios.defaults.headers.common = { Authorization: `${authToken}`};
       setLoader(true);
       axios.get('/user')
            .then((response) => {
                setPseudo(response.data.userCredentials.pseudo);
            })
            .catch((error) => {
                if(error.response.status === 403){
                    history.push("/login")
                };
                setErrors(error)
            })
            .finally(() => setLoader(false))
   }, []);

 

   const getBreebes = () => {
    setLoader(true);
    axios.get('/breebes')
    .then((response) => {
        setBreebes(response.data);
    })
    .catch((error) => {
        setErrors(error)
    })
    .finally(() => {setLoader(false)})
   }

   const setNewBreebe = (event) => {
       setErrors('');
       setBody(event.target.value);
   }

   const setBreebesAgain = (breebes) => {
       setBreebes(breebes);
   }

   const handleSubmitNew = (event) => { 
       event.preventDefault();
    if(bodyBreebe.replace(/\s/g,"") === ""){
        setError('vous devez me remplir');
        return;
        }
        setError('');
        setLoader(true);
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
            /* .then(()=> window.location.reload()) */
            .then(() => getBreebes())
            .catch((error) => setErrors(error))
            .finally(() => {
                setLoader(false);
                setBody('')})
   }

   const handleEdit = (event) => {
        setEditedBreebe(event.target.value);
   }

   const refuseEdit = () => {
      setEmpty(true);
   }

   const handleTag = (event) => {
       setTag(event.target.value);
   }

   const filterTags = (id) => {
        const filteredTag = breebes.filter((breebe) => breebe.breebeId === id);
        setBreebes(filteredTag);
        // add filtered breebes + spread breebes [...] 
        //to setBreebes
        //then in tags section in render, pass the breebes[length - 1] to get all breebes
        //and breebes[0] for the filtered ones
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

   const closeModal = (e) => {
       if(e.target.className ==='modal') {
           e.stopPropagation();
           setEditMode(false);
           setEmpty(false);
       }
   }

   const prepareStats = () => {
    const wordFreq = (string) => {
    
        let words = string.toString().replace(/[.]/g, '').split(/\s/);
        let freqMap = {};
        let arr = [];
        let final = [];
        words.forEach(function(w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        });
        
        arr = Object.entries(freqMap);
       final.push(arr.map(el => ({text: el[0], value: el[1]*100})))
        return final;
    }
    const breebeWords = breebes.map(breebe => breebe.body);
    const cloud = wordFreq(breebeWords);
    setCloud(cloud);
     
   }

   const closeWordCloud = (e) => {
    if(e.target.className ==='modal') {
        e.stopPropagation();
       showWords(false);
    }
   }


  return (
  <div>
      <Title />
        <User pseudo={pseudo} logOut={logOut} />
        <button type="button"className="get-breebes" onClick={getBreebes}>Mes breebes</button>
        {breebes.length !== 0 && <button type="button"className="get-breebes" onClick={() => {
            setLoader(true);
            prepareStats();
            setLoader(false);
            showWords(true)}}>Brumulus</button>} 
        {console.log(cloud)}
        {words && <div className="modal" onClick={(event) => closeWordCloud(event)}>
            <div className="cloud">
                <SimpleCloud words={cloud[0]} />
            </div>
            </div>}

    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 425 200"  className="svg-text-sub">
        <defs>
            <path d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" id="txt-path"></path>
        </defs>
        <text fill="#E2A9BD" fontSize="30" fontFamily="Ramaraja" width="425" height="300" fontWeight="60">
        <textPath startOffset="0" xlinkHref="#txt-path">L'interminable est la spécialité des indécis</textPath>
        </text>
    </svg>
    {loader === true ? <div className="display"><img src={Loader} className="display--loader" alt="loader" /></div> : <div className="display--none"></div>}
    <form className="breebe-form">
      <Input
      type="text"
      placeholder="une nouvelle breebe...|"
      onChange={setNewBreebe}
      value={bodyBreebe}
      className="breebe-form--input"
      />
        <div className="error">{error !== "" && <EmptyWarning />}</div>
      <button type="submit" onClick={handleSubmitNew} className="breebe-form--submit">soumettre</button>
    </form>
   
    {breebes.length !== 0 && (
    <>
     <div className="tags--tag all" onClick={() => setBreebesAgain(breebes)}>Tous</div>
    <Tags breebes={breebes} filterTags={filterTags}/>
    </>)} 

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
                         setSingleBreebe(breebe)
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
                    <div className="modal" onClick={(event) => {
                        closeModal(event);
                        }}>
                    <form className="modal-main">
                    <label className="modal--title"><h3 className="modal--label"> Breebe : </h3> {empty ? <EmptyWarning /> : singleBreebe.body}
                    <input
                    className="single-breebe--input"
                    value={editedBreebe}
                    onChange={handleEdit}
                    />
                    </label>
                    <label className="modal--title"><h3 className="modal--label">Thème : </h3>{singleBreebe.tag}
                    <input
                     className="single-breebe--tag-edit"
                     value={tagBreebe}
                     onChange={handleTag}
                     />
                    </label>
                    <img src={breebepen} 
                    className="single-breebe--edit-pen"
                    alt="edit breebe"
                    onClick={editedBreebe === '' ? refuseEdit : submitEdit}
                    />
                      <img src={breebeback}
                    className="single-breebe--back" 
                    onClick={() => {
                        setEmpty(false);
                        setEditMode(false)}} 
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