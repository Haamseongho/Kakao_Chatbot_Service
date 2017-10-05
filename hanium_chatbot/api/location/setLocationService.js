/**
 * Created by haams on 2017-10-05.
 */
var express = require("express");
var router = express.Router();
var message = {};
/*
function setBtnGangNam() {
    message = {
        "message": {
            "text": "가야할 병원을 선택해주세요."
        },
        "keyboard": {
            "type": "buttons",
            "buttons": [
               */
                /*
                 동
                 */
                /*
                "개포동",
                "논현동",
                "대치동",
                "도곡동",
                "삼성동",
                "세곡동",
                "수서동",
                "신사동",
                "압구정동",
                "역삼동",
                "율현동",
                "일원동",
                "자곡동",
                "청담동"

            ]
        }
    };
}
*/

module.exports = function (router,name) {
    switch (name){
        case "강남구":
            console.log("호잇!");
           // setBtnGangNam();
            break;
    }
};

