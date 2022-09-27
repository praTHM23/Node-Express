const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const {userRouter,router}=require('./src/routes/UserRoutes.js')
const { Router } = require('express')
const app =express()

app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb://localhost:27017/JWT",{
  useNewUrlParser:true,
  useUnifiedTopology:true
//   useFindAndModify:false
}).then(()=>{
    console.log("connection Successful")
}).catch((err)=>{
    console.log(err)
})

app.use('/signup',userRouter)
app.use('/signin',router)


app.get('/',(req,res)=>{
    res.send("Hello You are at home")
})



app.listen(3000,()=>{
    console.log("listening to 3000")})