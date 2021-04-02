//== NPM imports
import {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SimpleCloud from '../BreebeCloud/reactwordcloud';


//== Local Components imports
import './Home.scss';
import authMw from '../util/auth';
import Title from '../Title/Title';
import Input from '../Input/Input';
import User from '../User/User';
import Tags from '../Tags/Tags';
import EmptyWarning from '../EmptyWarning/EmptyWarning';
import Brouvoir from '../Brouvoir/Brouvoir';

//== Assets
import proxy from '../util/proxy';
import endings from '../assets/BrouvoirEndings';

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
   const [singleBreebe, setSingleBreebe] = useState({});
   const [empty, setEmpty] = useState(false);
   const [cloud, setCloud] = useState([]);
   const [loader, setLoader] = useState(true);
   const [words, showWords] = useState(false);
    const [brouvoir, showBrouvoir] = useState(false);
    const [brouve, setBrouve] = useState([]);

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
       axios.get(`${proxy}/user`)
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
    axios.get(`${proxy}/breebes`)
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
            url: `${proxy}/breebe`,
            method: 'post',
            data: newBreebe
        };
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = {Authorization: `${authToken}`};
        axios(options)
            
            .then(() => getBreebes())
            .catch((error) => setErrors(error))
            .finally(() => {
                setLoader(false);
                setBody('')})
   }

   const handleEdit = (event) => {
        setEmpty(false);
        setEditedBreebe(event.target.value);
   }

   const refuseEdit = () => {
      setEmpty(true);
   }

   const handleTag = (event) => {
       setEmpty(false);
       setTag(event.target.value);
   }

   const filterTags = (id) => {
        const filteredTag = breebes.filter((breebe) => breebe.breebeId === id);
        setBreebes(filteredTag);
   }

   const submitEdit = (event, singleBreebe) => {
        event.preventDefault();
        setLoader(true);
        authMw(history);
        let edited;
        if(tagBreebe.length !== 0 && editedBreebe.length !== 0){
            edited = {
                body: editedBreebe,
                tag: tagBreebe
            };
        } else if(editedBreebe.length === 0){
            edited = {
                tag: tagBreebe,
                body: singleBreebe.body
            };
        } else if(tagBreebe.length === 0){
            edited = {
                body: editedBreebe,
                tag: singleBreebe.tag
            }
        }
         
        const options = {
            url: `${proxy}/breebe/${breebeId}`,
            method: 'put',
            data: edited
        }
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}`};
        axios(options)
             .then(() => {
                 getBreebes();
                setEditMode(false);
                setTag('');
                setEditedBreebe('')})
             .catch((error) => setErrors(error))
             .finally(() => setLoader(false) )
       
   }

   const deleteBreebe = (event, breebe) => {
       event.preventDefault();
       setLoader(true);
       authMw(history);
       const authToken = localStorage.getItem('AuthToken');
       axios.defaults.headers.common = {Authorization: `${authToken}`};
       let id = breebe.breebeId;
       axios.delete(`${proxy}/breebe/${id}`)
            .then(() => {
                getBreebes();
            })
            .catch((error) => {
                setErrors(error)
            })
            .finally(() => setLoader(false))
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

   const prepareBrouvoir = () => {
    const toEndWith = endings[Math.floor(Math.random() * (endings.length - 1) + 1)];
    const allBodies = breebes.map(breebe => breebe.body);
    const body = allBodies[Math.floor(Math.random() * (allBodies.length - 1) + 1)]
    
    setBrouve([body, toEndWith]);
    }
   

   const closeWordCloud = (e) => {
    if(e.target.className ==='modal' || e.target.className === 'get-breebes go-back') {
        e.stopPropagation();
       showWords(false);
    }
   }

   const closeBrouvoir = (e) => {
    if(e.target.className ==='modal' || e.target.className === 'modal-main--go-back') {
        e.stopPropagation();
        showBrouvoir(false);
    }
   }


  return (
  <div>
      <Title />
        <User pseudo={pseudo} logOut={logOut} />
        
        <div className="all-buttons">
        <button type="button"className="get-breebes" onClick={getBreebes}>Mes breebes</button>
        {breebes.length !== 0 && 
        <>
        <button type="button"className="get-breebes" onClick={() => {
            setLoader(true);
            prepareStats();
            setLoader(false);
            showWords(true)}}>Brumulus</button>
        <button type="button" className="get-breebes" onClick={() => {
            setLoader(true);
            prepareBrouvoir();
            setLoader(false);
            showBrouvoir(true)
        }}>Abreeboir</button>   
       </>
            } 
        </div>
        {brouvoir && <div className="modal" onClick={(event) => closeBrouvoir(event)}><Brouvoir breebe={brouve[0]} word={brouve[1]} closeBrouve={closeBrouvoir}/></div>}
        {words && <div className="modal" onClick={(event) => closeWordCloud(event)}>
            <div className="cloud">
                <SimpleCloud words={cloud[0]} closeCloud={closeWordCloud}/>
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
    {loader && <div className="display"><img src={Loader} className="display--loader" alt="loader" /></div>}
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
    <Tags breebes={breebes} filterTags={filterTags} getBreebes={getBreebes} />
    )} 

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
                     onClick={(event) => deleteBreebe(event, breebe)}
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
                    <div className="single-breebe--edited-icons">
                    <img src={breebepen} 
                    className="single-breebe--edit-pen"
                    alt="edit breebe"
                    onClick={(event) => {
                        if(editedBreebe === '' && tagBreebe === ''){
                            refuseEdit()
                        } else{
                            submitEdit(event, singleBreebe)
                        } 
                    }}
                    />
                      <img src={breebeback}
                    className="single-breebe--back" 
                    onClick={() => {
                        setEmpty(false);
                        setEditMode(false)}} 
                    alt="go back"
                    />
                    </div>
                    </form>
                  
                   </div>
                )
            }
      </div>
  </div>
  );
}

export default Home;