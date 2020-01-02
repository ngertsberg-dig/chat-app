const router = require("express").Router();

router.get("/",(req,res)=>{
    const json = [{name:process.env}]
    res.json(json)
})

router.get('/getPort',(req,res)=>{
    const port = process.env.PORT || 8080;
    res.json({ port })
})

module.exports = router;