const bodyParser = require('body-parser')
const { application } = require('express')
const express = require('express')
const bcrypt=require('bcryptjs')
const Usermodel = require('../models/User')
const usermodel = require('../models/User')

const app = express()
app.use(bodyParser.json())



const AuthSignUp = async (req, res) => {
    const user = new usermodel(req.body)
    try {
        await user.generateAuthToken();
        await user.save()
        res.status(200).send({
            status: 200,
            message: "Successfully Registred",
            userData: user
        })
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error.message
        })
    }
}

const AuthSigin = async (req, res) => {

    try {
        const email=req.body.email
        const Password=req.body.Password

        const user= await usermodel.findOne({email:email})
        if(!user){
            throw  new Error('unable to Sigin in')
        }
        const ismatch=await bcrypt.compare(Password,user.Password)
        if(!ismatch)
        {
            throw  new Error('unable to Sigin in')
        }

        const token = await user.generateAuthToken()
        console.log(token)
        res.status(200).send({
            status: 200,
            message: 'Successfully Login',
            data: {
                userData: user, token
            }
        })
    } catch (error) {
        console.log("hello")
        res.status(400).send({
            status: 400,
            message: error.message,
            error: {
                error: error
            }
        })
    }
}

module.exports = {
    AuthSignUp,
    AuthSigin

}