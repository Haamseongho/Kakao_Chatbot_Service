/**
 * Created by haams on 2017-10-02.
 */
var MjpegCamera = require("mjpeg-camera");
var FileOnWrite = require("file-on-write");
var fs = require("fs");
var express = require("express");
var router = express.Router();
// 파일 생성을 위한 쓰기용 스트림 형태 만들기

module.exports = function (router) {
    var fileWriter = new FileOnWrite({
        path: "./frames",
        ext: ".jpeg",
        filename: function (frame) {
            return frame.name + '-' + frame.time;
        },
        transform: function (frame) {
            return frame.data;
        }
    });

// MjpegCamera 객체 만들기
    var camera = new MjpegCamera({
        name: 'cadi',
        user: 'admin',
        password: '123123',
        url: 'http://52.79.81.53:2721/photo',
        motion: true
    });

    camera.pipe(fileWriter);

    camera.start();

    setTimeout(function () {
        camera.stop();

        camera.getScreenshot(function (err, frame) {
            fs.writeFile('hurt.jpeg', frame, process.exit);
        });
    }, 60 * 60 * 1000);
};
