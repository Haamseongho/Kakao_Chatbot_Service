/**
 * Created by haams on 2017-08-29.
 */
var message = require("./message");
var express = require("express");
var router = express.Router();

module.exports = function (router) {
    router.get("/api/keyboard",function (req,res,next) {
        res.set({
            'content-type' : 'application/json'
        }).send(JSON.stringify(message.buttonsType()));
    });
    /*
    user_key => Kakao / 확인
     */
    var checkUserKey = (req,res,next)=> {
        if(req.body.user_key != undefined){
            next();
        }else{
            res.status(500).send({error : 'user_key is invalid'});
        }
    };

    router.post("/api/message",checkUserKey,function (req,res) {
        var _obj = {
            user_key : req.body.user_key,
            type : req.body.type, // 버튼
            content : req.body.content  // 버튼 내 내용물
        }
    })
};
