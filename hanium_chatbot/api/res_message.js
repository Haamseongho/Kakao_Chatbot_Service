/**
 * Created by haams on 2017-08-29.
 */
var express = require("express");
var router = express.Router();
var Message = require("./message");
var message = {};
//var Question2 = require("./service/2nd_question");
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

    function hurt_part_check(){
	message = {
	   "message":{
		"text":"아픈 부위를 선택해주세요"
          } ,
           "keyboard":{
		"type" : "buttons",
                "buttons" : [
			"목",
                        "피부",
                        "코",
                        "눈",
                        "치아 / 잇몸",
                        "외상",
                        "정신 / 신경",
                        "내과",
                        "비뇨기과"
		] 
		
           }
        } 
    };

   function hos_close_here(){
	/*
	현재 위치 GPS 정보 뽑아오기 / DB에 저장된 병원 정보 중 위치랑 비교하기 (GEO-Coding 필요) (- 위도 / 경도로 바꿔서 매칭하기 위함) 
	*/
   }

   function hos_close_destination(){
	/*
	가야할 곳을 입력한다 - text => 주소로 입력될 경우 이를 GeoCoding을 통하여 위도/경도로 변경한 뒤 DB 내의 병원 정보와 비교 
        이 후에 가까운 곳의 병원 리스트를 가지고 온다.
	*/
	message = {
	   "message" : {
		"text":"가야할 곳 / 목적지를 적어주세요"
           },
	   "keyboard":{
		"type":"text"
	   }
        }

   }

    
    router.post("/message", checkUserKey, function (req, res) {
        const _obj = {
            user_key : req.body.user_key,
            type:req.body.type,
            content:req.body.content
        };

	if(_obj.content == "어디가 아프신가요?.?"){
	   console.log("첫 번째 버튼 클릭");
           hurt_part_check();
        }
	else if(_obj.content == "현재 위치 상 가까운 병원들"){
	   console.log("두 번째 버튼 클릭");
           hos_close_here();
        }
        else if(_obj.content == "가야할 곳에서 가까운 병원들"){
	   console.log("세 번째 버튼 클릭");
           hos_close_destination();
        }
	else {
	   console.log("버튼클릭 인식 실패");
	}

	res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(message));
    });
};

