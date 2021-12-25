const express = require('express')
const router = require('./src/routes')
const app = express()
app.use(express.json())
require('dotenv').config()



//endpoint routing
app.use('/api/v1/', router)
//routing for static file
app.use('/uploads', express.static('uploads'))

//port
let port = process.env.PORT
if (port == null || port == ""){
    port = 3000
}
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})