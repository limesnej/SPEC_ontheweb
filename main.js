const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http); // bind socket io to our server


app.use(express.static('public')); // send index.html page on GET /

io.on('connection', function(socket){ // listening for the connection event and log it
    console.log('a user connected');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort ('COM4', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));






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
    
    io.sockets.emit('thedata', {date: today.getDate()+"-"+today.getMonth() + 1 +"-"+today.getFullYear(), time: (today.getHours())+':'+(today.getMinutes())+':'+(today.getSeconds()),co:CO, temperature:temp, moist:RH});
});

