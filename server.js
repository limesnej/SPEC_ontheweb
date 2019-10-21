const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort ('COM4', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));
const dweetClient = require('node-dweetio');
// const moment = require('moment');
const fs = require('fs');
dweetio = new dweetClient();




 

parser.on('data', function(data) {
    const dweetThing = 'spec-co';
    // let separ = data.split(", ");
    // let CO = separ[0];
    // let temp = separ[1];
    // let RH = separ[2];
    // const today = new Date();

    let str = data;
    // let str1 = str.replace(/\r?\n|\r/g, "");
    // let str2 = JSON.stringify(str);
    let str2 = str.replace(/\r?\n|\r/g, "");
    // let str3 = JSON.parse(str2);
    let str3 = JSON.stringify(str2);
    let str4 = JSON.parse(str3);
    
    // fs.appendFile('sensordata.txt', `\n${CO}, ${temp}, ${RH}, ${today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()}`, (err) =>{
    //     if (err) return console.log(err);
    //     console.log('The data was appended to file!');
    // });
    
    console.log(str4);

    const tweetMessage = {
        carb: str4.Co,
        temperature: str4.Temperature,
        moistness: str4.Humidity,
    };
    // // console.log(CO, temp, RH);
    

    dweetio.dweet_for(dweetThing, tweetMessage, (err, dweet)=> {
        if (err) {
            console.log('[Error]:', err);
        }
        if (dweet) {
            console.log(dweet.content);
        }
    });
});


