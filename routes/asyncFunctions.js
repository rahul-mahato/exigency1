const https = require('https');
const promise = require('promise');

const UserModel = require('../models/User');


module.exports.checkAuthNo = async function checkAuthNo(authNo) {
    return new promise((resolve, reject) => {
        UserModel.find({ authNo: authNo }, (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                ///////
                resolve(docs)
            }
        })
    })
}

module.exports.findplaceId = async function findplaceId(latitude, longitude) {
    return new promise((resolve, reject) => {
        // https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&keyword=hospital&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk&opennow`,
        https.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospitals+near+me&location=${latitude},${longitude}&rankby=distance&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk`,
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


module.exports.findplaceIdPolice = async function findplaceId(latitude, longitude) {
    return new promise((resolve, reject) => {
        https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=police&key=AIzaSyCZB0Xb0NHCfdEi8DpZGImUTHT80c9UpBk`,
            resp => {
                rawData = '';
                resp.on('data', (chunk) => {
                    rawData += chunk;
                });
                resp.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        // console.log(parsedData);
                        resolve(parsedData);
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            });
    });

}