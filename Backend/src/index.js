const express = require('express')
require('./db/mongoose')
const cors = require('cors')

const bookRouter = require('./routers/book') 
const userRouter = require('./routers/user')
const app = express()


const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(bookRouter)
app.use(userRouter)

app.listen(port,()=>{
    console.log('server is up on port '+port)
})