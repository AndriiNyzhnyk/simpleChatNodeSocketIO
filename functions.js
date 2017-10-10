exports.timeSendMessage = () => {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(day < 10) day = "0" + day;

    if(month < 10) month = "0" + month;

    if(hours < 10) hours = "0" + hours;

    if(minutes < 10) minutes = "0" + minutes;

    return day + "." + month + "." + year + "_" + hours + ":" + minutes;
};

let countUser = 0;
exports.registerClient = (value) => {
    if(value === true) {
        countUser++;
    } else {
        countUser--;
    }
};

exports.countUser = () => {
    return countUser;
};