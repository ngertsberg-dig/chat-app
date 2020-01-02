const router = require("express").Router();

router.get("/",(req,res)=>{
    const json = [{name:process.env}]
    res.json(json)
})

router.get('/getPort',(req,res)=>{
    const port = process.env.PORT || 8080;
    res.json({ port })
})

router.post('/setNickname',(req,res)=>{
    const { nickname } = req.body;
    req.session.nickname = nickname;
    res.json({ nickname })
    
    
})

router.get('/testSession',(req,res)=>{
    console.log(req.session)
})
module.exports = router;