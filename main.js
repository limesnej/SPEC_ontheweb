const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port1 = process.env.PORT || 3000;
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort ('COM4', {baudRate: 9600});
// const parser = port.pipe(new Readline({delimiter: '\n'}));
const dweetClient = require('node-dweetio');
const moment = require('moment');

dweetio = new dweetClient();
const dweetThing = 'spec-co';






io.on('connection', function(socket){ // listening for the connection event and log it
    console.log('a user connected');

});

dweetio.listen_for(dweetThing, (dweet)=> {
    const data = {
        sensorData: dweet.content,
        time: moment().format('HH:mm:ss')
    };
    io.emit('sensor-data', data);
})



app.use(express.static(__dirname + '/public')); // send index.html page on GET /

http.listen(port1, function() {
    console.log(`listening on ${port1}`);
});








