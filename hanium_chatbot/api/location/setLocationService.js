/**
 * Created by haams on 2017-10-05.
 */
var express = require("expres");
var router = express.Router();

module.exports = function (router,name) {
    switch (name){
        case "강남구":
            console.log("강남구");
            break;

    }
}