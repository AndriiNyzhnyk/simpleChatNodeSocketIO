let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let favicon = require('serve-favicon');
let path = require('path');
let func = require('./functions.js');
let helmet = require('helmet');

app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + "/public"));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');

require('./routes.js')(app);

io.on('connection', (socket) => {
    func.registerClient(true);
    io.emit('count user', func.countUser());

    socket.on('disconnect', () => {
        func.registerClient(false);
        io.emit('count user', func.countUser());
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

if(require.main === module){
    // Додаток запускається безпосередньо;
    // запускаємо сервер
    startServer();
} else {
    // Додаток імпортується як модуль
    // за допомогою "require"
    // експортуємо функцію для створення сервера
    module.exports = startServer;
}

function startServer() {
    server.listen(app.get('port'), () => {
        console.log( 'Express запущенний на http://localhost:' +
            app.get('port') + '; нажміть Ctrl+C для завершення.' );
    });
}