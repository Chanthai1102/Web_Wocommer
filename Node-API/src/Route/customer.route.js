const ct = require("../Controller/customer.controller")


const customer = (app) => {
    app.get("/api/customer", ct.getlist)
    app.get("/api/customer/:id", ct.getOne)
    app.post("/api/customer", ct.create)
}


module.exports = customer