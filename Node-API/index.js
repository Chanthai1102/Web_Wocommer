const express = require('express')
const axios = require("axios");
const app = express()
app.use(express.json())

const db = require("./src/Util/db")

app.get("/", (req,res)=>{
    res.json({
        data : "Welcome Thai"
    })
})
const employee = require("./src/Route/Employee.route")
const category = require("./src/Route/category.route")
employee(app)
category(app)



app.listen(8081,()=>{
    console.log("run : 8081")
})