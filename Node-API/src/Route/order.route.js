const ct = require("../Controller/order.controller")

const order = (app) => {
    app.get("/api/order", ct.getlist)
    app.get("/api/order/:id", ct.getone)
    app.post("/api/order",ct.create)
    app.put("/api/order",ct.update)
    app.delete("/api/order/:id",ct.remove)
}


module.exports = order