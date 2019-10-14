const http = require('http');


module.exports = function sendText(hospital, details) {

    console.log(hospital);
    console.log(details);
    mobile1 = "9078292231";
    mobile2 = "7438805030";
    mobile3 = "7749803313";
    messages = `hey hospital ${hospital.hname} user ${details.name} , Vehicle Number : ${details.vehicle} have been into an accident in latitude ${details.lat} and longitude ${details.long} 
    MAP - https://www.google.com/maps/search/?api=1&query=${details.lat},${details.long}`;



    return messages;
    var options = {
        "method": "POST",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/v2/sendsms?country=91",
        "headers": {
            "authkey": "298671AZzE55kDvJC5da3525c",
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

}