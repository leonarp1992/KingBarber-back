import { Router } from "express";
import User from "../models/User";


const userApi = Router();

userApi.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json({success: true, users})
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

userApi.get('/barbers', async (req, res) => {
  try {
    const users = await User.find({rol: 'barber'}).populate('services');
    return res.json({success: true, users})
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

userApi.post('/create', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    
    let user = await User.findOne({email});
    console.log({user});
    if (user) {
      return res.json({success: false, message: 'Email no disponible'});
    }
    user = new User({name, email, password, rol: 'user'});
    await user.save();
    return res.json({success: true, user});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

userApi.post('/createBarber', async (req, res) => {
  try {
    const {name, email, password, services} = req.body;
    
    let user = await User.findOne({email});
    console.log({user});
    if (user) {
      return res.json({success: false, message: 'Email no disponible'});
    }
    user = new User({name, email, password, rol: 'barber', services});
    await user.save();
    return res.json({success: true, user});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});


export default userApi;