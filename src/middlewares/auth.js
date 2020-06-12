const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


module.exports = (req,res,next) => {
    const authHeader = req.headers.autorizacao;
    
    if(!authHeader){return res.status(401).send({error:'Sem o tolken de altorização'});}

    const parts = authHeader.split(' ');
    if(!parts.length === 2){return res.status(401).send({error:'erro no tolken'});}

    const [scheme,tolken] = parts;

    if(!/^Bearer$/i.test(scheme)){return res.status(401).send({error:'token mal formatado'});}

    jwt.verify(tolken,authConfig.secret,(err,decoded)=>{
        if(err){return res.status(401).send({error:'tolken invalido'});}

        req.userId = decoded.id;
        return next();
    });
};

