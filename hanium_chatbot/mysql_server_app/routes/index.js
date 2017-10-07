var express = require('express');
var router = express.Router();
var request = require('request');
var xml2js = require('xml2js');
var self = this;

/*
 subindex1 --> 전역으로 돌리는 방법을 써서 sCode를 0이 아닌 제대로 된 값을 나오도록 해야함
 */

function getSubIndex(index, callback) {
    return callback();
}
function setSubIndex(index, cb) {
    var subindex = index;
    //getSubIndex(index,cb);
}

function checkSCode(sgName, dgName) {
    var sCode = "";
    if (dgName != undefined) {
        if (sgName == "강남구") {
            sCode = 1 + dgName;
        } else if (sgName == "강동구") {
            sCode = 2 + dgName;
        } else if (sgName == "강북구") {
            sCode = 3 + dgName;
        } else if (sgName == "강서구") {
            sCode = 4 + dgName
        } else if (sgName == "관악구") {
            sCode = 5 + dgName;
        } else if (sgName == "광진구") {
            sCode = 6 + dgName;
        } else if (sgName == "구로구") {
            sCode = 7 + dgName;
        } else if (sgName == "금천구") {
            sCode = 8 + dgName;
        } else if (sgName == "노원구") {
            sCode = 9 + dgName;
        } else if (sgName == "도봉구") {
            sCode = 10 + dgName;
        } else if (sgName == "동대문구") {
            sCode = 11 + dgName;
        } else if (sgName == "동작구") {
            sCode = 12 + dgName;
        } else if (sgName == "마포구") {
            sCode = 13 + dgName;
        } else if (sgName == "서대문구") {
            sCode = 14 + dgName;
        } else if (sgName == "서초구") {
            sCode = 15 + dgName;
        } else if (sgName == "성동구") {
            sCode = 16 + dgName;
        } else if (sgName == "성북구") {
            sCode = 17 + dgName;
        } else if (sgName == "송파구") {
            sCode = 18 + dgName;
        } else if (sgName == "양천구") {
            sCode = 19 + dgName;
        } else if (sgName == "영등포구") {
            sCode = 20 + dgName;
        } else if (sgName == "용산구") {
            sCode = 21 + dgName;
        } else if (sgName == "은평구") {
            sCode = 22 + dgName;
        } else if (sgName == "종로구") {
            sCode = 23 + dgName;
        } else if (sgName == "중구") {
            sCode = 24 + dgName;
        } else if (sgName == "중랑구") {
            sCode = 25 + dgName;
        } else {
            sCode = "";
        }
    }else{
        sCode = sgName;
    }
    return {
        get: function () {
            return sCode;
        }
    };
}


var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'hospitalDB',
    user: 'root',
    password: '123123',
    version: 1.0
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected!!");
    /* var sql = "CREATE TABLE hospTable (id INT(100) NOT NULL AUTO_INCREMENT, name VARCHAR(255), category VARCHAR(255), address VARCHAR(255), lat DOUBLE, lng DOUBLE," +
     "telnum VARCHAR(255), sCode TEXT, PRIMARY KEY(id))";
     connection.query(sql, function (err, result) {
     if (err) throw err;
     else console.log("table is created");
     })*/
});


//var xmlTojson = require('../public/javascripts/xmlTojson');
/* GET home page. */
router.get('/', function (req, res, next) {


    var url = 'http://apis.data.go.kr/B551182/hospInfoService/getHospBasisList';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=2V8URRzQAAZfaTBnTgFWf12KOTDl7GSVHE0zuj%2BNdxQWlmmkolVfGLW%2BD4N%2FlyLxufw6ajrKM%2BXtAFTvUByBBQ%3D%3D';
    /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    /* 페이지번호 */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20000');
    /* 한 페이지 결과 수 */
    queryParams += '&' + encodeURIComponent('sidoCd') + '=' + encodeURIComponent('110000');
    /* 시도코드 */
    request({
        url: url + queryParams,
        method: 'get'
    }, function (error, response, body) {
        var parser = new xml2js.Parser();
        parser.parseString(body, function (err, result) {
            var data = result['response']['body'][0]['items'][0]['item'];

            for (var i = 0; i < data.length; i++) {
                // console.dir(data[i]['yadmNm'] + ' / ' + data[i]['clCdNm'] + ' / ' + data[i]['addr'] + ' / ' + data[i]['XPos'] + ' / ' + data[i]['YPos'] + ' / ' + data[i]['telno']);

                //console.log(data[i]['sgguCdNm'] + "," + data[i]['emdongNm']);
                /*   connection.query("INSERT INTO hospTable (name, category, address, lat, lng, telnum, sCode) VALUES (" + "'" + data[i]['yadmNm'] + "','"
                 + data[i]['clCdNm'] + "','" + data[i]['addr'] + "','" + data[i]['XPos'] + "','" + data[i]['YPos'] + "','" + data[i]['telno'] + "','" + sCode + "'"+");"
                 , function (err, result) {
                 if (err) throw err;
                 });*/
                console.log(checkSCode(data[i]['sgguCdNm'], data[i]['emdongNm']).get());
            }
            console.log(data.length);
        })
    });
    res.render('index', {title: 'Express'});
});


module.exports = router;
