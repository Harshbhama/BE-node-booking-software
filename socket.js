const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    console.log('A user is connected')
    socket.on("message", (message, roomName, userId) => {
        if(roomName.length){
            io.to(roomName).emit("message" ,message, roomName, userId)
        }else{
            io.emit("message", message, undefined, userId)
        }
        
        console.log(message, undefined , roomName);
    })
    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
    socket.on('joinedRoom', (roomName) => {
        console.log("Joined room: ", roomName)
        socket.join(roomName)
    })
    
    // console.log("Current room", socket.rooms)
})
console.log("Hello")