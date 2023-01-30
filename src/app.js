const express=require("express");
const bcrypt = require('bcrypt');
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
        const password=req.body.password;
        console.log(password);
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({ error: err });
            }
            const user= new Student({
                firstname:req.body.firstname,
                secondname:req.body.secondname,
                password:hash,
                phonenumber:req.body.phonenumber,
                address:req.body.address,
            });
            
        user.save().then(()=>{
            const message={
                success:true,
                token:hash,
                message:"User register successfully!"
            }
            res.send(JSON.stringify(message))
        }).catch((er)=>{
            if (er.code==11000) {
                const error={
                    success:false,
                    message:"Phone number already exist!"
                }
                res.status(400).send(JSON.stringify(error));
                
            } else {
                res.status(400).send(er)
            }
           
        })
           
          });
       
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