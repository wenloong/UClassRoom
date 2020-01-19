'use strict';

const sessionMap = new Map();

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("Someone sent a socket...");

    socket.on('createsession', function (user, classroomcode, sessioncode) {
        createNew(user, classroomcode, sessioncode);
    });

    socket.on('endsession', function (user, classroomcode, sessioncode) {
        console.log(user + " ended a classroom session!");
        const sessionnamespace = sessionMap.get(sessioncode);
        sessionnamespace.remove(socket);
        sessionMap.delete(sessioncode);

        socket.emit('sessionended', {classroomcode: classroomcode});
    });

    socket.on('disconnect', function () {
        console.log("Main IO disconnection.");
    });
});

function createNew(user, classroomcode, sessioncode) {
    let sessionnamespace = io.of("/session-" + sessioncode).on('connection', function (socket) {
        console.log("Someone talked to session " + sessioncode);

        socket.on('session vote', function (user, choice) {
            console.log(user + " voted for some choice! (" + choice + ")");
        })
            .on('session join', function (user) {
                console.log(user + " joined the session!");
            })
            .on('session leave', function (user) {
                console.log(user + " left the session!");
            })
            .on('disconnect', function () {
                console.log("Namespace level disconnect");
            });
    });

    sessionMap.set(sessioncode, sessionnamespace);
    console.log(user + " created a new classroom session " + sessioncode + "!");
}