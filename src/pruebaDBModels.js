import mongoose from 'mongoose';
const { Schema } = mongoose;

const AfiliadoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: String,
    edad: Number
  },
  {
    timestamps: true // permite crear un createdAt y un updatedAt
  }
);

export const Afiliado = mongoose.model('afiliados1', AfiliadoSchema); // afiliados1 es el nombre de la base de datos, si no existe se crea
