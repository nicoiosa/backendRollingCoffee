import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";
import validacionProducto from "../helpers/validacionProducto.js";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post([validacionProducto], crearProducto);
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put([validacionProducto], editarProducto)
  .delete(borrarProducto);

export default router;
