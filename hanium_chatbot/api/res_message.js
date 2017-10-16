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
var subindex1 = 0;
var subindex2 = 0;
var subindex3 = 0;


var subIdxMap = new Map();
var sCode = "";
var NodeWebCam = require("node-webcam");
var sgguMap = new Map();

var mysql = require("mysql");
var locMsg = {};  // 리스트 뿌리기 (병원명)
var locArray = new Array(); // 병원 명 들어갈 배열
var hosListSize = undefined;
var connection = mysql.createConnection({
    host: 'helpdb.crqysrfu2n53.ap-northeast-2.rds.amazonaws.com',
    user: 'haams',
    password: 'abc123qw',
    database: 'helpDB',
    port: 3306,
    version: 1.0
});
//var Camera = require("./service/camera");


module.exports = function (router) {

// database connection

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
                    "사진으로 아픈 부위 알리기",
                    "아픈 부위 선택 하기"
                ]
            }
        };

        mapNum1.set(setImgCam1, message.keyboard.buttons[0]);
    };

    function hurt_part_select() {
        message = {
            "message": {
                "text": "아픈 부위를 선택해주세요"
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     병원 분류해서 15개로 추려서 정리할 것
                     */
                    "목",
                    "코",
                    "눈",
                    "심장",
                    "허리",
                    "팔목",
                    "발목",
                    "기관지",
                    "배",
                    "머리",
                    "위",
                    "간",
                    "장",
                    "주요부위"
                ]
            }
        };
    }

    function hurt_part_select_db_check(part) {
        console.log(part + "부위 다침");
        /*
         SQL 서버에서 쿼리문을 통해서 부위에 맞게 덴덴         */
    }


