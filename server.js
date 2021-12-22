const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Halo world</h1>')
})

let port = process.env.PORT
if (port == null || port == ""){
    port = 3000
}
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})