import express from 'express'
import userRouter from './routes/userRouter.js'
import proveedorRouter from './routes/proovRouter.js'
import listrouter from './routes/priceListRouter.js'
import productsrouter from './routes/productsRouter.js'
import projectsrouter from './routes/projectsRouter.js'
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
app.use('/projects', projectsrouter)
const specs = swaggerJSDoc(swaggerOpts)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.listen(PORT, ()=>{
    console.log(`server listen on ${PORT}`)
});


