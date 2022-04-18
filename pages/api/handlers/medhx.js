//import connectDB from '../../../config/connectDB'
import History from '../../../models/hxModel'
import { getSession } from 'next-auth/client'

//connectDB()

export default async function handler(req, res){
  switch(req.method){
    case "POST":
      await createHx(req, res)
      break;
    case "GET":
      await getHx(req, res)
      break;
  }
}

const createHx = async (req, res) => {
  try {
    const session = await getSession({req})
    if(!session){
      return res.status(400).json({msg: "Invalid Authentication!"}) 
    }

    const { userId } = session
    const { history } = req.body

    if(!todo)
      return res.status(400).json({msg: "Add task."}) 
    
    const newHx = new History({
      name: history.toLowerCase(),
      user: userId
    })

    await newHx.save()
    res.json({msg: 'Successfully added a new task!'})
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

const getHx = async (req, res) => {
  try {
    const session = await getSession({req})
    if(!session){
      return res.status(400).json({msg: "Invalid Authentication!"}) 
    }

    const { userId } = session

    const medHx = await History.find({ user: userId })
    res.json(medHx)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}