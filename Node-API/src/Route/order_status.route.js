const ct = require ("../Controller/order_status.controller")
const {getall} = require("../Controller/payment_method.controller");

const order_status = (app) => {
    app.get("/api/order_status", ct.getall)
    app.post("/api/order_status", ct.create)
    app.delete("/api/order_status", ct.remove)
}

module.exports = order_status