/**
 * Created by haams on 2017-08-29.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    part : { type:String , default: "" },
    dest: { type:String , default: "" }
});


messageSchema.methods.uploadPart = function(part,cb){
    console.log("데이터 저장");
    this.model("Message").collection.insert({part : part},cb);
};

messageSchema.methods.uploadDest = function(dest,cb) {
    console.log("데이터 저장2");
    this.model("Message").collection.insert({dest:dest},cb);
};

messageSchema.methods.addrToLatLng = function (dest,cb) {
}
var Message = mongoose.model("Message",messageSchema);

module.exports = Message;
