
const { db } = require('../util/admin');

//GET ALL (/breebes)

exports.getAllBreebes = (req, res) => {
    db.collection('breebes')
        .where('pseudo', '==', req.user.pseudo)
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let breebes = [];
            data.forEach((document) => {
                breebes.push({
                    breebeId: document.id,
                    body: document.data().body,
                    tag: document.data().tag,
                    createdAt: document.data().createdAt,
                });
            });
            return res.json(breebes);
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({error : error.code})
        });
}

//POST (/breebe)

exports.postOneBreebe = (req, res) => {
    if (req.body.body.trim() === ''){
        return res.status(400).json({body : 'Ne peut pas être vide !'})
    }
    const newBreebe = {
        body: req.body.body,
        tag: req.body.tag,
        createdAt: new Date().toISOString(),
        pseudo: req.user.pseudo
    }
    db.collection('breebes')
        .add(newBreebe)
        .then((document)=> {
            const responseBreebe = newBreebe;
            responseBreebe.id = document.id;
            return res.json(responseBreebe);
        })
        .catch((error) => {
            res.status(500).json({err : 'Oops, nous n\'avons pas pu poster votre breebe'});
            console.error(error);
        })
}

// DELETE (/breebe:breebeId)

exports.deleteBreebe = (req, res) => {
    const document = db.doc(`/breebes/${req.params.breebeId}`);
    document.get()
            .then((doc) => {
                if(!doc.exists){
                    return res.status(404).json({error: 'Breebe non trouvée'})
                }
                return document.delete();
            })
            .then(() => {
                res.json({message: 'Breebe supprimée'})
            })
            .catch((error) => {
                console.error(error);
                return res.status(500).json({err: error.code})
            })
}

// EDIT (/breebe/:breebeId)

exports.editBreebe = (req, res) => {

    if(req.body.breebeId || req.body.createdAt){
        res.status(403).json({message: 'Oops, ce n\'est pas modifiable'});
    }

    let document = db.collection('breebes').doc(`${req.params.breebeId}`);
    document.update(req.body)
            .then(() => {
                res.json({message : 'Breebe modifiée !'})})
            .catch((error) => {
                console.error(error);
                return res.status(500).json({ err : error.code})
            })
}