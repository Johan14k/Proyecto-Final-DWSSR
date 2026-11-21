import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta definir MONGODB_URI en el archivo .env');
  }

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB conectado correctamente');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Error en la conexión de MongoDB:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB desconectado');
  });

  await mongoose.connect(uri);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}