const express=require('express');
const bodyParser = require('body-parser')
const app=express();
const mongoose=require('mongoose');
const cors = require('cors')
const moment=require('moment');
moment.createFromInputFallback = function(config) {
    // unreliable string magic, or
    config._d = new Date(config._i);
};
app.use(express.static('public'));
app.use(cors());
const Data=require('./models/data');
const fs = require('fs');
let rawdata = fs.readFileSync('alldata.json');
let allDataArr = JSON.parse(rawdata);
console.log(allDataArr[0]);
mongoose.connect('mongodb+srv://rudresh:hello123@cluster0.zo9x0.mongodb.net/radome?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.use(bodyParser.json());
// app.get("/add/alldata",async (req,res)=>{
//     try{
//         for(let i=0;i<allDataArr.length;i++){
//             let date=moment(allDataArr[i].Date,'DD-MM-YYYY');
//             // console.log(date);
//             let dataItem=new Data({
//                 date:date.format('DD-MM-YYYY'),
//                 month:date.format('M'),
//                 year:date.format('YYYY'),
//                 product:allDataArr[i].Product,
//                 country:allDataArr[i].Country,
//                 state:allDataArr[i].States,
//                 city:allDataArr[i].City,
//                 store:allDataArr[i].Stores,
//                 dept:allDataArr[i].Department,
//                 weekSales:allDataArr[i].Weekly_Sales
//             });
//             let newData=await dataItem.save();
//         }
//         res.send("inserted into Db");
//     }
//     catch(err){

//         res.send(err);
//     }
// });
app.post("/analyse/month",async (req,res)=>{
    try{
        let filter={
            month:req.body.month,
            year:req.body.year,
            product:req.body.product,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city,
            store:req.body.store,
            dept:req.body.dept,
        }
        
        let filteredData=await Data.find({
            month:filter.month,
            year:filter.year,
            product:filter.product,
            country:filter.country,
            state:filter.state,
            city:filter.city,
            store:filter.store,
            dept:filter.dept,
        }).exec();
        res.json({
            filteredData,
        })
    }
    catch(err){
        res.json({
            err
        });
    }
});
app.get("/thisweek/bolts",async (req,res)=>{
    try{
        let today=moment().format('DD-MM-YYYY');
        let datatoday=await Data.find({product:"Bolt",date:today}).exec();
        res.json({
            datatoday,
        });
    }
    catch(err){
        res.json({
            err:err
        });
    }
});
app.get("/thisweek/screws",async (req,res)=>{
    try{
        let today=moment().format('DD-MM-YYYY');
        let datatoday=await Data.find({product:"Screw",date:today}).exec();
        res.json({
            datatoday,
        });
    }
    catch(err){
        res.json({
            err:err
        });
    }
});
app.listen(8000,()=>{
    console.log("server runnning on port 8000");
});