const express=require('express')
const {
    getAllTasks,
    createTask,
    getTaskById,
    editTaskById,
    deleteTaskById,
    search

} =require('../controllers/taskController.js')

const taskRouter=express.Router()

taskRouter.get('/',getAllTasks)
taskRouter.post('/',createTask)

taskRouter.get('/:id',getTaskById)
taskRouter.put('/:id',editTaskById)
taskRouter.delete('/:id',deleteTaskById)


taskRouter.get('/search/:Key',search)

module.exports=taskRouter