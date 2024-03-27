const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const fileUpload = require('express-fileupload')
const {router} = require('./src/router/routes')

const app = express()


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './uploads'
}))


app.use(router)

app.listen(3000 ,()=>{
    console.log( 
    `Running in the port: ${3000}`
    )
})