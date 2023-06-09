var JWT = require('jsonwebtoken')
var secret = 'iahasodhsaodjnsadoiusaodiansdopkja'

module.exports = function(req,res,next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        try{
            var decoded = JWT.verify(token, secret)
            if(decoded.role == 1){
                next()
            }else{
              res.status(403)
              res.send('Voce nao tem permissão de Admin')  
              return
            }
        }catch(err){
            res.status(403)
            res.send('Voce nao esta autenticado')
            return
        }
    }else{
        res.status(403)
        res.send('Voce nao esta autenticado')
        return
    }
}