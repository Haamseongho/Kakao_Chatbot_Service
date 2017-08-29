/**
 * Created by haams on 2017-08-26.
 */
var mongoose = require("mongoose");
var dbUrl = "mongodb://hanium_frontier:123123@ds161630.mlab.com:61630/hanium_frontier";
var Schema = mongoose.Schema;
var MongoClient = require("mongodb").MongoClient;
var server = require("mongodb").Server;


module.exports = function (router) {
    MongoClient.connect(dbUrl,function (err) {
        if(err) console.log("db is not connected");
        else{
            console.log("db is connected well");
        }
    });
};