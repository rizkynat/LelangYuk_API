const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require("cors")
const mysql = require('mysql')

const {API_PORT} = process.env
const port = process.env.PORT || API_PORT

const app=express();
 
app.use(cors());
  
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(bodyParser.json())
 
 
 
 
 
app.listen(PORT, ()=>{console.log(`server is listening on ${port}`)});