/**
 * Created by haams on 2017-08-25.
 */
const express = require("express");
const router = express.Router();
const db = require("../database/db");
var db_connect = new db(router);
var Keyboard = require("../api/keyboard");
var ResMessage = require("../api/res_message");


var keyboard = new Keyboard(router);
//var resMessage = new ResMessage(router);

module.exports = router;
