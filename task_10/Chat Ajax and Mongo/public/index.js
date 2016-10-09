(function(){
    var nameButton = document.getElementById('nameButton'),
        nameInput = document.getElementById('nameInput'),
        messages = document.getElementById('messages'),
        historyMessages = document.getElementById('history-messages'),
        text = document.getElementById('text'),
        textSubmit = document.getElementById('textSubmit'),
        lastHistoryMessage = 0;

    var userName = 'DefaultUser';
    nameButton.onclick = function() {
        userName = nameInput.value || 'DefaultUser';
    };

    textSubmit.onclick = function() {
        var data = {
            name: userName,
            text: text.value
        };

        text.value = '';
        ajaxRequest({
            method: 'POST',
            url: '/messages',
            data: data
        })
    };

    var ajaxRequest = function(options) {
        var url = options.url || '/',
            method = options.method || 'GET',
            callback = options.callback || function() {},
            data = options.data || {},
            xmlHttp = new XMLHttpRequest();

        xmlHttp.open(method, url, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.send(JSON.stringify(data));
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.status == 200 && xmlHttp.readyState === 4){
                callback(xmlHttp.responseText);
            }
        };
    };

    var	getData = function(history) {
        ajaxRequest({
            url: '/messages?lhm='+lastHistoryMessage,
            method: 'GET',
            callback: function(msg) {
                var msg = JSON.parse(msg);
                if (history == 1){
                    historyMessages.innerHTML = '';
                    for(var i in msg) {
                        if(msg.hasOwnProperty(i)) {
                            var el = document.createElement('li');
                            el.className += "history-masseges";
                            el.innerHTML = msg[i].name + ': ' + msg[i].text +
                                ' ['+new Date(parseInt(msg[i]._id.substring(0,8), 16 ) * 1000).toLocaleTimeString()+']';
                            historyMessages.appendChild(el);
                            lastHistoryMessage=msg[i].timestamp;
                        }
                    }
                } else {
                    messages.innerHTML = '';
                    for(var i in msg) {
                        if(msg.hasOwnProperty(i)) {
                            var el = document.createElement('li');

                            if (userName == msg[i].name) {
                                el.className += "user-masseges";
                            } else {
                                el.className += "chat-masseges";
                            }

                            el.innerHTML = msg[i].name + ': ' + msg[i].text +
                                ' ['+new Date(parseInt(msg[i]._id.substring(0,8), 16 ) * 1000).toLocaleTimeString()+']';
                            messages.appendChild(el);
                        }
                    }
                }
            }
        });
    }


    getData(1);

    setInterval(function(){
        getData(0);
    }, 1000);

})();