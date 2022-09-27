const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }

    },
    Password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('Password'))
            {
                throw new Error("Password cannot contain Password")
            }
        }
    },
    //To save the tokens of everyuser 
    Tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
    
})

//now creating token for everyuser who siginup
//methods is used while dealing with documents basically instance of model


//this function will convert the password plain text to hash before saving it users collection
UserSchema.pre('save',async function(next){
    
    
    if(this.isModified('Password'))
    {
        this.Password=await bcrypt.hash(this.Password,8) 
        // console.log(this.Password)
    }
    next()
}) 


UserSchema.methods.generateAuthToken=async function(){
    try{

    const token=jwt.sign({_id:this._id.toString()},'PrathameshNaikisengineerandiamverygoodboy')
  
    this.Tokens=this.Tokens.concat({token:token})
    await this.save()
 
    }
    catch(error){
        console.log(error)
    }
    
}

const Usermodel = mongoose.model('User',UserSchema)

module.exports=Usermodel


 
 