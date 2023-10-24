const { UserGuard } = require("../Controller/auth.controller");
const ct = require("../Controller/Employee.controller")
const employee = (app) => {
    app.get("/api/employee",UserGuard, ct.getlist)
    app.get("/api/employee/:id", ct.getone)
    app.get("/api/employee/check-username/:username", ct.checkusername)
    app.post("/api/employee",ct.create)
    app.put("/api/employee",ct.update)
    app.delete("/api/employee/:id",ct.remove)
}

module.exports = employee;