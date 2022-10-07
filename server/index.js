//
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require('socket.io');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//
const app = express();
//
require("dotenv").config();
const PORT = process.env.PORT;
//
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

//

const swaggerOptions={
  definition:{
    openapi: '3.0.0',
    info:{
      title:"Customer Api",
      description:"Customer API Information",
      contact:{
        name:"Amazing Developer"
      },
      servers:["http://localhost:5000"]
    }
  },
  apis:["./routes/messagesRoutes.js","./routes/userRoutes.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))

//
app.use(cors());
app.use(express.json());

//
app.use("/api/messages",messagesRoutes)
app.use("/api/auth",userRoutes)

//
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Db connection Successfull");
}).catch((err)=>{
    console.log(err.message);
});

//
const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

//
const io= socket(server,{
  cors:{
    origin:"http://localhost:3000",
    credentials:true
  }
})
global.onlineUsers = new Map();

io.on("connection",(socket)=>{
  console.log("socket",socket);
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);
  });

  socket.on("send-msg",(data)=>{
    console.log("data",data);
    const sendUserSocket=onlineUsers.get(data.to);
    console.log("sendUserSocket",sendUserSocket);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data.message)
    }
  })
})