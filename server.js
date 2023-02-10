const express = require('express')
const cors = require('cors')

const app = express()
var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

//parse request content-type application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// for parsing multipart/form-data
// so we can upload file form body form-data
//app.use(upload.array())
app.use(express.static(__dirname +'/public'));
// simple route
app.get("/", (req, res)=>{
    res.json({message: "Test app"})
})


// routes
require("./app/routes/auth.routes")(app)
require("./app/routes/user.routes")(app)
require("./app/routes/product.routes")(app)

// set port, listen for request
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})