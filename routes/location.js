const asyncFunctions = require('./asyncFunctions');

const LocationModel = require('../models/LocationModel');
const UserModel = require('../models/User');
const https = require('https');
const express = require('express');
const hospitalModel = require('../models/hospitalCheckModel');
const router = express.Router();
const promise = require('promise');

const request = require('sync-request');
const sendText = require('./sendmessage');


router.get('/', (req, res) => {
    LocationModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.send(err);
        }
    })
});

router.get('/hospitals', (req, res) => {
    hospitalModel.find((err, doc) => {
        res.send(doc);
    })
})



router.post('/', async(req, res) => {
    console.log(req.body);

    var UserData;
    if (req.body.authNo) {
        UserData = await asyncFunctions.checkAuthNo(req.body.authNo);
        console.log(UserData);
        if (!UserData) {
            return;
        }
        console.log("checking");
    }

    var phone_number, name, place_id;

    console.log("DATA POSTED SUCCESSFULLY : " + req.body.lat + " , " + req.body.long + " <br>");

    var location = new LocationModel({
        latitude: req.body.lat,
        longitude: req.body.long
    });

    location.save((err, docs) => {
        if (err) {
            res.send(JSON.stringify(err, undefined, 0));
        }
    })
    latitude = req.body.lat;
    longitude = req.body.long;
    // 85.82736819029014    20.338958274723307

    var i = 0;
    //searching for hospitals nearby
    var data = await asyncFunctions.findplaceId(req.body.lat, req.body.long);
    while (!phone_number) {

        ///finding nearby places

        place_id = data.results[i].place_id;
        console.log("place_id = " + place_id);



        var det = await asyncFunctions.findPlaceDetails(place_id);
        console.log(det);

        name = det.result.name;
        phone_number = det.result.formatted_phone_number;
        i += 1;

    }
    var hospital = new hospitalModel({
        hname: name,
        phoneNumber: phone_number

    });



    hospital.save((err, docs) => {

        res.end(JSON.stringify(docs));

    })

    setTimeout(() => {

        detailsForText = {
            name: `${UserData.Fname} ${UserData.Lname}`,
            lat: req.body.lat,
            long: req.body.long,
            vehicle: UserData.vno
        }
        sendText(hospital, detailsForText);
    }, 2000);

    console.log("NAME = " + name);
    console.log("Phone = " + phone_number);
    res.end("MESSAGE SENT SUCCESSFULLY");





});

module.exports = router;