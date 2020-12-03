const socket = io('http://localhost:8000');

const form = document.getElementById('send-form');
const messageInput = document.getElementById('msgInp');
const messageDisplay = document.querySelector('.message-box');

// let activeUsers = document.getElementById('active-users');
// let items = activeUsers.getElementsByTagName('LI');
// if(items.length){
//     items.addEventListener('click',()=>{
//         messageInput.value = '/w' + items.innerText;
//     });
// }

messageInput.onfocus = function(){
    messageInput.style.border = '3px solid red';
}

messageInput.onblur = function(){
    messageInput.style.border = 'none';
}


form.addEventListener('submit',(e)=>{
    const sentAudio = document.getElementById('sent-tone');
    e.preventDefault();
    const message = (messageInput.value).trim();

    if(message != ''){
        append(`You: ${message}`,'right');
        sentAudio.play();
        socket.emit('send',message);
        messageInput.value = '';
    }
});

const append = (message,position,pvt)=>{
    const newMessageElement = document.createElement('div');
    newMessageElement.innerText = message;
    // let ind = newMessageElement.indexOf(':');
    // let username = newMessageElement.substr(0,ind);
    if(position != 'center')
        newMessageElement.classList.add('msg');
    if(pvt)
        newMessageElement.style.fontStyle = 'italic';
    newMessageElement.classList.add(position);
    messageDisplay.append(newMessageElement);

    // newMessageElement.addEventListener('click',()=>{
    //     const deleteBtn = document.createElement('button');
    //     deleteBtn.value = "Delete Message";
    //     newMessageElement.appendChild(deleteBtn);
    // })
}

const name = '';

socket.emit('new-user-joined',name);

socket.on('user-joined',(name) =>{
    append(`${name} joined the chat`,'center',false);
    const userList = document.getElementById('active-users');
    const li = document.createElement('li');
    const username = document.createTextNode(name);
    li.appendChild(username);
    userList.appendChild(li);
});

socket.on('append-active-users',(users,socketId)=>{
    for(let key in users){
        if(key != socketId){
            const userList = document.getElementById('active-users');
            const li = document.createElement('li');
            const username = document.createTextNode(users[key]);
            li.appendChild(username);
            userList.appendChild(li);
        }
    }
});

socket.on('recieve',data =>{
    const recieveTone = document.getElementById('recieve-tone');
    setTimeout(() => {
        recieveTone.play();
    }, 2000);
    append(`${data.name}: ${data.message}`,'left',false);
});

socket.on('whisper',(data)=>{
    const pvtMsgTone = document.getElementById('pvtMsg-tone');
    setTimeout(() => {
        pvtMsgTone.play();
    }, 2000);
    append(`${data.name}: ${data.message}`,'left',true);
});

socket.on('user-disconnected',(name)=>{
    append(`${name} left the chat`,'center',false);

    const userList = document.getElementById('active-users');
    let items = userList.getElementsByTagName('li');
    for(let i = 0;i < items.length;i++){
        if(items[i].innerText === name){
            items[i].remove();
            break;
        }
    }
});
