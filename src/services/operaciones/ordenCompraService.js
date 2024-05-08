import ordenCompraRepository from "../../persistence/repositorys/operaciones/ordenCompraRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import ProductService from "../miempresa/ProductService.js";
import proveedorService from "../miempresa/proveedorService.js";
class ordenCompraService {
    async createOrdenCompra(data) {
        try {
            const id = idgenerate("orden-compra");
            return  ordenCompraRepository.createOrdenCompra({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getOrdenCompraById(id) {
        try {
            return ordenCompraRepository.findOrdenCompraById(id);
        } catch (error) {
            throw error;
        }
    }
    async getOrdenCompraByUserId(userId) {
        try {
            return ordenCompraRepository.findOrdenCompraallByuserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAllDataOrdenCompraByUserId(id) {
        try{
            const ordenes = await this.getOrdenCompraByUserId(id);
            const formattedOrdenes = [];

            for (const orden of ordenes) {
                const proveedor = await proveedorService.getProveedorById(orden.idProvedor);
                const itemproductosproveedor = await ordenCompraRepository.findProductosByProovedorId(proveedor.id)
                const productos = [];

                for (const producto of itemproductosproveedor){
                    let productillo = await ProductService.getProductById(producto.idProducto)

                    productos.push(productillo);
                }
                formattedOrdenes.push({ordenes: ordenes, proveedor : proveedor,productos : productos})
            }

        return formattedOrdenes;
        }catch(error){
            throw error;
        }
    }
    async updateOrdenCompra(id, updateData) {
        try {
            return ordenCompraRepository.updateOrdenCompra(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteOrdenCompra(id) {
        try {
            return ordenCompraRepository.deleteOrdenCompra(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ordenCompraService();