const port = 3000
const socket = io(`https://retrochatserver.onrender.com/`)
const msgForm = document.getElementById('sendContainer')
const msgInput = document.getElementById('messageInput')
const msgContainer = document.getElementById('messageContainer')
const errorContainer = document.getElementById('error-container')
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
        const clientId = socket.id
        var connection = socket.emit('send-client-message', {id:clientId, msg:message})
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
}

