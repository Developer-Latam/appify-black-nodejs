import express from 'express'
import userRouter from './routes/miempresa/userRouter.js'
import proveedorRouter from './routes/miempresa/proovRouter.js'
import listrouter from './routes/miempresa/priceListRouter.js'
import productsrouter from './routes/miempresa/productsRouter.js'
import servicerouter from './routes/miempresa/serviceRouter.js'
import clientesrouter from './routes/comercial/clientesRouter.js'
import projectsrouter from './routes/comercial/projectsRouter.js'
import itemprojectsrouter from './routes/comercial/itemsProdServProyectoRouter.js'
import consultasrouter from './routes/comercial/consultasRouter.js'
import ecommercerouter from './routes/comercial/ecommerceRouter.js'
import sistemRouter from './routes/miempresa/configs/sistemaRouter.js'
import configRouter from './routes/miempresa/configs/configsEmpresaRouter.js'
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
app.use('/config', configRouter)
app.use('/sistema', sistemRouter)

// Routers a comercial

app.use('/clientes', clientesrouter)
app.use('/projects', projectsrouter)
app.use('/consultas', consultasrouter)
app.use('/ecommerces', ecommercerouter)
app.use('/projectsitem', itemprojectsrouter)

// Routers a Operaciones



// Routers a Administracion



// Routers a Calendario??
const specs = swaggerJSDoc(swaggerOpts)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, ()=>{
    console.log(`server listen on ${PORT}`)
});


