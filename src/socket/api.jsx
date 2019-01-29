import io from 'socket.io-client'

const socket =  io.connect('ws://localhost:5000',{
    transports:['websocket'],
    upgrade:false,
});

function submitForm() {
    let frm = document.getElementsByName('reg_form')[0];
    frm.reset();
    return false;
}
export {socket, submitForm}