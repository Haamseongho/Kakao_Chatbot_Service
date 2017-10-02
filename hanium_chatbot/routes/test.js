var express = require("express");
var router = express.Router();

router.post("/test",function(req,res,next){
   var g_email = req.body.g_email;
   var name = req.body.name;
   console.log(g_email+"//"+name);
});
module.exports = router;
