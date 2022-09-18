
const express = require('express')
const bodyParser = require('body-parser')
const bookmodel =require('../models.js/Bookschema.js')
const { isValidObjectId } = require('mongoose')
const app = express()
app.use(bodyParser.json())


const GetBook =async(req,res)=>{
    const books=await bookmodel.find({})

    try{
        res.status(200).send(books)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
}

const  createBook = async(req,res)=>{
    const Book=new bookmodel(req.body)

    try {
        await Book.save()
        res.status(200).send(Book)
    }
    catch(error){
        res.status(500).send(error)
    }
  }

  const updatebook =async(req,res)=>{

    try{
        const book=await bookmodel.findByIdAndUpdate(req.params.id,req.body)
        console.log(book)
        if(!book)
        {
            res.send("No item found");
        }
    }
    catch (error) {
        res.status(500).send(error);
      }

    res.send(`single book of ID:${req.params.id} is Updated`)
  }

  const deletebook = async(req,res)=>{
    try{
        const book=await bookmodel.findByIdAndDelete(req.params.id)
        console.log(book)
        if(!book)
        {
            res.send("No item found");
        }
    }
    catch (error) {
        res.status(500).send(error);
      }

    res.send(`single book of ID:${req.params.id} is Deleted`)    
  }

  const serachBook= async(req,res)=>{
     
    try{
    const data=await bookmodel.findById(req.params.id)
    res.json(data)
    }
    catch{
        res.status(500).json({message:error.message})
    }
  }

  module.exports={
    GetBook,
    updatebook,
    createBook,
    deletebook,
    serachBook
  }