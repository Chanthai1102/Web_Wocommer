const db = require("../Util/db")
const {add} = require("nodemon/lib/rules");
const {invoiceNumber} = require("../Util/service")

const generateInvoiceNo = async () => {
    const list = await db.query("SELECT MAX ( order_id ) as id FROM 'order'")
    return invoiceNumber(data[0].id)
}

const getlist = async (req,res) => {
    var sql = "SELECT * FROM order "
    const list = await db.query(sql)
    res.json({
        list: list
    })
}

const getone = async (req,res) => {
    var {order_id} = req.params.id
    var sql = "SELECT * FROM order WHERE order_id = ?"
    var params = [order_id]
    const data = await db.query(sql,params)
    res.json({
        data: data
    })
}

const getOderbyCustomer = async (req,res) => {
    var {customer_id} = req.body
    var sql = "SELECT * FROM order WHERE customer_id = ? "
    var params = [customer_id]
    const data = await db.query(sql,params)
    res.json({
        data: data
    })
}

const create = async (req,res) => {
    try {
        db.beginTransaction();
        const {
            customer_id,
            customer_address_id,
            payement_methode_id,
            comment,
        } = req.body
        if(customer_id == null || customer_id == ""){
            message.customer_id = "customer_id required"
        }
        if (customer_address_id == null || customer_address_id == ""){
            message.customer_address_id = "customer_address_id required"
        }
        if (payement_methode_id == null || payement_methode_id == ""){
            message.payement_methode_id = "payement_methode_id required"
        }
        if (Object.keys(message).length > 0){
            res.json({
                err: true,
                message : message
            })
            return
        }
        // find customer_address_info by address_id(from client)
        var sqlCheckAdd = "SELECT * FROM customer_address WHERE customer_address_id = ?"
        var paramCheckAdd = [customer_address_id]
        var address = await db.query(sqlCheckAdd,paramCheckAdd)
        if (address?.length > 0){
            const {
                firstname,
                lastname,
                tel,
                address_des
            } = address[0]
            // find total_order => need getCartInfo by customer
            var sqlProduct = "SELECT * c.*, p.price FROM cart c INNER JOIN product p ON (c.product_id = p.product_id) WHERE customer_id = ? "
            var paramProduct = [customer_id]
            var Product = await db.query(sqlProduct,paramProduct)
            if (Product.length > 0){
                // find total amont base from cart by customer
                var order_total = 0;
                Product.map((item,index) => {
                    order_total += (item.quantity * item.price)
                })
                // insert data to table order
                var order_status_id = 1 // Pendding
                var inv_no = await generateInvoiceNo();
                var sqlOrder = "INSERT INTO `order`"+
                    " (customer_id, payement_methode_id, order_status_id , invoice_no, comment, order_total, firstname, lastname, telelphone, address_des) VALUES "+
                    " (?,?,?,?,?,?,?,?,?,?)";
                var sqlOrderParam = [customer_id,payement_methode_id,order_status_id,inv_no,comment,order_total,firstname,lastname,tel,address_des]
                const order = await db.query(sqlOrder,sqlOrderParam)
                // insert order_detail
                Product.map(async (item,index) =>{
                    var sqlOorderDetails = "INSERT INTO order_detail (order_id,product_id,quantity,price) VALUES (?,?,?,?)"
                    var sqlOorderDetailsParam = [order.insertId, item.product_id, item.quantity, item.price];
                    const orderDetail = await db.query(sqlOorderDetails,sqlOorderDetailsParam)

                    // cut stock from table product
                    var sqlProdut = "UPDATE product SET quantity=(quantity-?) WHERE product_id = ?"
                    var updatePro = await db.query(sqlProdut,[item.quantity,item.product_id])
                })

                // clear cart by customer
                await db.query("DELETE FROM cart WHERE customer_id = ?",[customer_id])

                res.json({
                    message:"Your order has been successfully!",
                    data:order
                })

                db.commit();
            }else {
                res.json({
                    error: true,
                    message: "Your cart is empty"
                })
            }
        }else {
            res.json({
                error: true,
                message: "Please Add Address"

            })
        }
    }catch (e){
        db.rollback();
        res.json({
            message:e,
            error: true
        })
    }
}

module.exports = {
    getlist,
    getone,
    getOderbyCustomer,
    create,
    update,
    remove
}