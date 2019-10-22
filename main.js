const express = require('express');
const app = express();
// const fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port1 = process.env.PORT || 3000;
const moment = require('moment');
const bodyParser = require('body-parser');





app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'index.html');
// });

app.use((req, res)=> {
    res.status(404).json({
        message: 'Resource not found'
    });
});

io.on('connection', function(socket){ // listening for the connection event and log it
    console.log('a user connected');

});





http.listen(port1, function() {
    console.log(`listening on ${port1}`);
});









