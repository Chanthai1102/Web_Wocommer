const ct = require("../Controller/category.controller")

const category = (app) => {
    app.get("/api/category",ct.getlist)
    app.post("/api/category",ct.create)
    app.get("/api/category/:id",ct.getone)
    app.put("/api/category",ct.update)
    app.delete("/api/category/:id",ct.remove)
}

module.exports = category