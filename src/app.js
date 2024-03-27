import express from 'express'
import userRouter from './routes/miempresa/userRouter.js'
import proveedorRouter from './routes/miempresa/proovRouter.js'
import listrouter from './routes/miempresa/priceListRouter.js'
import productsrouter from './routes/miempresa/productsRouter.js'
import servicerouter from './routes/miempresa/serviceRouter.js'
import clientesrouter from './routes/comercial/clientesRouter.js'
import projectsrouter from './routes/comercial/projectsRouter.js'
import consultasrouter from './routes/comercial/consultasRouter.js'
import cors from 'cors';
import swaggerUI  from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOpts } from './docs/swaggerOpts.js'

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use('/user',userRouter)
app.use('/proveedor', proveedorRouter)
app.use('/listproducts', listrouter)
app.use('/products', productsrouter)
app.use('/services', servicerouter)
app.use('/clientes', clientesrouter)
app.use('/projects', projectsrouter)
app.use('/consultas', consultasrouter)
const specs = swaggerJSDoc(swaggerOpts)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, ()=>{
    console.log(`server listen on ${PORT}`)
});


