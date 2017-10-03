/**
 * Created by haams on 2017-10-03.
 */
var express = require("express");
var router = express.Router();

router.get("/map",function (req,res,next) {
   res.render("map.ejs");
});

module.exports = router;