const router = require("express").Router();

router.get("/",(req,res)=>{
    const json = [{name:process.env}]
    res.json(json)
})

module.exports = router;