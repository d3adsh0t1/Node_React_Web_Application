const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// user signup 
router.post('/user/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token =await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// user login
router.post('/user/login',async(req,res)=>{
    try{
      const user = await User.findByCredentials(req.body.email,req.body.password)
      const token=await user.generateAuthToken()
      res.send({user,token})
    }catch(e){ 
      res.status(400).send()
    }  
  })

// user logout
router.post('/user/logout',auth,async(req,res)=>{
    try{
      req.user.tokens = req.user.tokens.filter((token)=>{
          return token.token!== req.token

      })
      await req.user.save()
      console.log("Logout Successfully.")
      res.send("Logout Successfully.")
     } catch(e){
        res.status(500).send()
    }
})


module.exports = router