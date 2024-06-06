// socketHandler.js
import { Server } from "socket.io";
import mpRepository from "../persistence/repositorys/mpRepository.js";

export default function initializeSocket(server) {
  console.log("inside initializeSocket");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("New client connected");
    console.log(`a user connected ${socket.id}`);
    const { email } = socket.handshake.query;

    console.log(email);

    try {
      const isValid = await mpRepository.findLinkByUserId(email);

      if (isValid) {
        socket.join(email);
        console.log(`Socket ${socket.id} joined room ${email}`);

        socket.on("register", (data) => {
          console.log("message received from client to server:", data);
          io.to(email).emit("update", {
            message: "desde el server, datos de update",
            data,
          });
        });

        socket.on("chat message", (msg) => {
          console.log(msg);
          io.emit("chat message", msg + "fdsfdsfdssdsddsdsdss");
        });

        const backendUpdate = "Pague";
        io.emit("backend update", backendUpdate);
      } else {
        console.log(`email no válido: ${email}`);
        socket.disconnect();
      }
    } catch (error) {
      console.log(`Error al validar el email: ${email}`, error);
      socket.disconnect();
    }

    socket.on("disconnect", (reason) => {
      console.log(`Cliente ${socket.id} desconectado: ${reason}`);
      if (email) {
        socket.leave(email);
      }
    });
  });

  return io;
}

async function isValidSuperUser(superUserId) {
  console.log("aa", superUserId);
  return true;
}
