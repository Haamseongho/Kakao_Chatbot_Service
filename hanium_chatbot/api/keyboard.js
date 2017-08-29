/**
 * Created by haams on 2017-08-29.
 */
var message = require("./message");
var express = require("express");
var router = express.Router();

module.exports = function (router) {
    router.get("/keyboard",function (req,res,next) {
        res.set({
            'content-type' : 'application/json'
        }).send(JSON.stringify(message.buttonsType()));
    });
    /*
    user_key => Kakao / 확인
     */
};
