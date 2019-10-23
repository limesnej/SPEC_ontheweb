const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort ('COM4', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));
const PubNub = require('pubnub');






const pubnub = new PubNub({
    ssl: true,
    　subscribe_key : 'sub-c-4e15e74e-f49f-11e9-ba7f-428dd4590e3f',                          
    　publish_key   : 'pub-c-34d8b93e-b537-4707-8350-d62c6eddb275'
    });
    

 

parser.on('data', function(data) {
    const str1 = data;
   
    let str5 = JSON.parse(str1);
    
    console.log(str5);  
    let message = str5;
    pubnub.publish({
        channel: 'hello_world',
        message: message,
        callback: function(e) { console.log("SUCCESS!", e);},
        error: function(e) { console.log ("FAILED! RETRY PUBLISH", e);}
    });
});

pubnub.subscribe({
    channel: "hello_world",
    callback: function(message) {
        console.log ( " > ", message);
    }
});

