/**
 * Created by haams on 2017-08-29.
 */
var express = require("express");
var router = express.Router();
var Message = require("./message");
var message = {};
var Question2 = require("./service/2nd_question");
const msg1 = [Message.buttons];

module.exports = function (router) {

    var checkUserKey = (req, res, next) => {
        if (req.body.user_key != undefined) {
            console.log(req.body.user_key);
            next();
        } else {
            console.log("user key is not exist");
            res.status(500).send({error: 'user_key is invalid'});
        }
    };


    router.post("/message", checkUserKey, function (req, res) {
        const _obj = {
            user_key : req.body.user_key,
            type:req.body.type,
            content:req.body.content
        };
        var quest2 = new Question2();
        quest2.choseMenu(req,req.body.content,function (err,btnMsg) {
            if(err) console.log("버튼이 안눌림");
            else{
                quest3_msg();
            }
        });
        message = {
            "message": {
                "text": "두 번째 질문은 텍스트 형태 입니다."
            },
            "keyboard": {
                "type" : "text",

                // "type": "buttons",
                // "buttons": [
                //     "치과",
                //     "정형외과",
                //     "소아과",
                //     "이비인후과",
                //     "신경과",
                //     "내과"
                // ]
            }

        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(message));
    });
};
