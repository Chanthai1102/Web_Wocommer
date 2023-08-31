const ct = require ("../Controller/payment_method.controller")

const payment_method = (app) => {
    app.get("/api/payment_method", ct.getall)
    app.post("/api/payment_method", ct.create)
    app.delete("/api/payment_method", ct.remove)
}

module.exports = payment_method