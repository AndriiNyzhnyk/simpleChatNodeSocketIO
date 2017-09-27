$(document).ready(() => {
    let socket = io();
    $('form').submit(() => {
        socket.emit('chat message', $('#inputMessage').val());
        $('#inputMessage').val('');
        return false;
    });

    socket.on('chat message', (msg) => {
        date();
        $('#messages').append($('<li>').text(msg));
    });

    function date() {
        $.ajax({
            url: "date/",
            type: "GET",
            contentType: "text/plain",
            success: (date) => {
                $('#times').append($('<li>').text(date));
            }
        });
    }
});