const { setOnlineOfflineUserDb } = require("./chatService/db/chatDb");
const io = require("socket.io")(8001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    console.log('A user is connected')
    socket.on("connected_user", async (userId) => {
        // io.emit('User is online with userId', userId)
        console.log('User is online with userId', userId)
        if(userId) await setOnlineOfflineUserDb(userId, true)
        io.emit("online_users", userId)
        
    })
    socket.on("disconnected_user", async (userId) => {
        console.log("User disconnected with ID", userId)
        if(userId) await setOnlineOfflineUserDb(userId, false)
        io.emit("disconnected_user_id", userId);

    })
    socket.on("disconnect", () => {
        // console.log("disconneced socket", socket);
    })
    socket.on('joinedRoom', (roomName) => {
        console.log("Joined room: ", roomName)
        socket.join(roomName)
    })
    
    // console.log("Current room", socket.rooms)
})
console.log("Hello")