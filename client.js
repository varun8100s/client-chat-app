const socket = io(`https://retrochatserver.onrender.com`)
const msgForm = document.getElementById('sendContainer')
const msgInput = document.getElementById('messageInput')
const msgContainer = document.getElementById('messageContainer')
const errorContainer = document.getElementById('error-container')

    
    socket.on('client-connected', data => {
        console.log(data)
        errorContainer.innerHTML = `<span style="color:rgb(0,250,250);">${data}</span><br>Current User ID: <span style="color:pink;">${socket.id}</span>`
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
        userMessage.style = `color:yellow;`
        userMessage.innerText = "YOU: "
        userMessageSpan = document.createElement("span")
        userMessageSpan.style = "color:red;"
        userMessageSpan.innerText = message
        userMessage.appendChild(userMessageSpan)
        // msgContainer.append(document.createElement('br'))
        msgContainer.append(userMessage)
        msgInput.value = ""
        scrollToBottom(msgContainer); // The specif
    }
})

function appendMessage(message) {
    const messageID = document.createElement('span')
    const messageValue = document.createElement('span')
    messageID.innerHTML = message.id + ": "
    messageValue.innerText = message.msg
    messageID.style= " color: magenta;"
    msgContainer.append(messageID)
    msgContainer.append(messageValue)
    msgContainer.append(document.createElement('br'))
    msgContainer.scrollTop = msgContainer.scrollHeight 
}
 

socket.on("connect_error", (err) => {
    errorContainer.innerText="Can not connect to server"
    console.log(`connect_error due to ${err.message}`);
});


// To scroll to the bottom of a div
const theElement = msgContainer

const scrollToBottom = (node) => {
	node.scrollTop = node.scrollHeight;
}
