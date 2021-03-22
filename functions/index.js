

/**EXPRESS SERVER */
const app = require('express')();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

const functions = require("firebase-functions");
exports.api = functions.https.onRequest(app);
const auth = require('./util/auth');

/** CRUD ROUTES BREEBES */

// GET ALL BREEBES

const { getAllBreebes } = require('./APIs/breebes');
app.get('/breebes', auth, getAllBreebes);



// CREATE BREEBE

const { postOneBreebe } = require('./APIs/breebes');
app.post('/breebe', auth, postOneBreebe);

// DELETE BREEBE

const { deleteBreebe } = require('./APIs/breebes');
app.delete('/breebe/:breebeId', auth, deleteBreebe);

// EDIT BREEBE

const { editBreebe } = require('./APIs/breebes');
app.put('/breebe/:breebeId', auth, editBreebe);

/** CRUD USERS */

// LOGIN
const { loginUser } = require('./APIs/users');
app.post('/login', loginUser);

//SIGN UP
const { signUpUser } = require('./APIs/users')
app.post('/signup', signUpUser);

// GET USER DETAILS

const { getUserDetail } = require('./APIs/users');
app.get('/user', auth, getUserDetail);

// EDIT USER

const { updateUserDetails } = require('./APIs/users');
app.post('/user', auth, updateUserDetails);

