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
const order_status = require("./src/Route/order_status.route")
const order = require("./src/Route/order.route")
employee(app)
category(app)
customer(app)
payment_method(app)
order_status(app)
order(app)



app.listen(8081,()=>{
    console.log("run : 8081")
})