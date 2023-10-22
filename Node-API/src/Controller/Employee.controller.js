// connection database
const db = require("../Util/db")
const { isEmptyOrNull } = require("../Util/service")
const bcrypt = require("bcrypt");

// function getlist of employee
const getlist = (req,res) => {
    var employee_list = "SELECT * FROM employee"
    db.query(employee_list,(err,row)=>{
        if (err){
            res.json({
                message: err,
                err: true
            })
        }else{
            res.json({
                list:row
            })
        }
    })
}

// function search for one of employee
const getone = (req,res) => {
     var id = req.params.id
     var search_employee = "SELECT * FROM employee WHERE employee_id = ?"
    db.query(search_employee,[id],(err,row)=>{
        if (err){
            res.json({
                message: err,
                err:true
            })
        }else{
            res.json({
                list:row
            })
        }
    })
}

// function create member of employee
const create = (req,res) => {
    const {
        username,
        password,
        firstname,
        lastname,
        tel,
        email,
        base_salary,
        country
    } = req.body
    var message = {}
    if(isEmptyOrNull(username)){
        message.username = "firstname required!"
    }
    if(isEmptyOrNull(password)){
        message.password = "firstname required!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "firstname required!"
    }
    if (lastname == null || lastname == ""){
        message.lastname = "lastname required"
    }
    if (tel == null || tel == ""){
        message.tel = "tel required"
    }
    if (Object.keys(message).length > 0){
        res.json({
            err: true,
            message : message
        })
        return
    }
    let passwords = bcrypt.hashSync(password, 10);
    var create_employee = "INSERT INTO employee (`username`,`password`,`firstname`, `lastname`, `tel`, `email`, `base_salary`,`country`) VALUES (?,?,?,?,?,?,?,?)"
    var parameter_data = [username,passwords,firstname,lastname,tel,email,base_salary,country]
    db.query(create_employee,parameter_data,(err,row)=>{
        if (err){
            res.json({
                err:true,
                message: err
            })
        }else{
            res.json({
                message: "create successfully",
                data: row
            })
        }
    })
}

// function update member of employee
const update = (req,res) => {
    const {
        employee_id,
        firstname,
        lastname,
        tel,
        email,
        base_salary,
        address,
        province,
        country
    } = req.body
    var update_employee = "UPDATE employee SET firstname = ?, lastname = ?, tel = ?, email = ?, base_salary = ?, address = ?, province = ?, country = ? WHERE employee_id = ?";
    var parameter_data = [firstname,lastname,tel,email,base_salary,address,province,country,employee_id]
    db.query(update_employee,parameter_data,(err,row)=>{
        if (err){
            res.json({
                err: true,
                message:err
            })
        }else{
            res.json({
                message: "Update Successfully",
                data: row
            })
        }
    })
}

// function remove member of employee
const remove = (req,res) => {
    var {id} = req.params;
    var remove_employee = "DELETE FROM employee WHERE employee_id = ?";
    db.query(remove_employee,[id],(err,row) => {
        if (err){
            res.json({
                err: true,
                message: err
            })
        }else {
            res.json({
                message: "remove successfully",
                data: row
            })
        }
    })
}


module.exports = {
    getlist,
    getone,
    create,
    update,
    remove
}
