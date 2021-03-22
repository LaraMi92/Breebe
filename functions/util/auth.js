const { admin, db } = require('./admin');

module.exports = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('Pas de token');
        return res.status(403).json({error: 'Accès non autorisé'});
    }

    admin.auth()
         .verifyIdToken(idToken)
         .then((decodedToken) => {
             req.user = decodedToken;
             return db.collection('users').where('userId', '==', req.user.uid).limit(1).get();
         })
         .then((data)=> {
             req.user.pseudo = data.docs[0].data().pseudo;
             return next();
         })
         .catch((error) => {
             console.error('Erreur lors de la vérification du token');
             return res.status(403).json(error);
         })
}