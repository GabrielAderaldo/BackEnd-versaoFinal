const express = require('express')

const Songs = require('../models/songs')

const router = express.Router()

//criar musica
router.post('/register',async(req,res)=>{
    const{id} = req.body;
    try{
        if(await Songs.findOne({id}))
        return res.status(400).send({error:'Song already exist'})

        const song = await Songs.create(req.body);
        return res.send(song)
    }catch(err){
        return res.status(400).send({error:'registration failed'})
    }
})

//listar todas musicas
router.get('/', async(req,res)=>{
    try{
        const song = await Songs.find();
        return res.send({song})
    }catch(err){
        return res.status(400).send({error:'error ao achar musica'})
    }
})

//listar musica por id
router.get('/:id',async(req,res)=>{
    try{
        await Songs.findOne({id: req.params.id}).
        then(songFound=>{
            if(!songFound){return res.status(400).send({error:'song not found'})}
            return res.status(200).json(songFound)
        })
    }catch(err){
        return res.status(400).send({error:'erro song dont found'})
    }
})

//listar por nome da musica ou do artista 
// ainda nao ta funcionando
router.get('/:name',async(req,res)=>{

    try{
        await Songs.find({name: req.params.name}).
        then(songFound=>{
            if(!songFound){return res.status(400).send({error:'song not found'})}
            return res.status(200).json(songFound)
        })

    }catch(err){
        res.status(400).send({error:'Não foi achado nada na pesquisa'})
    }
})

module.exports = app=> app.use('/song',router)