// 카메라 연동
    function cam_record_connection() {
        message = {
            "message": {
                "text": "보여질 부위 사진을 보내주세요"
            },
            "keyboard": {
                "type": "text"
            }
        };
    }


    function setLocation1() { // 구
        index = 2;
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    "강남구",
                    "강동구",
                    "강북구",
                    "강서구",
                    "관악구",
                    "광진구",
                    "구로구",
                    "금천구",
                    "노원구",
                    "도봉구",
                    "동대문구",
                    "동작구",
                    "마포구",
                    "서대문구",
                    "서초구",
                    "성동구",
                    "성북구",
                    "송파구",
                    "양천구",
                    "영등포구",
                    "용산구",
                    "은평구",
                    "종로구",
                    "중구",
                    "중랑구"
                ]
            }
        };
    }


    function sendLocNowInfo(lat, lng, name) {
        console.log("지도 연동까지는 되나..?");
        console.log(lat + " // " + lng + " // " + name);
        var latitude = (String(lat)).substr(0, 9);
        var longitude = (String(lng)).substr(0, 10);
        console.log(latitude + "/" + longitude);
        message = {
            "message": {
                "text": "현재 위치를 체크합니다.",
                "photo": {
                    "url": "http://cfile30.uf.tistory.com/image/223CD847573EC9F433D6A3",
                    "width": 640,
                    "height": 480
                },
                "message_button": {
                    "label": "위치 확인",
                    // "url":"http://map.daum.net/link/to/경희대학교병원,37.593774,127.050741"
                    "url": "http://map.daum.net/link/to/" + name + ",37.541235,127.072055"
                }
            }
        };
    };

    function setAddressReply(subindex1, reply2) {
        sCode = subindex1 + reply2;
        console.log(sCode);

        /*
         공공데이터 크롤링 시에 sCode를 스키마에 추가할 것 (구 : 번호 / 동 : 이름) == 구+번호 == sCode
         */
    }

    function send_hos_list(nameList, size) {
        // locArray - nameArray : 병원 이름 넣어둔 배열
        // reply -- 병원 명이 됨
        message = {
            "message": {
                "text": "선택 하신 위치에서 갈 수 있는 병원 리스트입니다. 선택 시에 해당 지역까지 길찾기 기능이 제공됩니다."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": nameList
            }
        }
    }

    function set_class_Code() {
        message = {
            "message": {
                "text": "병원 카테고리를 선택해 주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    "상급종합병원",
                    "전문병원",
                    "종합병원",
                    "병원",
                    "요양병원",
                    "의원",
                    "치과병원",
                    "조산원",
                    "보건소",
                    "보건지소",
                    "보건진료소",
                    "보건의료원",
                    "약국",
                    "한방종합병원",
                    "한방병원",
                    "한의원"
                ]
            }
        }
    }


    function save_second_reply(reply) {
        var message2 = new MessageDB();
        if (index == 1) {
            if (reply == "사진으로 아픈 부위 알리기") {
                // 두 번째 질문과 겹치지 않게 하기 위함.
                index = 3;
                cam_record_connection();
            }
            else if (reply == "아픈 부위 선택 하기") {
                index = 4;
                hurt_part_select();
            }
        } else if (index == 2) { // 두 번째 버튼 - 가야할 병원 선택
            index = 5;
            console.log(reply + "index 값 2일 때 ");

            switch (reply) {
                case "강남구": {
                    var time_index = 0;
                    subindex1 = 1;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);

                    break;
                }

                case "강동구": {
                    subindex1 = 2;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "강북구": {
                    subindex1 = 3;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "강서구": {
                    subindex1 = 4;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "관악구": {
                    subindex1 = 5;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "광진구": {
                    subindex1 = 6;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "구로구": {
                    subindex1 = 7;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "금천구": {
                    subindex1 = 8;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "노원구": {
                    subindex1 = 9;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "도봉구": {
                    subindex1 = 10;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "동대문구": {
                    subindex1 = 11;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "동작구": {
                    subindex1 = 12;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "마포구": {
                    subindex1 = 13;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "서대문구": {
                    subindex1 = 14;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "서초구": {
                    subindex1 = 15;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "성동구": {
                    subindex1 = 16;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "성북구": {
                    subindex1 = 17;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "송파구": {
                    subindex1 = 18;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "양천구": {
                    subindex1 = 19;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "영등포구": {
                    subindex1 = 20;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "용산구": {
                    subindex1 = 21;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "은평구": {
                    subindex1 = 22;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }
                case "종로구": {
                    subindex1 = 23;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "중구": {
                    subindex1 = 24;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }

                case "중랑구": {
                    subindex1 = 25;
                    sgguMap.set(subindex1, reply);
                    set_class_Code();
                    setTimeout(function () {
                        query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                            send_hos_list(nameList, size);
                        })
                    }, 300);
                    break;
                }
            }
            //  var setLocationService = new SetLocationService(router,reply);
        } else if (index == 3) {
            recognition_pic(reply);
        } else if (index == 4) {
            recognition_part(reply);
        } else if (index == 5) {
            setTimeout(function () {
                query_func(index, sgguMap.get(subindex1), reply, function (nameList, size) {
                    send_hos_list(nameList, size);
                })
            }, 1000);
            // find_hos_location(sgguMap.get(subindex1), reply);
        } else if (index == 6) {
            //index = 7;
            setTimeout(function () {
                find_hos_location(reply)
            }, 200);
            // 병원 이름 찍은것
        } else if (index == 7) {
            //          console.log(index + "값입니다.");
        } else if (index == 8) {
            console.log(reply);
        }
    }

    function find_hos_location(name) {
        console.log(name);
        connection.query("SELECT * FROM testTB2 WHERE name = " + "'" + name + "';", function (err, result, field) {
            if (err) {
                console.log("이 부분에서 index는 돌까요?");
                throw err;
            }
            else {
                var lat = new Array();
                var lng = new Array();
                for (var elem in result) {
                    lat.push(result[elem]['lng']);
                    lng.push(result[elem]['lat']);
                }

                sendLocNowInfo(lat[0], lng[0], name);
            }
        });
    }

// button 추가 될 경우 index를 다르게 하여 save_second_~~ 로 접근
    function send_hos_list(nameList, size) {
        // locArray - nameArray : 병원 이름 넣어둔 배열
        // reply -- 병원 명이 됨
        message = {
            "message": {
                "text": "선택 하신 위치에서 갈 수 있는 병원 리스트입니다. 선택 시에 해당 지역까지 길찾기 기능이 제공됩니다."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": nameList
            }
        };
        index = 6;
    }

    function recognition_pic(pic) {
        console.log(pic + "사진 경로 입니다.");

        message = {
            "message": {
                "text": "확인 중 입니다. 잠시만 기다려주세요."
            },
            "keyboard": {
                "type": "text"
            }
        };

        analyze_pictures(pic);
    }


    function analyze_pictures(pic) {
        'use strict';

        var labelBtn = [];
        var labelMsg = "";
        const private_key = "AIzaSyAB7PWrM3MIwC1cD12SCJt3VEilk0pIZAE";
        const vision = require("node-cloud-vision-api");
        vision.init({auth: private_key});
        const request = new vision.Request({
            image: new vision.Image({
                url: pic
            }),
            features: [
                new vision.Feature("LABEL_DETECTION", 10)
            ]
        });

        vision.annotate(request).then(function (response) {
            var tp1 = response['responses'][0]['labelAnnotations'][0].score; // top point 1
            var tp2 = response['responses'][0]['labelAnnotations'][1].score; // top point 2
            var dscp1 = response['responses'][0]['labelAnnotations'][0].description; // top description 1
            var dscp2 = response['responses'][0]['labelAnnotations'][1].description; // top description 2
            var nameArray = new Array();

            labelMsg += "인식 결과, 가장 높은 확률인 " + tp1 + "% 의 결과로 " + dscp1 + " 부위로 인식하였으며, " + "그 다음 높은 확률인 " + tp2 + "% 의 결과로 "
                + dscp2 + " 부위가 인식되었습니다. " + "관련된 병원 리스트를 지금 소개해 드리겠습니다.";
            console.log(dscp1 + " / " + dscp2);
            connection.query("SELECT * FROM testTB2 WHERE part IN (" + "'" + dscp1 + "','" + dscp2 + "'" + ");", function (err, result, field) {
                if (err) throw err;
                else {
                    for (var elem in result) {
                        nameArray[elem] = result[elem]['name'];
                    }


                    for (var i = 0; i < result.length; i++) {
                        labelBtn.push(nameArray[i]);
                    }
                    setTimeout(function () {
                        find_hos_list_by_img(labelMsg, labelBtn, function (err, message) {
                            if (err) throw err;
                            else {
                                console.log(JSON.stringify(message));
                                index = 8;
                            }
                        })
                    }, 2000)
                }
            });


            /*
             find_hos_list_by_img(labelMsg, labelBtn, function (err, message) {
             if (err) console.error(err);
             else {
             console.log(JSON.stringify(message));
             }
             });
             }, 2000);

             console.log(JSON.stringify(response.responses));
             index = 8;
             }).catch(function (err) {
             console.log("error : " + err);
             });
             */

        });
    }


    function find_hos_list_by_img(labelMsg, labelBtn, callback) {
        message = {
            "message": {
                "text": labelMsg
            },
            "keyboard": {
                "type": "buttons",
                "buttons": labelBtn
            }
        };
        return callback(message);
    }

    function recognition_part(part) {
        console.log(part + "입니다.");
        message = {
            "message": {
                "text": "선택한 부위를 잘하는 병원을 소개해드리겠습니다. 잠시만 기다려주세요."
            },
            "keyboard": {
                "type": "text"
            }
        };
        /*
         part 가지고 비교해주기..
         */
    }


    function query_func(index, gu, dong, callback, next) {
        if (index == 5) {
            connection.query("SELECT * FROM testTB2 WHERE id < 10 ;", function (err, result, field) {
                if (err) {
                    console.log("selection error");
                    throw err;
                } else {
                    // console.log(result.length + "사이즈 제공");

                    for (var elem in result) {
                        //console.log(result[elem]['name']);
                        locArray[elem] = result[elem]['name'];
                    }

                    var nameList = [];
                    for (var i = 0; i < result.length; i++) {
                        nameList.push(locArray[i]);
                    }
                    callback(nameList, result.length);
                    next;
                    //         send_hos_list(nameList, result.length);
                }
            });

            //   callback(index,gu,dong);
            //   return
        } else {
            console.log('skip .. indexing');
            next;
        }
    }


    router.post("/message", checkUserKey, query_func, function (req, res) {
        const _obj = {
            user_key: req.body.user_key,
            type: req.body.type,
            content: req.body.content
        };

        console.log(_obj.content);
        if (_obj.content == "가야할 병원 분류를 선택") {
            console.log("첫 번째 버튼 클릭");
            index = 1;
            hurt_part_check();
        }
        else if (_obj.content == "가까운 병원 찾아가기") {
            index = 0;
            console.log("두 번째 버튼 클릭");
            setLocation1();
            //hos_close_here();
        }

        else {
            //console.log('subindex1 : ' + subindex1);

            // 처음 들어갈 땐 subindex1은 0 이기에 아래 함수로 진행되고 아래 함수에서
            // 구를 선택할 경우 subindex1 값도 변경 되기에 setAddressReply로 넘어감
            // 동을 선택하도록 진행.

            console.log(index + "/" + _obj.content);

            save_second_reply(_obj.content);
        }

        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(message));
    });

    /*
     방 나갈 때 변수 초기화
     */

    router.delete("/chat_room/:user_key", function (req, res) {
        const user_key = req.params.user_key;
        index = 0;
        subindex1 = 0;
        subindex2 = 0;
        // 초기화
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify({success: true}));
    })
};

