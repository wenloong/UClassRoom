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
    res.send("It's the UClassRoom API! :D");
});

io.on('connection', function (socket) {
    console.log("Main IO received socket.");

    socket.on('createsession', function (user, classroomCode, sessionCode) {
        createNewSession(user, classroomCode, sessionCode);
    });

    socket.on('endsession', function (user, classroomCode, sessionCode) {
        console.log(user + " ended a classroom session!");
        const sessionNamespace = sessionNamespaceMap.get(sessionCode);
        sessionNamespace.removeAllListeners();
        sessionNamespaceMap.delete(sessionCode);

        socket.emit('sessionended', classroomCode);
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
                } else {
                    currSession.slowDownVotes--;
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
        })
        .on('session join', function (user) {
            console.log(user + " joined the session!");

            currSession.userMap.set(user, 1); // Add to list of members attended
        })
        .on('session leave', function (user) {
            console.log(user + " left the session!");

            currSession.userMap.set(user, 2); // Update to show disconnected
        })
        .on('session resetvotes', function (user) {
            console.log(user + " reset the votes!");

            currSession.voteMap.clear();
            currSession.questionVotes = 0;
            currSession.slowDownVotes = 0;
        })
        .on('disconnect', function () {
            console.log("Namespace level disconnection.");
        });
    });

    sessionNamespaceMap.set(sessionCode, sessionNamespace);
    console.log(user + " created a new classroom session " + sessionCode + "!");
}