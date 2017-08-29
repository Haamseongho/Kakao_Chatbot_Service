/**
 * Created by haams on 2017-08-25.
 */
let message = {};

message.baseType = function (text) {
    return {
        message: {
            text: text
        }, keyboard: {
            type: "text",
            text:message.text
        }
    }
};
message.sendText = function () {
    return {
        message:{

        }
    }
}

module.exports = message;