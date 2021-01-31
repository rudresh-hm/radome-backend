const mongoose=require('mongoose');
let dataSchema= new mongoose.Schema({
    date:String,
    month:String,
    year:String,
    product:String,
    country:String,
    state:String,
    city:String,
    store:Number,
    dept:Number,
    weekSales:String,
});
module.exports=mongoose.model("data",dataSchema);