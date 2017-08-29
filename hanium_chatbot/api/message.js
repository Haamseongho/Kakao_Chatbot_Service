/**
 * Created by haams on 2017-08-29.
 */
var message = {};

message.buttons = ['어디가 아프신가요?.? ', '현재 위치 상 가까운 병원들', '가야할 곳에서 가까운 병원들'];

message.buttonsType = () => {
    return {
        message: {
            "message": {
                "text": "안녕하세요 사용자에게 맞는 병원을 소개해주는 맞춤형 테라피 서비스 플랫폼 '헬프미닥터' 입니다. " +
                "단 세 가지 질문으로 사용자에게 맞는 병원을 소개해드립니다." + " 처음 응답형 버튼을 시작으로 질문에 답변해 주시기 바랍니다. "
                + " 감사합니다! "
            },
            "keyboard": {
                "type": "buttons",
                buttons: message.buttons
            }
        }
    }
};

message.baseType = (text) => {
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

module.exports = message;