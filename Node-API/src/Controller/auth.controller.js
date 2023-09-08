const {TOKEN_KEY} = require("../Util/service")
const jwt = require("jsonwebtoken")
const db = require("../Util/db")

exports.userGuard = (parameter) => {
    return (req,res, next) => {
        var authorization = req.header.authorization;
        var token_from_client = null
        if (authorization != null && authorization != ""){
            token_from_client = authorization.split("")
            token_from_client = token_from_client[1]
        }
        if (token_from_client == null){
            res.status(401).send({
                message: 'Unauthorized',
            })
        }else {
            jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
                if (error){
                    res.status(401).send({
                        message: 'Unauthorized',
                        error: error
                    })
                }else {
                    var permission = result.data.permission
                    req.user = result.data
                    req.user_id = result.data.user.customer_id
                    if (parameter == null){
                        next();
                    }else if (permission.includes(parameter)){
                        next();
                    }else {
                        res.status(401).send({
                            message: 'Unauthorized'
                        })
                    }
                }
            })
        }
    }
}