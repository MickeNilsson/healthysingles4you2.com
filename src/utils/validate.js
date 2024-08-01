const validate = {
    email: email
};

function email(email) {

    return email.match(/^\S+@\S+$/);
}

export default validate;