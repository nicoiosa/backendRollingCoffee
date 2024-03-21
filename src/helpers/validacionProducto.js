import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 40 })
    .withMessage("El nombre del producto debe tener entre 2 y 40 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio tiene que ser un valor numerico")
    .custom((value) => {
      if (value >= 100 && value <= 10000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre $100 y $10000");
      }
    }),
  check("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i)
    .withMessage(
      "La imagen debe tener el formato de una URL valida y deber terminar en png, jpg, jpeg, gif, svg"
    ),
  check("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn(["Infusiones", "Batidos", "Dulce", "Salado"])
    .withMessage(
      "La categoria debe ser una de las siguiente opciones: Infusiones, Batidos, Dulce o Salado"
    ),
  check("descripcionBreve")
    .notEmpty()
    .withMessage("La descripcion breve es un dato obligatorio")
    .isLength({ min: 10, max: 100 })
    .withMessage("La descripcion breve debe tener entre 10 y 100 caracteres"),
  check("descripcionAmplia")
    .notEmpty()
    .withMessage("La descripcion amplia es un dato obligatorio")
    .isLength({ min: 50, max: 1000 })
    .withMessage("La descripcion amplia debe tener entre 50 y 1000 caracteres"),
  (req, res, next) => resultadoValidacion(req, res, next),
];
export default validacionProducto;
