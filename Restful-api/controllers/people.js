let {people}=require('../Data.js')

const getpeople =(req,res)=>{
    res.status(200).json({people})
}

const createPerson =(req,res)=>{
    const {name,id}=req.body
    if (!name) {
        return res
          .status(400)
          .json({ success: false, msg: 'please provide name value' })
      }
    else{
    res.status(201).json({ success: true, data:[...people],name,id})
    }   
}

const updateperson= (req, res) => {
    const { id } = req.params
    const { name } = req.body
    console.log(req.params)
    const person = people.find((person) => person.id === Number(id))
  
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map((person) => {
      if (person.id === Number(id)) {
        person.name = name
      }
      return person
    })
    res.status(200).json({ success: true, data: newPeople })
  }

  const deleteperosn=(req, res) => {
    const {id}=req.params
    const person = people.find((person) => person.id === Number(id))
    //console.log(person)
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.filter((person)=>{
      return person.id !==Number(id)
      
    })
   
    return res.status(200).json({ success: true, data: newPeople })
  }

  module.exports= {
    createPerson,
    getpeople,
    updateperson,
    deleteperosn
  }