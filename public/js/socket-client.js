
const opcOn = document.querySelector('#opcOn');
const opcOff = document.querySelector('#opcOff');

const message = document.querySelector('#message');
const btnsend = document.querySelector('#btnsend');

const messagesList = document.querySelector('#messagesList');

const socket = io();



socket.on('connect', () => {
    opcOn.style.display = '';
    opcOff.style.display = 'none';
});

socket.on('disconnect', () => {
    opcOn.style.display = 'none';
    opcOff.style.display = '';
});

socket.on('send-message', (payload) => {
    messagesList.innerHTML = payload.message;
});

btnsend.addEventListener('click', () => {
    const payload = {
        user: 12345,
        message: message.value,
        date: new Date().getTime()
    }
    socket.emit('send-message', payload, (id) => {
        document.querySelector('#confirmList').innerHTML = 'Envio confirmado con '+id;
    });
})