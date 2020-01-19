'use strict';

const sessionMap = new Map();
const sessionNamespaceMap = new Map();

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

class Session {
    constructor() {
        this.questionVotes = 0;
        this.slowDownVotes = 0;
        this.voteMap = new Map();
        this.userMap = new Map();
    }
}

server.listen(8080);

app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/index.html');
    res.send("It's the UClassRoom API/back-end! :D");
});

io.on('connection', function (socket) {
    console.log("Main IO received socket.");

    socket.on('session query', function (sessionCode) {
        console.log("A client queried the session code " + sessionCode);

        if (sessionMap.has(sessionCode)) {
            console.log("The session query for " + sessionCode + " was successful. Returning success socket.");
            socket.emit('success session query', sessionCode);
        } else {
            console.log("The session query for " + sessionCode + " failed. Returning failure socket.");
            socket.emit('failure session query', sessionCode);
        }
    });

    socket.on('createsession', function (user, classroomCode, sessionCode) {
        createNewSession(user, classroomCode, sessionCode);
        socket.emit('sessioncreated', user, classroomCode, sessionCode);
    });

    socket.on('endsession', function (user, classroomCode, sessionCode) {
        console.log(user + " ended a classroom session!");
        const sessionNamespace = sessionNamespaceMap.get(sessionCode);
        sessionNamespace.removeAllListeners();
        sessionNamespaceMap.delete(sessionCode);

        io.emit('sessionended', classroomCode, sessionCode);
        sessionMap.delete(sessionCode);
    });

    socket.on('disconnect', function () {
        console.log("Main IO disconnection.");
    });
});

function createNewSession(user, classroomCode, sessionCode) {
    let session = new Session(new Map());
    sessionMap.set(sessionCode, session);

    let sessionNamespace = io.of("/session-" + sessionCode).on('connection', function (socket) {
        console.log("Someone talked to namespace session " + sessionCode + ".");

        let currSession = sessionMap.get(sessionCode);

        socket.on('session vote', function (user, choice) {
            if (currSession.voteMap.has(user)) {
                if (currSession.voteMap.get(user) === 0) {
                    currSession.questionVotes--;
                    sessionNamespace.emit('removevote', user, 0);
                } else {
                    currSession.slowDownVotes--;
                    sessionNamespace.emit('removevote', user, 1);
                }
            }

            if (choice === 0) {
                console.log(user + " voted to have questions!");
                currSession.questionVotes++;
            } else {
                console.log(user + " voted for slowing down!");
                currSession.slowDownVotes++;
            }

            currSession.voteMap.set(user, choice);
            sessionNamespace.emit('vote', user, choice);
            socket.emit('success session vote', user, choice);
        })
        .on('session join', function (user) {
            console.log(user + " joined the session!");

            currSession.userMap.set(user, 1); // Add to list of members attended

            socket.emit('success session join', user);
        })
        .on('session leave', function (user) {
            console.log(user + " left the session!");

            currSession.userMap.set(user, 2); // Update to show disconnected

            socket.emit('success session leave', user);
        })
        .on('session resetvotes', function (user) {
            console.log(user + " reset the votes!");

            currSession.voteMap.clear();
            currSession.questionVotes = 0;
            currSession.slowDownVotes = 0;

            socket.emit('success session resetvotes', user);
            sessionNamespace.emit('resetvotes');
        })
        .on('disconnect', function () {
            console.log("Namespace level disconnection.");

            socket.emit('success disconnection');
        });
    });

    sessionNamespaceMap.set(sessionCode, sessionNamespace);
    console.log(user + " created a new classroom session " + sessionCode + "!");
}