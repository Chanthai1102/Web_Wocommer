const express = require('express')
const axios = require("axios");
const app = express()
const cors = require("cors")
app.use(express.json())

const db = require("./src/Util/db")

app.use(cors({
    origin: "*"
}))

app.get("/", (req,res)=>{
    res.json({
        data : "Welcome Thai"
    })
})
const employee = require("./src/Route/Employee.route")
const category = require("./src/Route/category.route")
const customer = require("./src/Route/customer.route")
const payment_method = require("./src/Route/payment_method.route")
employee(app)
category(app)
customer(app)
payment_method(app)



app.listen(8081,()=>{
    console.log("run : 8081")
})