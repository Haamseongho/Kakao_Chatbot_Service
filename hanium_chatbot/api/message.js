/**
 * Created by haams on 2017-08-29.
 */
var message = {};

message.buttons = ['가야할 병원 분류를 선택', '가까운 병원 찾아가기'];
message.texts = "가야할 위치를 입력해주세요.";
message.textType = () => {
    return {
        type:"text",
        text : message.texts
    }
};

message.buttonsType = () => {
    return {
        type: "buttons",
        buttons: message.buttons
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

message.labelMessage = (text,label,url_button) =>{
    return {
        message : {
            text:text,
            message_button :{
                label:label,
                url:url_button
            }
        },
        keyboard:{
            type:'buttons',
            buttons:message.buttons
        }
    }
};

module.exports = message;
