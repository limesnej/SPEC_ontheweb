const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort ('COM4', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));
const dweetClient = require('node-dweetio');
const dweetio = new dweetClient();






parser.on('data', function(data) {
    const dweetThing = 'spec-co';
    let separ = data.split(", ");
    let CO = separ[0];
    let temp = separ[1];
    let RH = separ[2];
    const today = new Date();
    
    fs.appendFile('sensordata.txt', `\n${CO}, ${temp}, ${RH}, ${today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()}`, (err) =>{
        if (err) return console.log(err);
        console.log('The data was appended to file!');
    });
    
    

    const tweetMessage = {
        carb: CO,
        temperature: temp,
        moistness: RH,
    };
    // console.log(CO, temp, RH);
    

    dweetio.dweet_for(dweetThing, tweetMessage, (err, dweet)=> {
        if (err) {
            console.log('[Error]:', err);
        }
        if (dweet) {
            console.log(dweet.content);
        }
    });
});