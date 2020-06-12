const express = require('express')

const Playlist = require('../models/playlist')

const router = express.Router();

//criar playlist
router.post('/register', async(req,res)=>{
    const {name} = req.body;
    try{
        if(await Playlist.findOne({name}))
        return res.status(400).send({error:'Playlist already exist'})

        var nameURL = req.body.name.toString().replace(" ","").toLowerCase();
        req.body.nameURL = nameURL;
        const playlist = await Playlist.create(req.body);
        return res.send({playlist})
    }catch(err){
        return res.status(400).send({error:'registration failed'})
    }
})

//lista todas as playlist
router.get('/', async(req,res)=>{
    try{
        const playlist = await Playlist.find()
        return res.send({playlist})
    }catch(err){
        return res.status(400).send({error:'error ao achar playlist'})
    }
})


//listar por nome especifico
router.get('/:name', async(req,res)=>{
    try{
        await Playlist.findOne({nameURL: req.params.name.toString()})
        .then(playlistFound=>{
            if(!playlistFound){return res.status(400).send({error:'erro playlist dont found'})}
            return res.status(200).json(playlistFound)
        })

        
    }catch(err){
        return res.status(400).send({error:'erro playlist dont found'})
    }
})

//deletar playlist por id
router.delete('/:id', async(req,res)=>{
    try{
        await Playlist.findByIdAndRemove(req.params.id)
        return res.send('deletado com sucesso')
    }catch(err){
        return res.status(400).send({error:'Erro ao deletar playlist'})
    }
})

//add musica na playlist
router.put('/:name/add',async(req,res)=>{
    try{
      
       const playlist = await Playlist.findOne({nameURL: req.params.name.toString()})
       playlist.musicId.addToSet((req.body.musicId))
       playlist.save()
       return res.send(playlist)

    }catch(err){
        return res.status(400).send({error:'Erro ao atualizar playlist'})
    }
})

//deletar musica da playlist
router.put('/:name/delete',async(req,res)=>{
    try{
        await Playlist.findOneAndUpdate(
            {nameURL: req.params.name.toString()},
            {$pull:{"musicId": req.body.musicId}}
        )
       const playlist = Playlist.findOne({nameURL: req.params.name.toString()}) 
        return res.send(playlist)
    }catch(err){
        return res.status(400).send({error:'Erro ao apagar a musica'})
    }
})


module.exports = app => app.use('/playlist',router);