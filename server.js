const express = require("express")();
const http = require("http").createServer(express);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080"
    }
});

let players = []

io.on("connection", (socket) => {
    console.log("A person connected: " + socket.id);

    socket.on("playerConnected", (room) => {
        players.push({
            id: socket.id,
            room: room
        })
        if(getPlayersInRoom(room).length === 1) {
            io.emit("isPlayerA");
        }
    })

    socket.on("dealCards", () => {
        io.emit("dealCards");
    })

    socket.on("optionPlayed", (option, isPlayerA) => {
        io.emit("optionPlayed", option, isPlayerA);
    })

    socket.on("disconnect", () => {
        console.log("A person disconnected: " + socket.id);
        players = players.filter(player => player.id !== socket.id);
    })
})

function getPlayersInRoom(room) {
    return players.filter(player => player.room === room);
}

http.listen(3000, () => {
    console.log("Server started!");
})