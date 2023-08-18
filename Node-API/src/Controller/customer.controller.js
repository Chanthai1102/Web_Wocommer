const db = require("../Util/db")
const {json} = require("express")


const getlist = (req,res) => {
    var sql = "SELETE customer_id, firstname, lastname, gender, is_ative, create_at FROM customer"
    db.query(sql,(error,row)=>{
        if (error){
            res.json({
                message: error,
                error: true
            })
        }else {
            res.json({
                list: row
            })
        }
    })
}


const getOne = (req,res) => {
    var id = req.params.id
    var sql = "SELECT customer_id, fistname, lastname, gender, is_ative, create_at FROM customer WHERE customer_id = ?"
    db.query(sql,(error,row)=>{
        if (error){
            res.json({
                message: error,
                error: true
            })
        }else {
            res.json({
                list: row
            })
        }
    })
}


module.exports = {
    getlist
}