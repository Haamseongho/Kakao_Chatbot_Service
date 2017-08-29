/**
 * Created by haams on 2017-08-29.
 */
const request = require("request");
const quest2 = {};
var message = require("../message");
var Response = require("../../models/responseDB");
/*
 DB에서
 */
quest2.choseMenu = function (req, content, cb) {
    switch (content) {
        case message.buttons[0] : // 어디가 아픈지 부위 체크! /* 이 부분은 버튼으로 진행 */
            /*
             DB에서 부위별 명칭 뽑아오기 (query문 -- err시 콜백으로 err 그리고 성공 시 result로 값 Json 형식 파싱 후 버튼으로 전송)
             */
            cb(err, message.baseType(JSON.parse(result)));
            break;

        case message.buttons[1]: // 현재 위치 상 가까운 병원 전체 나열
            /*
             현재 위치 뽑아와서 위치 정보 체크 / 병원 위도 경도 체크 한 뒤 find로 다 찾기
             병원 이름 (text) / 병원 소개 (label) / 병원 홈페이지 (url)
             */
            cb(err, message.labelMessage(JSON.parse(result.name), JSON.parse(result.intro), JSON.parse(result.url)));
            break;

        case message.buttons[2]: // 내가 가야할 곳 근방의 병원 나열
            /*
            가야할 위치 --> Text로 쓰기
             */
            message.buttons
    }
};