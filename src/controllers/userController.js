const express = require('express');

const User = require('../models/user');

const router = express.Router();
const bcr = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth.json')

/**
 * Já que estamos trabalhando como se fosse uma API feita para
 * integração com um Front separado... Vai ai uma documentação 
 * de como usar a API -> 
 * Rota do post ===> ela vai servir para injetar as autenticações 
 * do usuario para dentro do banco de dados
 */

 /**Rota de registro de usuario*/
router.post('/registro',async (req,res) =>{
    const {email,senha} = req.body;
    try{
        
        if(await User.findOne({email})){
            return res.status(400).send({error:"Email já cadastrado!"});
        }

        const user = await User.create(req.body);

       
       /*
        const{email} = req.body
        if(await User.findOne({email}))
        return res.status(400).send("Esse email já esta cadastrado")

        const user = await User.create(req.body);
        user.senha = undefined;
        return res.send({user});

        */
        user.senha = undefined;
        return res.send({user,
        token: geracaoToken({id:user.id}),
        });

    }catch(err){
        return res.status(400).send({error: 'Falha ao registrar '+'Verifique se os dados estão corretos!'});
    }
});


function geracaoToken(params = {}){
    return jwt.sign(params,auth.secret,{expiresIn: 86400, /*Espira em um dia*/});
}

router.post('/autenticacao', async (req,res) => {
    const {email,senha} = req.body;
    const user = await User.findOne({email}).select('+senha');
    if(!user){return res.status(400).send({error:"Email não Cadastrado"})}
    if(!await bcr.compare(senha,user.senha)){res.status(400).send("Senha incorreta")}
    user.senha = undefined;
     
    const token = //jwt.sign({id:user.id},auth.secret,{expiresIn: 86400, /*Espira em um dia*/});
    res.send({user,
    token: geracaoToken({id:user.id}),
    });
    
});



/*Rota de listagem de usuario*/
router.get('/',async(req,res)=>{
    try{
        const user = await User.find()
        return res.send({user})
    }catch(err){
        res.status(400).send({error:'erro nenhum usuario encontrado'})
    }
});



module.exports = app => app.use('/user',router);