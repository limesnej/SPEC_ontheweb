const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort ('COM4', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));
const dweetClient = require('node-dweetio');
// const moment = require('moment');
const fs = require('fs');
const dweetio = new dweetClient();




 

parser.on('data', function(data) {
    const dweetThing = 'spec-co-monitor';
    // let separ = data.split(", ");
    // let CO = separ[0];
    // let temp = separ[1];
    // let RH = separ[2];
    // const today = new Date();
    
    const str1 = data;
    
    // str2 = str1.replace(/\r?\n|\r/g, "");
    
    // let str3 = JSON.stringify(str1);
    // let str4 = str3.replace(/\\/g, "");
    // let str5 = str4.replace(/\"/g, "");
     let str5 = JSON.parse(str1);
    // let str6 = JSON.parse(str5);
    // fs.appendFile('sensordata.txt', `\n${CO}, ${temp}, ${RH}, ${today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()}`, (err) =>{
    //     if (err) return console.log(err);
    //     console.log('The data was appended to file!');
    // });
    
    console.log(str5);

    const tweetMessage = {
        carb: str5.Co,
        temperature: str5.Temperature,
        moistness: str5.Humidity,
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


