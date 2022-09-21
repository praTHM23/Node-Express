const mongoose=require("mongoose")
const { Schema } = mongoose;

const AuthorSchema=new mongoose.Schema({
    
    AuthorName:{ 
        type:String,
        required:true
    },
    AuthorAddress:
    {
        type:String,
        required:true
    },
   
})

const BookSchema =new mongoose.Schema({ //creating instance of mongoose schema
    
    BookName:{
        type:String,
        required:true,
        
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    Price:{
        type:Number,
        validate(value){
            if(value < 0) throw new Error("Price cannot br in negative")
        }
    },
    timestamp:{
        type:Date,
        default: Date.now
    }

    
})
//bookcollection is class
const bookmodel = new mongoose.model("Book",BookSchema)
const authormodel=new mongoose.model("Author",AuthorSchema)

module.exports ={
    bookmodel,
    authormodel
}