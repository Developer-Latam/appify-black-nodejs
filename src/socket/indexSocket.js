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

    console.log("email in initializeSocket:", email);
    socket.on("backend update", (update) => {
      console.log("update socket receiving from frontend:", update);
    });

    try {
      const isValid = await mpRepository.findLinkByUserId(email);
      console.log("isValid:", isValid);
      if (isValid) {
        socket.join(email);
        console.log(`Socket ${socket.id} joined room ${email}`);

        io.to(email).emit("backend update", "Pague");
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
