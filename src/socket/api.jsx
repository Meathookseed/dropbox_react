import io from 'socket.io-client'

const socket =  io.connect('ws://localhost:5000',{
    transports:['websocket'],
    upgrade:false,
});

export {socket}