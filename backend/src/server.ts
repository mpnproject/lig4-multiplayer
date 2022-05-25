import "reflect-metadata";
import * as http from "http";
import socketServer from "./socket";
import app from "./app";

const debug = require("debug")("socket.io-server-game:server");

const normalizePort = (numberPort: string) => {
  const port = parseInt(numberPort, 10);

  if (isNaN(port)) {
    return numberPort;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
 
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);

  console.log("Server Running on Port: ", port);
}

const port = normalizePort(process.env.PORT || "9000");

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const io = socketServer(server);
