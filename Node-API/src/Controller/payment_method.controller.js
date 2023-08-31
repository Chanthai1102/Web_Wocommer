const db = require ('../Util/db')
const {createPool} = require("mysql");


const getall = async (req,res) => {
    var sql = "SELETE * FROM payment_methode"
    const list = await db.query(sql)
    res.json({
        list : list
    })
}

const create = async (req,res) => {
    var { name, code} = req.body
    var sql = "INSERT INTO payment_methode (name, code) VALUES (?,?)"
    var params = [name, code]
    const data = await db.query(sql,params)
    res.json({
        message: "Create Success",
        data: data
    })
}

const remove = async (req,res) => {
    var { payment_methode_id } = req.body
    var sql = "DELETE FROM payment_methode WHERE payment_methode_id = ? "
    params = [payment_methode_id]
    const data = await db.query(sql,params)
    res.json({
        message: "Delete Success",
        data: data
    })
}




module.exports = {
    getall,
    create,
    remove
}