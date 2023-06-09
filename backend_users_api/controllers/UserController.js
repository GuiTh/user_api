var User = require('../models/User')
var PasswordToken = require('../models/PasswordToken')
var JWT = require('jsonwebtoken')
var secret = 'iahasodhsaodjnsadoiusaodiansdopkja'
var bcrypt = require('bcrypt')

class UserController{
    async index(req,res){  
        var users = await User.findAll()
        console.log(users)
        res.json(users)
     }

    async findUser(req,res){
        var id = req.params.id
        var user = await User.findById(id)
        if(user == undefined){
            res.status(404)
            res.json({})
        }else{
            res.status(200)
            res.json(user)
        }
     }

    async create(req, res){
        var {email,name,password} = req.body
        if(email == undefined || email =='' || email==' '){
            res.status(400)
            res.json({err:"o E-mail é invalido!"})
            return;
        }
        if(name == undefined || name == '' || name ==' '){
            res.status(400)
            res.json({err:"Preencha o nome"})
            return;
        }
        if(password == undefined || password == '' || password ==' '){
            res.status(400)
            res.json({err:'Preencha o campo de senha'})
            return;
        }

        var emailExists = await User.findEmail(email)

        if(emailExists){
            res.status(406)
            res.json({err: 'O E-mail já esta cadastrado!'})
            return
        }


       await User.newClient(email, password, name)
        res.status(200)
        res.send('tudo OK!')
     }

     async edit(req,res){
        var {id,name,role,email} = req.body
        var result = await User.update(id,email,name,role)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send('Tudo OK!')
            }else{
                res.status(406)
                res.send(result.err)
            }
        }else{
            res.status(406)
            res.send("Ocorreu um erro no servidor!")
        }
     }

     async delete(req,res){
        var id = req.params.id
        var result = await User.deleteClient(id)
        if(result.status){
            res.status(200)
            res.send("Usuario deletado")
        }else{
            res.status(406)
            res.send(result.err)
        }
     }

     async recoverPassword(req,res){
        var email = req.body.email
        var result = await PasswordToken.create(email)
        if(result.status){
            res.status(200)
            res.send(""+result.token)
        }else{
            res.status(406)
            res.send(result.err)
        }
     }

     async changePassword(req,res){
        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status){
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.send('Senha alterada!')
        }else{
            res.status(406)
            res.send("Token Invalido!")
        }
     }

     async login(req,res){
        var {email,password} = req.body
        var user = await User.findByEmail(email)

        if(user != undefined){
            var result = await bcrypt.compare(password, user.password)
           
            if(result){
                var token = JWT.sign({email: user.email, role: user.role}, secret)
                res.status(200)
                res.json({token: token})
            }else{
                res.status(406)
                res.json({err: "senha incorreta"})
            }
        }else{
            res.status(406)
            res.json({status:false, err: "Usuario não existe"})
        }
     }
}

module.exports = new UserController()