/**
 * Created by haams on 2017-08-29.
 */
var message = {};

message.buttons = ['아픈 부위' , '종합 병원'];

message.buttonsType = () => {
    return {
        type : 'buttons',
        buttons : message.buttons
    }
};

message.baseType = (text) =>{
    return {
        message :{
            text:text,
        },
        keyboard:{
            type:'buttons',
            buttons : message.buttons
        }
    }
};

module.exports = message;