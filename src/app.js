const express=require("express");
const app=express();
app.use(express.json())
const port=process.env.PORT || 8000;
app.get('',(req,res)=>{
    res.send('hello api from moaz');
})
app.post('/student',(req,res)=>{
 res.send(req.body)
})

app.listen(port,()=>{
    console.log('connection setup at port number '+port);
})