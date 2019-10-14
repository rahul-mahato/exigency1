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

router.post('/webAuth', async(req, res, next) => {
    console.log(req.body);
    res.writeHeader(200, { "Content-Type": "text/html" });
    var UserData = await asyncFunctions.checkAuthNo(req.body.authNo);
    if (UserData.length != 1) {
        res.end("INVALID AUTH NO");
        return;
    } else {
        console.log(UserData);

        detailsForText = {
            name: `${UserData[0].Fname} ${UserData[0].Lname}`,
            lat: req.body.lat,
            long: req.body.long,
            vehicle: UserData[0].vno,
            ph1: UserData[0].ecpn1,
            ph2: UserData[0].ecpn2,
            ph3: UserData[0].ecpn3,
        }
        messages = await findAllDetails(detailsForText);
        for (var i = 0; i < messages.length; i++) {
            res.write(messages[i]);
        }
    }
    res.end('');

})






router.post('/iotAuth', async(req, res) => {
    function findUserData() {
        return new promise(
            (resolve) => {

                UserModel.find({ IOTmac: req.body.mac }, (err, doc) => {
                    if (!err) {
                        resolve(doc);
                    } else {
                        console.log(err);
                    }
                });

            }
        )
    }
    console.log(req.body);

    res.writeHeader(200, { "Content-Type": "text/html" });

    UserData = await findUserData();


    if (UserData.length != 1) {
        res.end(`sent mac address ${req.body.mac}  is Not registered`);
        return;
    } else {
        console.log(UserData);

        detailsForText = {
            name: `${UserData[0].Fname} ${UserData[0].Lname}`,
            lat: req.body.lat,
            long: req.body.long,
            vehicle: UserData[0].vno,
            ph1: UserData[0].ecpn1,
            ph2: UserData[0].ecpn2,
            ph3: UserData[0].ecpn3,
        }
        messages = await findAllDetails(detailsForText);
        for (var i = 0; i < messages.length; i++) {
            res.write(messages[i]);
        }
    }
    res.end('');
});

module.exports = router;



async function findAllDetails(UserData) {
    const messages = [];
    const errors = [];


    var phone_number, name, place_id;


    var location = new LocationModel({
        latitude: UserData.lat,
        longitude: UserData.long
    });


    location.save((err, docs) => {
        if (err) {
            errors.push(JSON.stringify(err, undefined, 0));
            return;
        } else {
            messages.push("DATA POSTED SUCCESSFULLY : " + UserData.lat + " , " + UserData.long + " <br> ");
        }
    })
    latitude = UserData.lat;
    longitude = UserData.long;
    // 85.82736819029014    20.338958274723307

    var i = 0;
    //searching for hospitals nearby
    var data = await asyncFunctions.findplaceId(UserData.lat, UserData.long);
    while (!phone_number) {

        ///finding nearby places

        place_id = data.results[i].place_id;
        console.log("place_id = " + place_id + "<br>");



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
        if (!err)
            messages.push("<br>hospital added successfully <br>")
        else {
            console.log(err);
        }

    })




    messages.push("<br><h2>" + sendText(hospital, UserData) + "</h2><br>");



    messages.push("Hospital Name = " + name + "<br>");
    messages.push("Phone = " + phone_number + "<br>");
    messages.push("<br>MESSAGE SENT SUCCESSFULLY");

    return messages;




}