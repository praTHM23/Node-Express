const express =require('express')
const router=express.Router()
const {  createPerson,
    getpeople,
    updateperson,
    deleteperosn
  } = require('../controllers/people.js')



router.get('/',getpeople)
router.post('/',createPerson)
router.put('/:id',updateperson)
router.delete('/:id',deleteperosn)
    

module.exports=router