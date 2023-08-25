const ct = require("../Controller/customer.controller")
const {put} = require("axios");


const customer = (app) => {

    //Route For customer
    app.get("/api/customer", ct.getlist)
    app.get("/api/customer/:id", ct.getOne)
    app.post("/api/customer", ct.create)
    app.put("/api/customer", ct.update)
    app.delete("/api/customer/:id", ct.remove)

    app.get("/api/customer-address", ct.listAddress)
    app.get("/api/customer-address/:id", ct.GetOneAddress)
    app.post("/api/customer-address", ct.newAddress)
    app.put("/api/customer-address", ct.updateAddress)
    app.delete("/api/customer-address/:id", ct.removeAddress)







}


module.exports = customer