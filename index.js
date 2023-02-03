require("dotenv").config();
const apiRouter = require('./apiRouter')
const app = require("./app");

const PORT= process.env.APP_PORT;
 
 
 app.use('/apiRouter', apiRouter)
 
 
app.listen(PORT, ()=>{console.log(`server is listening on ${PORT}`)});