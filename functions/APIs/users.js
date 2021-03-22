const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators')

// LOGIN

exports.loginUser = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const { valid, errors } = validateLoginData(user);
    if(!valid) {
        return res.status(400).json(errors);
    }

    firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                return data.user.getIdToken();
            })
            .then((token) => {
                return res.json({token});
            })
            .catch((error) => {
                console.error(error);
                return res.status(403).json({general : 'Les identifiants sont incorrects'})
            })
}

// SIGN UP

exports.signUpUser = (req, res) => {
    const newUser = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password
    };

    const {valid, errors} = validateSignUpData(newUser);
    if (!valid) {
        return res.status(400).json(errors);
    }
    let token, userId;

    db.doc(`/users/${newUser.pseudo}`)
        .get()
        .then((doc) => {
            if(doc.exists){
                return res.status(400).json({pseudo: 'Ce pseudo existe déjà ! '})
            }
            return firebase.auth()
                            .createUserWithEmailAndPassword(
                                newUser.email,
                                newUser.password
                            )
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString(),
                pseudo: newUser.pseudo,
                userId
            }
            return db.doc(`/users/${newUser.pseudo}`)
                     .set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({token})
        })
        .catch((error) => {
            console.error(error);
            if(error.code === 'auth/email-already-in-use'){
                return res.status(400).json({email : 'Cet email existe déjà'});
            }
            return res.status(500).json({general: 'Oops, une erreur vient de se produire'})
        })
}

// GET USER DETAIL

exports.getUserDetail = (req, res) => {
    let userData = {};
    db.doc(`users/${req.user.pseudo}`)
      .get()
      .then((doc) => {
          if(doc.exists){
              userData.userCredentials = doc.data();
              return res.json(userData);
          }
      })
      .catch((error) => {
          console.error(error);
          return res.status(500).json({err: error.code})
      })
}

//EDIT USER DETAIL

exports.updateUserDetails = (req, res) => {
    let document = db.collection('users').doc(`${req.user.pseudo}`);
    document.update(req.body)
    .then(() => {
        return res.json({message : 'Le champ a été modifié' })
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).json({message : 'Le champ n\'a pas pu être édité'})
    })
}