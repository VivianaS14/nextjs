import mongoose from "mongoose";

// Establecer conexión
/**
 * 0 = Disconnected
 * 1 = Connected
 * 2 = Connecting
 * 3 = Disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected === 1) {
    console.log("Estamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("Usando conexión anterior");
    }

    await disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConnected = 1;
  console.log("Conectado a MongoDB ...", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log("Desconectado de MongoDB");
};
