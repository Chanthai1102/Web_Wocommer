const db = require("../Util/db")


const getlist = async (req,res) => {
    var { customer_id } = req.body
    var sqlgetlist = "SELECT * FROM wishlist WHERE customer_id = ?"
    // var sqlgetlist = "SELECT wl.id, p* FROM wishlist w1"
    // sqlgetlist += " INNTER JOIN product p ON (p.product_id = wl.product_id ) "
    // sqlgetlist += "WHERE wl.customer_id = ?"
    const list = await db.query(sqlgetlist,[customer_id])
    res.json({
        list : list
    })

}

const create = (req,res) => {
    var { customer_id, product_id} = req.body
    var Sql = "INSERT INTO wishlist (customer_id, product_id) VALUES (?,?)"
    var Param = [customer_id,product_id]
    db.query(Sql,Param, (error,row) => {
        if (error){
            res.json({
                error: true,
                message: error
            })
        }else {
            res.json({
                message: "Create Successfully",
                list: row
            })
        }
    })
}

const remove = async (req,res) => {
    const {wishlist_id} = req.body
    var Sql = "DELETE FROM wishlist WHERE wishlist_id = ?"
    const list = await db.query(Sql,[wishlist_id])
    res.json({
        message: "Product remove from your wishlist",
        list: list
    })
}

module.exports = {
    getlist,
    create,
    remove
}