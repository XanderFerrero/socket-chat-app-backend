const express = require('express')
const http = require("http")
const app = express();
const cors = require("cors")
const path = require("path")

app.use(cors())

// app.use(express.static(path.join(__dirname,"/dist")))
// app.get("*",(req,res) => {
//     res.sendFile(path.resolve(__dirname,"dist","index.html"))
// })

const server = http.createServer(app)

const io = require("socket.io")(server, {
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

 
io.on("connection", socket => {
   socket.broadcast.emit("post-text",{username:"BOT",text:"USER HAS ENTERED CHAT"})
   
   socket.on("post-text", data => {
    io.emit("post-text", data)
   })

   socket.on("disconnect", data => {
    socket.broadcast.emit("post-text",{username:"BOT",text:`USER HAS LEFT CHAT`})
   })
})



server.listen(3001, () => {
    console.log("server listening on")
})