const ct = require("../Controller/customer.controller")
const {put} = require("axios");


const customer = (app) => {
    app.get("/api/customer", ct.getlist)
    app.get("/api/customer/:id", ct.getOne)
    app.post("/api/customer", ct.create)
    app.put("/api/customer", ct.update)
}


module.exports = customer