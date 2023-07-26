// connection db
const db = require("../Util/db")
const {json} = require("express");

// function get list of category
const getlist = (req,res) => {
    var category_list = "SELECT * FROM category";
    db.query(category_list, (error,row)=> {
        if (error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list : row
            })
        }
    })
}

const create = (req,res) =>{
    const {
        name,
        parent_id,
        status
    } = req.body
    var create_category = "INSERT INTO category(`name`, `parent_id`, `status`) VALUES (?,?,?)"
    var data_category = [name,parent_id,status]
    db.query(create_category,data_category,(error,row) => {
        if (error){
            res.json({
                error: true,
                message: error
            })
        }else {
            res.json({
                message: "create successfully",
                list: row
            })
        }
    })
}

const getone = (req,res) => {
    var {id} = req.params;
    var search_category = "SELECT * FROM category WHERE category_id = ?"
    db.query(search_category,[id],(error,row) => {
        if (error){
            res.json({
                error: true,
                message: error
            })
        }else {
            res.json({
                message: "Search Successfuly",
                list: row
            })
        }
    })
}


const update = (req,res) => {
    const {
        category_id,
        name,
        parent_id,
        status
    } = req.body
    var update_category = "UPDATE category SET name = ?, parent_id = ?, status =? WHERE category_id =?"
    var data_category = [name,parent_id,status,category_id]
    db.query(update_category,data_category,(error,row) => {
        if (error){
            res.json({
                error: true,
                message: error
            })
        }else {
            res.json({
                message: "Update Successfully",
                list: row
            })
        }
    })
}

const remove = (req,res) => {
    var {id} = req.params;
    var remove_category = "DELETE FROM category WHERE category_id = ?"
    db.query(remove_category,[id],(error,row) => {
        if (error){
            res.json({
                error: true,
                message: error
            })
        }else {
            res.json({
                message: "Remove Successfully",
                list: row
            })
        }
    })
}

module.exports = {
    getlist,
    create,
    getone,
    update,
    remove
}