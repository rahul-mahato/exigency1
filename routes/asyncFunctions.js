const https = require('https');
const promise = require('promise');

const UserModel = require('../models/User');


module.exports.checkAuthNo = async function checkAuthNo(authNo) {
    return new promise((resolve, reject) => {
        UserModel.find({ authNo: authNo }, (err, docs) => {
            if (err) {
                console.log(err);
            }
            if (docs.length < 1) {
                console.log("incorrect authNo");

                ////////////////////send that the authentication number is incorrect

            } else {
                ///////
                resolve(docs[0])
            }
        })
    })
}

module.exports.findplaceId = async function findplaceId(latitude, longitude) {
    return new promise((resolve, reject) => {
        https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&keyword=hospital&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk`,
            resp => {
                rawData = '';
                resp.on('data', (chunk) => {
                    rawData += chunk;
                });
                resp.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            });
    });
}


module.exports.findPlaceDetails = async function findPlaceDetails(place_id) {

    return new promise((resolve, reject) => {
        https.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,formatted_phone_number&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk`,
            resp => {
                rawData = '';
                resp.on('data', (chunk) => {
                    rawData += chunk;
                });
                resp.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            });
    });


}