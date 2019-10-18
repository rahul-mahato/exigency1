const http = require('http');
const promise = require('promise');

function getMessage(nearbyDetails, details) {
    return new promise(
        resolve => {
            if (details.vehicle != 'NA') {
                message = `ALERT. ${nearbyDetails.HosName} and ${nearbyDetails.PoliceName} . user ${details.name} , Vehicle Number : ${details.vehicle}  and Phone No: ${details.Userphone} have been into an accident at https://www.google.com/maps/search/?api=1&query=${details.lat},${details.long}`;
                resolve(message);
            } else {
                message = `ALERT ${nearbyDetails.PoliceName} .User ${details.name} ,phone no. : ${details.Userphone} have been into an accident at https://www.google.com/maps/search/?api=1&query=${details.lat},${details.long}`;
                resolve(message)
            }
        }
    )

}
module.exports = async function sendText(hospital, details) {



    console.log(hospital);
    console.log(details);
    mobile1 = details.ph1;
    mobile2 = details.ph2;
    mobile3 = details.ph3;
    messages = await getMessage(hospital, details);
    console.log(messages);
    console.log(`MESSAGE WILL BE SENT TO ${mobile1} , ${mobile2}, ${mobile3}`);

    return;
    var options = {
        "method": "POST",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/v2/sendsms?country=91",
        "headers": {
            "authkey": "281712A9MXww3ibFZ5d09c950",
            "content-type": "application/json"
        }
    };

    var req = http.request(options, function(res) {
        var chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function() {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    console.log(messages);
    req.write(JSON.stringify({
        sender: 'EXIAID',
        route: '4',
        country: '91',
        sms: [{ message: messages, to: [`${mobile1}`, `${mobile2}`, `${mobile3}`] }]
    }));
    req.end();
    return messages;
}