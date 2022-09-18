const express = require('express')
const bookrouter=express.Router()
const {
  GetBook,
  updatebook,
  createBook,
  deletebook,
  serachBook
} = require('../controllers/BookController')

  bookrouter.get('/',GetBook)

  bookrouter.post('/',createBook)

  bookrouter.get('/:id',serachBook)

  bookrouter.patch('/:id',updatebook)

  bookrouter.delete('/:id',deletebook)

  module.exports = bookrouter