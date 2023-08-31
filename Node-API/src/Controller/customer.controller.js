 const db = require("../Util/db")
 const {json} = require("express")
 const bcrypt = require("bcrypt")



const getlist = (req,res) => {
    var sql = "SELECT customer_id, firstname, lastname, gender, is_active, create_at FROM customer"
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
    var sql = "SELECT customer_id, firstname, lastname, gender, is_active, create_at FROM customer WHERE customer_id = ?"
    db.query(sql,[id],(error,row)=>{
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

const create = (req,res) => {
    db.beginTransaction()

    var {
        username, // store telephone
        password,
        firstname,
        lastname,
        gender,
        province_id,
        address_des
    } = req.body
    // validate parameters

    //Check Params is Null Or Not
    if(username == null || username == ""){
        message.username = "username required"
    }
    if(password == null || password == ""){
        message.password = "password required"
    }if(firstname == null || firstname == ""){
        message.firstname = "firstname required"
    }
    if(lastname == null || lastname == ""){
        message.lastname = "lastname required"
    }
    if(gender == null || gender == ""){
        message.gender = "gender required"
    }
    if(province_id == null || province_id == ""){
        message.province_id = "province_id required"
    }
    if(address_des == null || address_des == ""){
        message.address_des = "address_des required"
    }
    if (Object.keys(message).length > 0){
        res.json({
            err: true,
            message : message
        })
        return
    }

    //SQL Check User have or Not in database
    var SqlCheckUser = "SELECT customer_id FROM customer WHERE username = ?"
    db.query(SqlCheckUser,[username],(error_first,result)=>{
        if (result.length > 0 ){
            res.json({
                error: true,
                message : "Accout Already Create"
            })
            return false;
        }else {
            // bycript passwrod from client
            password = bcrypt.hashSync(password, 10)
            //Inser User to database customer
            var SqlInsertDataUser = "INSERT INTO customer (firstname, lastname, gender, username, password) VALUES (?,?,?,?,?)"
            var paramsUser = [firstname, lastname, gender, username, password]
            db.query(SqlInsertDataUser,paramsUser,(errorUser,resultUser) => {
                if (!errorUser){
                    //Insert Address User to table customer_address
                    var SqlInsertAddress = "INSERT INTO customer_address (customer_id, province_id, firstname, lastname, tel, address_des) VALUES (?,?,?,?,?,?)"
                    var paramsInsertAdress = [resultUser.insertId, province_id, firstname, lastname, username, address_des]
                    db.query(SqlInsertAddress,paramsInsertAdress,(errorAddress, resultAddress) => {
                        if (!errorAddress){
                            res.json({
                                message: "Account Created",
                                data: resultAddress
                            })
                            //db.commit is Correct insert Data all to table
                            db.commit()
                        }else {
                            //db.rollback is false not insert data all to table
                            db.rollback()
                            res.json({
                                error: true,
                                message: errorAddress
                            })
                        }
                    })
                }
            })
        }
    })
}


//Update Profile Customer
 const update = (req,res) => {
    //params for update customer
    var {
        customer_id,
        firstname,
        lastname,
        gender
    } = req.body;

    //chech params
    if (customer_id == null && customer_id == ""){
        message.customer_id = "customer_id required"
    }
    if (firstname == null && firstname == ""){
        message.firstname = "firstname required"
    }
    if (lastname == null && lastname == ""){
        message.lastname = "lastname required"
    }
    if (gender == null && gender == ""){
        message.gender = "gender required"
    }
     if (Object.keys(message).length > 0){
         res.json({
             err: true,
             message : message
         })
         return
     }
    var SqlUpdate = "UPDATE customer SET firstname=?, lastname=?, gender=? WHERE customer_id = ?"
     var params_Update = [firstname,lastname,gender,customer_id]
     db.query(SqlUpdate,params_Update, (error,row) => {
         if (error){
             res.json({
                 error : true,
                 message: error
             })
         }else{
             res.json({
                 message: row.affectedRows ? "Update successfully!" : "Data not in system!",
                 data : row
             })
         }
     })
 }

 const remove = (req,res) => {

    var sqlUpdate = "Update customer SET is_active = 0 WHERE customer_id = ? "
     db.query(sqlUpdate,[req.params.id], (error,row) => {
         if (!error){
             res.json({
                 message: (row.affectedRows) ? "Delete successfully!" : "Data not in system",
                 data : row
             })
         }else {
             res.json({
                 error: true,
                 message: error
             })
         }
     })

 }

 const listAddress = (req,res) => {
    var {
        customer_id
    } = req.body

     var sqlList = "SELECt * FROM customer_address WHERE customer_id = ? "
     db.query(sqlList, [customer_id] , (error,row) => {
         if (!error){
             res.json({
                 list : row
             })
         }else{
             res.json({
                 error: true,
                 message: error
             })
         }
     })
 }
 const GetOneAddress = (req,res) => {
    var{
        customer_address_id
    } = req.body;
    var sqlGetOne = "SELECT * FROM customer_address WHERE customer_address_id = ?"
    db.query(sqlGetOne,[customer_address_id], (error,row) => {
        if (!error){
            res.json({
                list : row
            })
        }else {
            res.json({
                error: true,
                message: error
            })
        }
    })
 }
 const newAddress = (req,res) => {
    var {
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } = req.body;
     var message = {}
     if(firstname == null || firstname == ""){
         message.firstname = "firstname required"
     }
     if(lastname == null || lastname == ""){
         message.lastname = "lastname required"
     }
     if(tel == null || tel == ""){
         message.tel = "tel required"
     }
     if(province_id == null || province_id == ""){
         message.province_id = "province_id required"
     }
     if(address_des == null || address_des == ""){
         message.address_des = "address_des required"
     }
     if (Object.keys(message).length > 0){
         res.json({
             err: true,
             message : message
         })
         return
     }
     var SqlCreateAddress = "INSERT INTO customer_address (customer_id, province_id, firstname, lastname, tel, address_des) VALUE  (?,?,?,?,?,?)";
     var ParamsSql = [customer_id, province_id, firstname, lastname, tel, address_des]
     db.query(SqlCreateAddress,ParamsSql, (error,row) => {
         if (error){
             res.json({
                 error: true,
                 message: error
             })
         }else {
             res.json({
                 message: row.affectedRows ? "Create successfully" : "Data not insystem",
                 data : row
             })
         }
     })
 }

 const updateAddress = (req,res) => {
     var {
         customer_address_id,
         customer_id,
         firstname,
         lastname,
         tel,
         province_id,
         address_des
     } = req.body;
     var message = {}
     if(customer_address_id == null || customer_address_id == ""){
         message.customer_address_id = "customer_address_id required"
     }
     if(customer_id == null || customer_id == ""){
         message.customer_id = "customer_id required"
     }
     if(firstname == null || firstname == ""){
         message.firstname = "firstname required"
     }
     if(lastname == null || lastname == ""){
         message.lastname = "lastname required"
     }
     if(tel == null || tel == ""){
         message.tel = "tel required"
     }
     if(province_id == null || province_id == ""){
         message.province_id = "province_id required"
     }
     if(address_des == null || address_des == ""){
         message.address_des = "address_des required"
     }
     if (Object.keys(message).length > 0){
         res.json({
             err: true,
             message : message
         })
         return
     }
     var SqlCreateAddress = "UPDATE customer_address SET customer_id = ?, province_id = ?, firstname = ? , lastname = ?, tel = ?, address_des = ? WHERE customer_address_id = ? ";
     var ParamsSql = [customer_id, province_id, firstname, lastname, tel, address_des, customer_address_id]
     db.query(SqlCreateAddress,ParamsSql, (error,row) => {
         if (error){
             res.json({
                 error: true,
                 message: error
             })
         }else {
             res.json({
                 message: row.affectedRows ? "Create successfully" : "Data not insystem",
                 data : row
             })
         }
     })
 }
 const removeAddress = (req,res) => {
     var{
         customer_address_id
     } = req.body;
     var sqlRemove = "DELETE FROM customer_address WHERE customer_address_id = ?"
     db.query(sqlRemove,[customer_address_id], (error,row) => {
         if (!error){
             res.json({
                 message: row.affectedRows ? "Delete Successfull" : "not found in system"
             })
         }
     })
 }

module.exports = {
    getlist,
    getOne,
    create,
    update,
    remove,
    listAddress,
    GetOneAddress,
    newAddress,
    updateAddress,
    removeAddress,
}