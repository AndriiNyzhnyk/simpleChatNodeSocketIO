let func = require('./functions.js');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index.hbs');
    });

    app.get("/date", (req, res) => {
        res.send(func.timeSendMessage());
    });

    // Обробник 404 помилки
    app.use((req, res, next) => {
        res.status(404);
        res.render('404.hbs')
    });

    // Обробник 500 помилки
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        res.render('500.hbs');
    });

};