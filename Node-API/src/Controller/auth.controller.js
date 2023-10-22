const {TOKEN_KEY} = require('../Util/service')
const jwt =require('jsonwebtoken')

exports.UserGuard = (req,res,next) => {
    var Authorization = req.headers.authorization
    var Token_Client = null
    if (Authorization != null && Authorization !== "") {
        const tokenParts = Authorization.split(' ');

        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            Token_Client = tokenParts[1];
        }
    }

    if (Token_Client == null){
        res.status(401).send({
            message: 'Unauthorized'
        })
    }else {
        jwt.verify(Token_Client,TOKEN_KEY,(error,data) => {
            if (error){
                res.status(401).send({
                    message: 'Unauthorized'
                })
            }else {
                next()
            }
        })
    }
}
