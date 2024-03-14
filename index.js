import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config"; // permite procesar variables de entorno
import path from "path";
import { fileURLToPath } from "url";
import ProductosRouter from "./src/routes/productos.routes.js";
import "./src/database/database.js";

// node --watch index.js (comando experimental para desarrollo;para run dev)

// 1- Confgurar un puerto
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.info("Estoy en el puerto " + app.get("port"));
});

// 2- Configurar middlewares
app.use(cors()); // permite conexiones/solicitudes remotas
app.use(morgan("dev")); // muestra informacion extra en la terminal
app.use(express.json()); // permite interpretar el formato json
app.use(express.urlencoded({ extended: true })); // permite interpretar los datos del body de un request
const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);
app.use(express.static(path.join(__direname, "public")));

// 3- Configuracion de las rutas
// app.get("/new", (req, res) => {
//   console.log("Hola mundo");
//   res.send("Desde el backend de RollingCoffee");
// });
app.use("/api", ProductosRouter);
