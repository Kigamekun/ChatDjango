const text_box = '<li style=" margin-bottom: 10px;margin-top: 10px;" class="left float-left clearfix"><div class="avtar-pic w35 bg-pink"><span>{sender}</span></div><div style="border: 2px solid  cyan;" class="chat-info"><span class="message">{message}</span></div></li>';

let userState = ''

const userDiv = (senderId, receiverId, name, online) =>
    (`<a href="/user_list/${senderId}/${receiverId}" id="user${receiverId}" class="collection-item row"> 
        <div style="margin-top:5px;">
            <span class="title" style="font-weight: bolder">${name}</span>
            <span style="color: ${online ? 'green' : 'red'}; float: right">${online ? 'online' : 'offline'}</span>
        </div>
    </a>
    <hr>
    `)

function scrolltoend() {
    $('#board').stop().animate({
        scrollTop: $('#board')[0].scrollHeight
    }, 800);
}



function send(sender, receiver, message) {
    console.log("ngirim pesan ya lu ?");
    $.post('/api/messages', '{"sender": "' + sender + '", "receiver": "' + receiver + '","message": "' + message + '" }', function (data) {
        console.log(data);
        var box = text_box.replace('{sender}', "You");
        box = box.replace('{message}', message);
        $('#board').append(box);
        scrolltoend();
    })
}


function getUsers(senderId, callback) {
    console.log("ambil user mana aja yang ada");

    return $.get('/api/users', function (data) {
        console.log("ini data",data);
        if (userState !== JSON.stringify(data)) {
            userState = JSON.stringify(data);
            const doc = data.reduce((res, user) => {
                if (user.id === senderId) {
                    return res
                } else {
                    return [userDiv(senderId, user.id, user.username, user.online), ...res]
                }
            }, [])
            console.log("doc ini doc",doc);
            callback(doc)
        }
    })
}



function receive() {
    $.get('/api/messages/' + sender_id + '/' + receiver_id, function (data) {
        console.log("Ambil pesan ambil pesan woeee !");
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                
                var box = text_box.replace('<div class="avtar-pic w35 bg-pink"><span>{sender}</span></div>', '  <img style="border: 2px solid salmon;" src="https://accounts.ignitegki.com/storage/image/profile/85-1558177107.png" class="rounded" alt="Anonim">');
                box = box.replace('{sender}', data[i].sender);
                box = box.replace('{message}', data[i].message);
                box = box.replace('left float-left', 'right');
                box = box.replace('cyan', 'salmon');




                $('#board').append(box);
                scrolltoend();
            }
        }
    })
}