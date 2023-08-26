
const ct = require("../Controller/wishlist.controller")
const wishlist = (app) => {
    app.get("/wishlist", ct.getlist)
    app.post("/wishlist", ct.create)
    app.delete("/wishlist", ct.remove)
}

module.exports = wishlist;