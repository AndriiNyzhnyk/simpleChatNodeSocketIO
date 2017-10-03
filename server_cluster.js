//this module does not work correctly !!!
// use server.js !!!

let cluster = require('cluster');
function startWorker() {
    let worker = cluster.fork();
    console.log(`Cluster: worker ${worker.id} start`);
}
if(cluster.isMaster){
    require('os').cpus().forEach(() => {
        startWorker();
    });

// Записуємо в консоль всіх відключених виконавців.
// Якщо виконавець відключається, він повинен завершити роботу,
// ми почекаємо події "disconnect"
// для створення нового виконавця йому на заміну

    cluster.on('disconnect', (worker) => {
        console.log(`Cluster: worker ${worker.id} disconnect.`);
    });

// Коли виконавець завершує роботу,
// створюємо виконавця йому на заміну

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Cluster: worker ${worker.id} completed work` +
             `with the completion code ${code} ${signal}`);
        startWorker();
    });
} else {
// запускаємо server.js
    require('./server.js')();
}