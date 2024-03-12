import mongoose, { Schema, mongo } from "mongoose";

const productoEsquema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 40,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 100,
    max: 10000,
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: function (valor) {
        // validar el valor con un patron
        return /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(
          valor
        );
      },
      message: (props) => `${props.value} no es una url de imagen valida.`,
    },
  },
  categoria: {
    type: String,
    required: true,
  },
  descripcionBreve: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  descripcionAmplia: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 1000,
  },
});

// vamos a generar el modelo producto
const Producto = mongoose.model("producto", productoEsquema);

export default Producto;
