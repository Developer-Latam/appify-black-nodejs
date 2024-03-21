import express from 'express'
import router from './routes/userRouter.js'
import itemrouter from './routes/itemsRouter.js'
import listrouter from './routes/priceListRouter.js'
import productsrouter from './routes/productsRouter.js'
import cors from 'cors';


const app = express()
const PORT = 8080

app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(router)
app.use(listrouter)
app.use(productsrouter)


app.use('/item', itemrouter)


app.listen(PORT, ()=>{
    console.log(`server listen on ${PORT}`)
});


