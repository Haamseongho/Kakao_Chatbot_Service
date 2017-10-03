/**
 * Created by haams on 2017-08-29.
 */
var express = require("express");
var router = express.Router();
var Message = require("./message");
var message = {};
var MessageDB = require("../models/messageDB");
var index = 0;
var assert = require("assert");
// part / dest 저장
var mapNum1 = new Map();
var setImgCam1 = {};
var setImgCam2 = {};
//var Camera = require("./service/camera");


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

    function hurt_part_check() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     병원 분류해서 15개로 추려서 정리할 것
                     */
                    "직접 촬영하여 아픈 부위 알리기",
                    "대표 이미지로 아픈 부위 알리기"
                ]
            }
        };

        mapNum1.set(setImgCam1, message.keyboard.buttons[0]);
        mapNum1.set(setImgCam2, message.keyboard.buttons[1]);

    };

    function hos_close_here() {
        /*
         현재 위치 GPS 정보 뽑아오기 / DB에 저장된 병원 정보 중 위치랑 비교하기 (GEO-Coding 필요) (- 위도 / 경도로 바꿔서 매칭하기 위함)
         */
        sendLocNowInfo();
    }

    function hos_close_destination() {
        /*
         가야할 곳을 입력한다 - text => 주소로 입력될 경우 이를 GeoCoding을 통하여 위도/경도로 변경한 뒤 DB 내의 병원 정보와 비교
         이 후에 가까운 곳의 병원 리스트를 가지고 온다.
         */
        message = {
            "message": {
                "text": "가야할 곳 / 목적지를 적어주세요"
            },
            "keyboard": {
                "type": "text"
            }
        }
    }

    function sendLocNowInfo() {
        message = {
            "message": {
                "text": "현재 위치를 체크합니다.",
                "photo": {
                    "url": "http://cfile30.uf.tistory.com/image/223CD847573EC9F433D6A3",
                    "width": 640,
                    "height": 480
                },
                "message_button": {
                    "label": "현재 위치를 측정합니다. 버튼을 눌러주세요.",
                    "url": "http://map.daum.net/?eX=523953&eY=1084098&eName=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8C%90%EA%B5%90%EC%98%A4%ED%94%BC%EC%8A%A4"
                }
            }
        };
    };


    function save_second_reply(reply) {
        console.log("되낭?");
        var message2 = new MessageDB();

        if (index == 1) {
            /*
             message2.uploadPart(reply, function (err, message) {
             if (err) return console.log("부위 별 데이터 저장 실패");
             else {
             return console.log("부위 별 데이터 저장 성공");
             index = 0;
             }
             });
             */
            // reply --> 직접 촬영하여 아픈 부위 알리기 / 대표 이미지로 아픈 부위 알리기
            if (reply == mapNum1.get(setImgCam1)) {
                //               var camera = new Camera(router);

                // 카메라 연동 확인하기.

            } else if (reply == mapNum1.get(setImgCam2)) {

            } else {
                // Nothing to show..
            }

        } else if (index == 2) {
            /*
             GPS 정보 키면서 지도로 바로 연동
             */
            console.log("현재 위치 정보 보내기 완료");
            index = 0;

        } else if (index == 3) {
            message2.uploadDest(reply, function (err, message) {
                if (err) return console.log("목적지 데이터 저장 실패");
                else {
                    return console.log("목적지 데이터 저장 성공");
                    index = 0;
                }
            })
        }

    }


    router.post("/message", checkUserKey, function (req, res) {
        const _obj = {
            user_key: req.body.user_key,
            type: req.body.type,
            content: req.body.content
        };

        if (_obj.content == "가야할 병원 분류를 선택") {
            console.log("첫 번째 버튼 클릭");
            hurt_part_check();
            index = 1;
        }
        else if (_obj.content == "현재 위치 상 가까운 병원들") {
            console.log("두 번째 버튼 클릭");
            hos_close_here();
            index = 2;
        }
        else if (_obj.content == "가야할 곳에서 가까운 병원들") {
            console.log("세 번째 버튼 클릭");
            hos_close_destination();
            index = 3;
        }
        else {
            save_second_reply(_obj.content);
            console.log(_obj.content + " / " + "된당?");
        }

        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(message));
    });
};

