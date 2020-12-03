const io = require('socket.io')(8000);
const fs = require('fs');

const users = {};

let badWordsRecord = {
    'a':'badwordfiles/a.txt',
    'b':'badwordfiles/b.txt',
    'd':'badwordfiles/d.txt',
    'e':'badwordfiles/e.txt',
    'f':'badwordfiles/f.txt',
    'g':'badwordfiles/g.txt',
    'h':'badwordfiles/h.txt',
    'i':'badwordfiles/i.txt',
    'j':'badwordfiles/j.txt',
    'k':'badwordfiles/k.txt',
    'l':'badwordfiles/l.txt',
    'm':'badwordfiles/m.txt',
    'n':'badwordfiles/n.txt',
    'o':'badwordfiles/o.txt',
    'p':'badwordfiles/p.txt',
    'q':'badwordfiles/q.txt',
    's':'badwordfiles/s.txt',
    't':'badwordfiles/t.txt',
    'u':'badwordfiles/u.txt',
    'v':'badwordfiles/v.txt',
    'w':'badwordfiles/w.txt',
};

io.on('connection',socket =>{
    socket.on('new-user-joined',(name)=>{
        name = fs.readFileSync('C:/xampp/htdocs/shubh/Gossip/user.txt','utf8');
        console.log("new user",name);
        users[socket.id] = name;
        socket.emit('append-active-users',users,socket.id);
        socket.broadcast.emit('user-joined',name,users);
    });
    
    socket.on('send',message =>{
        let flag = 0;
        let pvtSocket;
        if(message.substr(0,3) === '/w '){
            message = message.substr(3);
            let gap = message.indexOf(' ');
            if(gap !== -1){
                const usertoSendTo = message.substr(0,gap);
                message = message.substr(gap + 1);
                let keys = Object.keys(users);
                keys.forEach(val=>{
                    // console.log(val);
                    if(users[val] === usertoSendTo){
                        pvtSocket = val;
                        flag = 1;
                        console.log('a whisper event occurred');
                    }
                });
                if(!flag)
                    console.log('Enter a valid user');     
            }
            else{
                console.log('Please enter a msg to whisper');
            }
        }
        let msg = message.split(" ");
        try{
            msg.forEach((value)=>{
                // console.log(data1);
                const key = value[0].toLowerCase();
                if(key in badWordsRecord){
                    const filePath = badWordsRecord[key];
                    const data = fs.readFileSync(filePath, 'utf8');
                    const words = data.split(" ");
                    const pos = words.indexOf(value.toLowerCase());
                    if(pos !== -1){
                        msg[msg.indexOf(value)] = "***";
                    }
                }
            });
        } catch(err){
            console.error(err);
        }
        message = msg.join(" ");
        console.log(message);
        if(!flag)
            socket.broadcast.emit('recieve',{message: message, name: users[socket.id]});
        else{
            io.to(pvtSocket).emit('whisper',{message: message, name: users[socket.id]});
        }
    });

    socket.on('disconnect',()=>{
        console.log(users[socket.id],'disconnected');
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
    });
});