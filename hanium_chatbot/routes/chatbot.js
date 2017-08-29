/**
 * Created by haams on 2017-08-25.
 */
const express = require("express");
const router = express.Router();
const message = require("../service/message");
const db = require("../database/db");
var db_connect = new db(router);
var Keyboard = require("../api/keyboard");


let keyboard = new Keyboard(router);


module.exports = router;