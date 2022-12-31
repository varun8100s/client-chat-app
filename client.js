const socket = io(`https://retrochatserver.onrender.com`);
const msgForm = document.getElementById('sendContainer')
const msgInput = document.getElementById('messageInput')
const msgContainer = document.getElementById('messageContainer')
const sendBtn = document.getElementById("sendButton");
const errorContainer = document.getElementById("errorContainer");
const typing = document.getElementById('typing')

    socket.on("client-connected", (data) => {
      console.log(data);
      errorContainer.innerHTML = `<span style="color:rgb(0,250,250);">${data}</span><br><span style="color:white">Current User ID:</span> <span style="color:pink;">${socket.id}</span>`;
    }); 


socket.on("broadcast", (data) => {
  console.log(data);
  let messageElement = document.createElement("div");
  messageElement.className = "message-received";
  let span = document.createElement('span')
  span.innerText = data.msg
  span.style.color="white"
  messageElement.innerText = data.id+" said:\n";
  msgContainer.append(messageElement);
  msgContainer.append(span)

  msgInput.innerText = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;
});

msgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = msgInput.innerText.trim();

  if (message.length > 500) {
    console.log("limit exceeded 500 characters")
    sendBtn.style.color = 'pink'
    sendBtn.innerText="Sending your moms measurements? 😂"
    setTimeout(() => {
      sendBtn.innerText = "Send !"    
      sendBtn.style.color = 'white'
    }, 3000)

    return;
  }

  if (message != "") {
    socket.emit("send-client-message", { id: socket.id, msg: message });
    
      let messageElement = document.createElement('div')
      messageElement.className = 'message-sent'
    messageElement.innerText = message
      msgContainer.append(messageElement)
      
      msgInput.innerText = "";
      msgContainer.scrollTop = msgContainer.scrollHeight;
    
  } else {
    sendBtn.style.color = "pink";
    sendBtn.innerText = "Type something you retard 🤓";
    setTimeout(() => {
      sendBtn.innerText = "Send !";
      sendBtn.style.color = "white";
    }, 3000);

    return;
  }
});



msgInput.addEventListener("input", (event) => {
  console.log("typing");
  socket.emit("typing", socket.id);
});


socket.on("someone-typing", (who) => {
  
  typing.innerText = who + " is typing ... "
  setTimeout(() => {
    typing.innerText = ""
  },2000)
 
});