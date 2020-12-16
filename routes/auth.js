const {Router} = require('express');
const User = require('../models/User');
const Session = require('../models/Sessions');
const jwt = require('jsonwebtoken');
const passwordHandler = require('../handlers/passwordHandler')
const cookieParser = require('cookie-parser');
const router = Router();


router.post('/test',(req,res)=>{

})

router.post('/register',async (req,res)=>{
    try {

        const {login,password,email} = req.body;

        const candidateExists = await User.findOne({login});
        const emailExists = await User.findOne({email});
        if(candidateExists || emailExists){
            res.send(400).json({message:`User with this data alredy exist`});
        }

        passwordHandler.hash(password).then(hashedPassword=>{
            const user = new User({login,password:hashedPassword,email});
            user.save();
        })



        res.status(201).json({message:"User created"});
    } catch (e) {
        throw e;
    }
})

router.post('/login',async (req,res)=>{
    try {
        const {login,password} = req.body;
        const user = await User.findOne({ login });

        if(!user){return res.status(400).json({message:"User not found"});}

        const isMatch = passwordHandler.compare(password,user.password)

        if(!isMatch){return res.status(400).json({message:"Invalid data"});}

        const token = jwt.sign(
            {userId: user.id,userName:user.login},
            'qweasdzxc123',
        )
        const session = new Session({token:token})
        session.save();

        res.cookie("token",token,{expires:new Date(Date.now() + 86400e3)})
        res.json({token,userId:user.id});
    } catch (e) {
        throw e;
    }
})

router.post('/verification',async (req,res)=>{
    const {token} = req.body;

    const check = await Session.findOne({token});
    if(check){
        res.status(200).json({isSessionEsist:true})
    }else{
        res.status(400).json({isSessionEsist:false})
    }
})
module.exports = router; 