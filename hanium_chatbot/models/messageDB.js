/**
 * Created by haams on 2017-08-29.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    part : { type:String , default: "" },
    dest: { type:String , default: "" }
});

var Message = mongoose.model("Message",messageSchema);

messageSchema.methods.uploadPart = function(part,cb){
    this.model("Message").insert({part : part},cb);
};

messageSchema.methods.uploadDest = function (dest,cb) {
    this.model("Message").insert({dest:dest},cb);
};

module.exports = Message;