const mongoose=require('mongoose');
var s=mongoose.connect('mongodb://0.0.0.0:27017/dairy');
let schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})
module.exports=mongoose.model('dairycolle',schema);