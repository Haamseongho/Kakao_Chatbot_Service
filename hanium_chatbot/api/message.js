/**
 * Created by haams on 2017-08-29.
 */
var message = {};

message.buttons = ['어디가 아프신가요?.? ', '현재 위치 상 가까운 병원들', '가야할 곳에서 가까운 병원들'];

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

module.exports = message;
