const router = require("express").Router();

router.get("/",(req,res)=>{
    const json = [{name:"nickey"}]
    res.json(json)
})

module.exports = router;