const express = require('express');
const app = express();
// const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port1 = process.env.PORT || 3000;
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort ('COM4', {baudRate: 9600});
// const parser = port.pipe(new Readline({delimiter: '\n'}));
const dweetClient = require('node-dweetio');
const moment = require('moment');
const bodyParser = require('body-parser');
dweetio = new dweetClient();
const dweetThing = 'spec-co';




app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use((req, res)=> {
    res.status(404).json({
        message: 'Resource not found'
    });
});

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



http.listen(port1, function() {
    console.log(`listening on ${port1}`);
});









