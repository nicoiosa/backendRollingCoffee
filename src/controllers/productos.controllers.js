import Producto from "../database/models/producto.js";

export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "No se pudo obtener la lista de productos",
    });
  }
};
export const crearProducto = async (req, res) => {
  try {
    // extraer los datos del body
    const productoNuevo = new Producto(req.body);
    // perdirle a la BD guardar el producto nuevo
    await productoNuevo.save();
    // enviar la respuesta al front
    res.status(201).json({
      message: "El producto fue creado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "El producto no pudo ser dado de alta",
    });
  }
};
export const obtenerProducto = async (req, res) => {
  try {
    // extraer el parametro id
    console.log(req.params.id);
    // buscar el producto en la BD
    const productoBuscado = await Producto.findById(req.params.id);
    // responder con el producto
    res.status(200).json(productoBuscado);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: "No se encontro el producto buscado",
    });
  }
};
export const editarProducto = async (req, res) => {
  try {
    // extraer el id y los datos del producto a modificar del body
    // buscar si encontramos el producto con el id
    const productoBuscado = await Producto.findById(req.params.id);
    // enviar un mensaje de error en caso de no encontrar el producto
    if (!productoBuscado) {
      return res.status(404).json({
        message: "No se encontro el producto buscado",
      });
    }
    // editar el producto
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    // contestamos al front con un status 200
    res.status(200).json({ message: "El producto fue editado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocurrio un error al editar el producto",
    });
  }
};
export const borrarProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findById(req.params.id);
    if (!productoBuscado) {
      return res.status(404).json({
        message: "No se encontro el producto buscado",
      });
    }
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "El producto fue borrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocurrio un error al borrar el producto",
    });
  }
};
