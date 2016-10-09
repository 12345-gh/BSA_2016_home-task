(function(){
    var nameButton = $('#nameButton'),
        nameInput = $('#nameInput'),
        messages = $('#messages'),
        text = $('#text'),
        textSubmit = $('#textSubmit');

    var userName = 'DefaultUser';
    var socket = io.connect();

    nameButton.click(function() {
        userName = (nameInput.val() || 'DefaultUser') + 'checkname';
        socket.emit('chat user name', userName);
    });

    textSubmit.click(function() {
        var data = {
            name: userName,
            text: text.val(),
            date: new Date().toLocaleTimeString()
        };

        text.val('');
        socket.emit('chat message', data);
    });

    socket.on('chat history', function(msg) {
        for(var i in msg) {
            if(msg.hasOwnProperty(i)) {
                messages.append($('<li class="history">').text(msg[i].name + ': ' + msg[i].text + '[' + msg[i].date + ']'));
            }
        }
    });

    socket.on('chat message', function(msg) {
        if (userName == msg.name) {
            messages.append($('<li class="user-masseges">').text(msg.name + ': ' + msg.text + '[' + msg.date+ ']'));
        } else {
            messages.append($('<li class="chat-masseges">').text(msg.name + ': ' + msg.text + '[' + msg.date+ ']'));
        }
    });

    socket.on('chat user name', function(res) {
        if ((res.result == 1) && (res.name == userName)) {
            alert("This name already used!");
        } else {
            userName=userName.replace("checkname","");
            nameButton.addClass("hide");
        }
    });
})();