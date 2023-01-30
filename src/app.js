const express=require("express");
const Student=require("./db/student")
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://moaz:moaz@cluster0.b8mbysh.mongodb.net/myDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});
const app=express();
app.use(express.json())
const port=process.env.PORT || 3000;
app.get('',(req,res)=>{
    res.send('hello from moaz');
})
app.post('/register',(req,res)=>{
    try {
        console.log(req.body);
        const user=new Student(req.body);
        user.save();
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})
app.get('/student',async (req,res)=>{
    const users=await Student.find();
    res.send(users)
})
app.get('/student/:id',async (req,res)=>{
    console.log(req.params.id);
    const _id=req.params.id
    const user= await Student.findById(_id)
    if(!user){
      res.send('user not found!')
    }else{
        console.log(user)
        res.send(user)

    }
    
    
})

app.listen(port,()=>{
    console.log('connection setup at port number '+port);
})