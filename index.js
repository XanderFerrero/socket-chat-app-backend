const express = require('express')
const http = require("http")
const app = express();
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

const io = require("socket.io")(server, {
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

const texts = []

io.on("connection", socket => {
    texts.push({username:"Bot",text:"user has entered the chat"})
    socket.emit("login")
    
    socket.emit("get-texts",texts)

    socket.on("post-text", data => {
        texts.push(data);
        texts.filter(text => text)
        console.log(texts)
        io.emit("get-texts",texts)
    })

    socket.on("disconnect", () => {
        console.log("BUY THE MILK")
        texts.push({username:"Bot",text:"user has left chat"})
        socket.emit("get-texts",texts)
    })
})



server.listen(3001, () => {
    console.log("server listening on")
})