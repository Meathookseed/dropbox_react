
const localhost = 'http://0.0.0.0:5000';

const Bearer = {Bearer:`${localStorage.getItem('token')}`};

function submitForm(name) {
    let frm = document.getElementsByName(name)[0];
    frm.reset();
    return false;
}

export {localhost, submitForm, Bearer}