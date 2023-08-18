const ct = require("../Controller/customer.controller")


const customer = (app) => {
    app.get("/api/customer", ct.getlist)
    app.get("/api/customer/:id", ct.getOne)
}


module.exports = customer