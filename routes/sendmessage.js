const http = require('http');


module.exports = function sendText(hospital, details) {
    const accountSid = 'ACa03920b3e49649b3069f407381e14bfe';
    const authToken = 'b1f4ac82cee572f2aecf1c1531666b2f';
    const client = require('twilio')(accountSid, authToken);
    console.log(hospital);
    console.log(details);
    mobile1 = details.ph1;
    mobile2 = details.ph2;
    mobile3 = details.ph3;
    messages = `ALERT. ${hospital.hname} . Our user ${details.name} , Vehicle Number : ${details.vehicle} have been into an accident in https://www.google.com/maps/search/?api=1&query=${details.lat},${details.long}`;

    client.messages
        .create({
            body: messages,
            from: '+14256290819',
            to: `+91${mobile1}`
        })
        .then(message => console.log(message.status)).catch((err) => {
            console.log(err);
        });

    client.messages
        .create({
            body: messages,
            from: '+14256290819',
            to: `+91${mobile2}`
        })
        .then(message => console.log(message.status)).catch((err) => {
            console.log(err);
        });
    client.messages
        .create({
            body: messages,
            from: '+14256290819',
            to: `+91${mobile3}`
        })
        .then(message => console.log(message.status)).catch((err) => {
            console.log(err);
        });


    // console.log(`MESSAGE WILL BE SENT TO ${mobile1} , ${mobile2}, ${mobile3}`);


    // var options = {
    //     "method": "POST",
    //     "hostname": "api.msg91.com",
    //     "port": null,
    //     "path": "/api/v2/sendsms?country=91",
    //     "headers": {
    //         "authkey": "298671AZzE55kDvJC5da3525c",
    //         "content-type": "application/json"
    //     }
    // };

    // var req = http.request(options, function(res) {
    //     var chunks = [];

    //     res.on("data", function(chunk) {
    //         chunks.push(chunk);
    //     });

    //     res.on("end", function() {
    //         var body = Buffer.concat(chunks);
    //         console.log(body.toString());
    //     });
    // });
    // console.log(messages);
    // req.write(JSON.stringify({
    //     sender: 'EXIAID',
    //     route: '4',
    //     country: '91',
    //     sms: [{ message: messages, to: [`${mobile1}`, `${mobile2}`, `${mobile3}`] }]
    // }));
    // req.end();
    // return messages;
}