const socket = io(`https://retrochatserver.onrender.com/`)
const msgForm = document.getElementById('sendContainer')
const msgInput = document.getElementById('messageInput')
const msgContainer = document.getElementById('messageContainer')
const errorContainer = document.getElementById('error-container')
const api = "a61a1e437ff97e646b8d5bde849927fd61e8bbe8f7517e40569a1370"
let IP, clientId
getClientIp()
socket.on('client-connected', data => {
    console.log(data)
    errorContainer.innerHTML = `<span style="color:rgb(0,250,250);">${data}</span><br>Current User ID: <span style="color:pink; font-size:large">${socket.id}</span>`
}) 


socket.on('broadcast', data => {
    console.log(data)
    appendMessage(data)
    
    
})
msgForm.addEventListener('submit', event => {
    event.preventDefault()
    const message = msgInput.value
    if (message != "") { 
        clientId = socket.id
        socket.emit('send-client-message', {id:clientId, msg:message})
        let userMessage = document.createElement("div")
        userMessage.style = "color:yellow;"
        userMessage.innerHTML=`<span style="color:red;">YOU:</span> ${message}`
        // msgContainer.append(document.createElement('br'))
        msgContainer.append(userMessage)
        msgInput.value = ""
    }
})

function appendMessage(message) {
    const messageID = document.createElement('span')
    const messageValue = document.createElement('span')
    messageID.innerHTML = message.id + ": "
    messageValue.innerHTML = message.msg
    messageID.style= " color: magenta;"
    msgContainer.append(messageID)
    msgContainer.append(messageValue)
    msgContainer.append(document.createElement('br'))
    msgContainer.scrollTop = msgContainer.scrollHeight 
}
 

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});


function getClientIp() {
    let request = new XMLHttpRequest();
    let response;
    request.open('GET', `https://api.ipdata.co/?api-key=${api}`);
    
    request.setRequestHeader('Accept', 'application/json');
    
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            IP = this.responseText
            socket.emit('client-ip',{id:clientId, ip:IP})
        }
    };
    
    request.send();
}
