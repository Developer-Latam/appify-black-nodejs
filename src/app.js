import express from 'express'
import userRouter from './routes/miempresa/userRouter.js'
import proveedorRouter from './routes/miempresa/proovRouter.js'
import listrouter from './routes/miempresa/priceListRouter.js'
import productsrouter from './routes/miempresa/productsRouter.js'
import servicerouter from './routes/miempresa/serviceRouter.js'
import clientesrouter from './routes/comercial/clientesRouter.js'
import projectsrouter from './routes/comercial/projectsRouter.js'
import itemprojectsrouter from './routes/comercial/itemsProdServProyectoRouter.js'
import contactorouter from './routes/comercial/contactosClienteRouter.js'
import puntodespachorouter from './routes/comercial/puntoDespachoClienteRouter.js'
import consultasrouter from './routes/comercial/consultasRouter.js'
import ecommercerouter from './routes/comercial/ecommerceRouter.js'
import sistemRouter from './routes/miempresa/configs/sistemaRouter.js'
import comercialRouter from './routes/miempresa/configs/comercialRouter.js'
import contabilidadRouter from './routes/miempresa/configs/contabilidadRouter.js'
import cors from 'cors';
import swaggerUI  from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOpts } from './docs/swaggerOpts.js'

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(express.json())

// Routers a Mi Empresa

app.use('/user',userRouter)
app.use('/proveedor', proveedorRouter)
app.use('/listproducts', listrouter)
app.use('/products', productsrouter)
app.use('/services', servicerouter)
//dentro de mi empresa configs
app.use('/sistema', sistemRouter)
app.use('/comercial', comercialRouter)
app.use('/contabilidad', contabilidadRouter)
// Routers a comercial

app.use('/clientes', clientesrouter)
app.use('/projects', projectsrouter)
app.use('/contacto', contactorouter)
app.use('/consultas', consultasrouter)
app.use('/ecommerces', ecommercerouter)
app.use('/projectsitem', itemprojectsrouter)
app.use('/puntoDes', puntodespachorouter)


// Routers a Operaciones



// Routers a Administracion



// Routers a Calendario??
const specs = swaggerJSDoc(swaggerOpts)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, ()=>{
    console.log(`server listen on ${PORT}`)
});


