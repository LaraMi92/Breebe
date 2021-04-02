const isEmpty = (string = '') => {
    if(string.trim() === ''){
        return true;
    }
    return false;
};

exports.validateLoginData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email = 'Ne doit pas être vide'
    }
    if(isEmpty(data.password)){
        errors.password = 'Ne doit pas être vide'
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)){
        return true;
    }
    return false;
}

exports.validateSignUpData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email = 'Ne doit pas être vide';
    }
    if(isEmpty(data.pseudo)){
        errors.pseudo = 'Ne doit pas être vide';
    }
    if(!isEmail(data.email)){
        errors.email = 'Veuillez rentrer une adresse valide';
    }
    if(isEmpty(data.password)){
        errors.password = 'Ne doit pas être vide'
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}