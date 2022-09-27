const express=require('express')
const userRouter=express.Router()
const router=express.Router()

const {
    AuthSignUp,AuthSigin
}=require('../controllers/UserController')

userRouter.post('/',AuthSignUp)
router.get('/',AuthSigin)



module.exports=
{userRouter,router}