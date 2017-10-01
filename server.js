let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get("/date", (req, res) => {
    res.send(timeSendMessage());
});

io.on('connection', (socket) => {
    countClient(true);
    io.emit('count user', countUser);

    socket.on('disconnect', () => {
        countClient(false);
        io.emit('count user', countUser);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Обробник 404 помилки
app.use((req, res, next) => {
    res.status(404);
    res.type("text/plain");
    res.send("404");
});

// Обробник 500 помилки
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.type("text/plain");
    res.send("500");
});


server.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});

function timeSendMessage() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(day < 10) {
        day = "0" + day;
    }

    if(month < 10) {
        month = "0" + month;
    }

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    return day + "." + month + "." + year + "_" + hours + ":" + minutes;
}

let countUser = 0;
function countClient(value) {
    if(value === true) {
        countUser++;
    } else {
        countUser--;
    }
}