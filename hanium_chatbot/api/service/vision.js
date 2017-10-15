/**
 * Created by haams on 2017-10-15.
 */
var vision = require("google-vision-api-client");
var requtil = vision.requtil;
var express = require("express");
var router = express.Router();
var jsonfile = "../path/to/cadiStudy-3f321767189b.json";


vision.init(jsonfile);

module.exports = function (router) {
    'use strict'
    router.post("/test", function (req, res, next) {
        const private_key = "AIzaSyAB7PWrM3MIwC1cD12SCJt3VEilk0pIZAE";
        const vision = require("node-cloud-vision-api");
        vision.init({auth: private_key});
        var imgPath = require("path").dirname(__dirname, "../photo/him.jpg");
        const request = new vision.Request({
            image: new vision.Image({
                url: 'http://cfile7.uf.tistory.com/image/2454B3495243D1CB11210D'
            }),
            features: [
                new vision.Feature("FACE_DETECTION", 1),
                new vision.Feature("LABEL_DETECTION", 10)
            ]
        });


        vision.annotate(request).then(function (response) {
            res.send(JSON.stringify(response.responses));
        }).catch(function (err) {
            console.log("error : " + err);
        });

        /*  var oauth2Client = new google.auth.OAuth2("102372015824417933085","d34b74821d8139773c1ae9150aec3cc0fdc9e53f"
         ,"https://accounts.google.com/o/oauth2/auth");
         */

        /*  var client = vision({
         credentials : require("../path/to/cadiStudy-3f321767189b.json").auth_uri
         });

         var source = {
         imgUri: imgUri
         };
         var image = {
         source: source
         };
         var type = vision.v1.types.Feature.Type.FACE_DETECTION;
         var featuresElement = {
         type: type
         };
         var features = [featuresElement];
         var requestsElement = {
         image: image,
         features: features
         };

         var requests = [requestsElement];
         client.batchAnnotateImages({requests: requests})
         .then(function (responses) {
         var response = responses[0];
         }).catch(function (err) {
         if (err) console.error(err);
         });
         */
        /*
         var imgUri = "../photo/him.jpg";
         var source = {
         imgUri: imgUri
         };

         var image = {
         source: source
         };

         var type = vision.v1.types.Feature.Type.FACE_DETECTION;

         var featureElement = {
         type: type
         };
         var features = [featureElement];
         var requestElement = {
         image: image,
         features: features
         };

         var requests = [requestElement];

         visionClient.labelDetection({requests: requests}).then(function (response) {
         var response = response[0];
         }).catch(function (err) {
         console.error((err));
         });*/
        /*    var vision = require("google-vision-api-client");
         var requtil = vision.requtil;

         vision.init(jsonfile);
         var d = requtil.createRequests().addRequest(
         requtil.createRequest("./photo/him.jpg")
         .withFeature("FACE_DETECTION", 3)
         .withFeature("LABEL_DETECTION:,2")
         .build());

         vision.query(d, function (err, result, d) {
         if (err) console.error(err);
         else {
         console.log(JSON.stringify(d));
         }
         });*/
    });
};
