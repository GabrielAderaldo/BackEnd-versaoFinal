const bcr = require('bcryptjs');
const mongoose = require('../database');


const userSchema = new mongoose.Schema({
userName:{
    type:String,
    require:true,
},
senha:{
type:String,
require:true,
select: false
},
email:{
    type:String,
    unique: true,
    require: true,
    lowercase:true
},
nascDia:{
type:String,
requise:true
},
genero:{
type:String,
uppercase:true
},

temporizadorData:{
    type: Date,
    default:Date.now,
},
//Fim da criação da tabela do BD
});






userSchema.pre('save', async function(next){
    const hash = await bcr.hash(this.senha,10);
    this.senha = hash;
    next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;