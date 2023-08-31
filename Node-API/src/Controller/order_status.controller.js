const db = require("../Util/db")


const getall = async (req,res) => {
    var sql = "SELETE * FROM order_status"
    const list = await db.query(sql)
    res.json({
        list: list
    })
}

const create = async (req,res) => {
    var { name,message,sort_order } = req.body
    var sql = "INSERT INTO order_status (name, message, sort_order) VALUES (?,?,?)"
    params = [name, message, sort_order]
    const data = await db.query(sql,params)
    res.json({
        message: "Product Added!",
        data: data
    })
}

const remove = async (req,res) => {
    var { order_status_id } = req.body
    var sql = "DELETE FROM order_status WHERE order_status_id = ?"
    params = [order_status_id]
    const data = await db.query(sql,params)
    res.json({
        message: "Delete Product",
        data: data
    })
}


module.exports = {
    getall,
    create,
    remove
}