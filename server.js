const express = require('express')
const router = require('./src/routes')
const app = express()
app.use(express.json())


//endpoint routing
app.use('/api/v1/', router)


//port
let port = process.env.PORT
if (port == null || port == ""){
    port = 3000
}
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})