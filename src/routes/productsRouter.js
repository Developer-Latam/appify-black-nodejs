import { Router } from 'express';
import { idgenerate } from '../utils/idGenerate.js';
import { PrismaClient } from '@prisma/client';

const router = Router();

const prisma = new PrismaClient()


//Ruta para crear un producto
router.post('/product', async(req,res)=>{
    try{
        const { user,nombre,precio,imagen,iva,activo,codigo,codigo_barra, unidad,costo, extension_impuesto,extension_valor, disponibilidad, manejo_stock, minimo_stock, maximo_stock, unidad_medida, unidad_de_compra, nota } = req.body;
        
        const id = idgenerate("product")

        await prisma.productos.create({
        data:{
            id:id,
            user,
            nombre,
            precio,
            imagen: imagen,
            iva,
            activo,
            codigo,
            codigo_barra,
            costo,
            extension_impuesto,
            extension_valor,
            disponibilidad,
            manejo_stock,
            minimo_stock,
            maximo_stock, //string
            unidad_medida,
            unidad_de_compra, //int
            notas: nota
        }
        })
        console.log('creado')
        
        return res.status(200).json({ok:true,message:'producto creado!'})
    }catch(err){
        return res.status(400).json({message:err})
    }
})

//Ruta para ver los productos por id de usuario

router.get('/products/:id', async(req,res)=>{
    try{
      const id = req.params.id
      const products = await prisma.productos.findMany({
        where:{
          user : id
        }
      })
      return res.status(200).json({ok:true, data: products})
    }catch(err){
      return res.status(400).json({message:err})
    }
});

  