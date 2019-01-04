import io from 'socket.io-client'

const socket = io.connect('http://' + document.domain + ':5000',{
        query: {
            Bearer:`${localStorage.getItem('token')}`
        },
    }
);

function submitForm() {
    let frm = document.getElementsByName('reg_form')[0];
    frm.reset();
    return false;
}
export {socket, submitForm}