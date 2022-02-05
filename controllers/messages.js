
const messagesSocket = (socket) => {
    socket.on('disconnect', () => {
        //
    });

    socket.on('send-message', ( payload, callback ) => {
        socket.broadcast.emit('send-message', payload);
        callback(123123123);
    });
};

module.exports = { messagesSocket }