const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const http = require('http').Server(app);
const socketIO = require('socket.io') 
const io = require('socket.io')(http);
const port1 = process.env.PORT || 3000;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort ('COM4', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));


// const server = express ()
//     .use((req, res) => res.sendFile(INDEX))
//     .listen(port1, () => console.log(`Listening on on ${port1}`));

// const io = socketIO(server);

// io.on('connection', (socket) => {
//     console.log('Client connected');
//     socket.on('disconnect', () => console.log('Client disconnected'));
// });


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public');
})

// app.use(express.static(__dirname + '/public')); // send index.html page on GET /

io.on('connection', function(socket){ // listening for the connection event and log it
    console.log('a user connected');

});

http.listen(port1, function() {
    console.log(`listening on ${port1}`);
});

// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort ('COM4', {baudRate: 9600});
// const parser = port.pipe(new Readline({delimiter: '\n'}));




parser.on('data', function(data) {
    
    
    let str = data;

    let separ = str.split(", ");
    let CO = separ[0];
    let temp = separ[1];
    let RH = separ[2];
    const today = new Date();
    
    fs.appendFile('sensordata.txt', `\n${CO}, ${temp}, ${RH}, ${today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()}`, (err) =>{
        if (err) return console.log(err);
        console.log('The data was appended to file!');
    });
    
    console.log(CO, temp, RH);
    
    io.emit('thedata', {date: today.getDate()+"-"+today.getMonth() + 1 +"-"+today.getFullYear(), time: (today.getHours())+':'+(today.getMinutes())+':'+(today.getSeconds()),co:CO, temperature:temp, moist:RH});
});

