const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRoute");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8080;
const path = require("path");
const session = require('express-session');

const sess = {
    secret: '1sr19em0sa8sn  '
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(sess));
app.use("/api",apiRouter);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

io.on("connection",(socket)=>{
    console.log("a user connected");
    socket.on("disconnect",()=>{
        console.log('user disconnected');
    })
    socket.on("message send",(msg,nickname)=>{
        io.emit("message recieve",msg,nickname);
    })
    socket.on("username set",(nickname)=>{
        console.log(`${nickname} is connecting`)
        io.emit('user connected',nickname);
    })
})
http.listen(port,function(){
    console.log(`listening on port ${port}`);
})