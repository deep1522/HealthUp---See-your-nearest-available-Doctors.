const express=require("express");
const path=require("path");
var bodyParser = require('body-parser');
const app=express();
const port=80;
const fs=require("fs")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contacts');
}

//Defing mongoos schema

const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: String,
    Message: String,
    
});

var contact = mongoose.model('contact', contactSchema);






// app.use(express.static('static',options))
app.use('/static',express.static('static'))
app.use(express.urlencoded({extended:true}))

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('pcl2.pug',params);

})
app.get('/appointment',(req,res)=>{
    const params={}
    res.status(200).render('appointment',params);

})
app.get('/login',(req,res)=>{
    const params={}
    res.status(200).render('login',params);

})
app.get('/rehab',(req,res)=>{
    res.status(200).render('rehab.pug');

})
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    })
    
});


// app.post('/',(req,res)=>{
//     Name=req.body.Name
//     Email=req.body.Email
//     Phone=req.body.Phone
//     Message=req.body.Message
    
//     let outputtowrite=`The Name of user is ${Name},Email: ${Email},Phone no.-${Phone},Message : ${Message}`
//     fs.writeFileSync('User_contact.txt',outputtowrite)
    
//     const params={'message':'your form has been submited successfully'}
//     res.status(200).render('pcl2.pug',params)
// })


app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});