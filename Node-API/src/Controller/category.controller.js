// connection db
const db = require("../Util/db")
const {json} = require("express");

const getlist = async (req, res) => {
    const { status, page, search } = req.query;
    const limit = 11;
    const offset = (page - 1) * limit;

    let selectListQuery = `
        SELECT c.*, c1.name AS parent_name 
        FROM category c 
        LEFT JOIN category c1 ON c.parent_id = c1.category_id
    `;
    let Total = "SELECT COUNT(category_id) as total FROM category";
    const queryParams = [];
    if (search && search !== 'null') {
        Total += ' WHERE name LIKE ?'
        selectListQuery += `WHERE c.name LIKE ?`;
        queryParams.push(`%${search}%`);

        if (status && status !== 'null'){
            Total += ' AND status = ?'
            selectListQuery += ' AND c.status = ?';
            queryParams.push(status);
        }
    } else if (status && status !== 'null') {
        Total += ' WHERE status = ?'
        selectListQuery += `WHERE c.status = ?`;
        queryParams.push(status);
    }

    selectListQuery += ' ORDER BY c.category_id DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);
    try {
        const category = await db.query('SELECT * FROM Category');
        const list = await db.query(selectListQuery, queryParams);
        const total = await db.query(Total, queryParams);

        if (list.length === 0) {
            return res.json({
                message: 'No results found',
                TotalRecord: total,
                category: category,
                query: req.query
            });
        }

        res.json({
            list: list,
            TotalRecord: total,
            category: category,
            query: req.query
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
const create = (req,res) =>{
    const {
        name,
        description,
        parent_id,
        status
    } = req.body
    var create_category = "INSERT INTO category(`name`, `description`, `parent_id`, `status`) VALUES (?,?,?,?)"
    var data_category = [name,description,parent_id,status]
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
                list : row
            })
        }
    })
}


const update = (req,res) => {
    const {
        category_id,
        name,
        description,
        parent_id,
        status
    } = req.body
    var update_category = "UPDATE category SET name = ?, description = ?, parent_id = ?, status =? WHERE category_id =?"
    var data_category = [name,description,parent_id,status,category_id]
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