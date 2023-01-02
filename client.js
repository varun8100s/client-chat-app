const socket = io('https://retrochatserver.onrender.com');
const msgForm = document.getElementById('sendContainer');
const msgInput = document.getElementById('messageInput');
const msgContainer = document.getElementById('messageContainer');
const sendBtn = document.getElementById('sendButton');
const errorContainer = document.getElementById('errorContainer');
const typing = document.getElementById('typing');

// Use object destructuring to extract data from event object
socket.on('client-connected', (data) => {
  errorContainer.innerHTML = `<span style="color:rgb(0,250,250);">${data}</span><br><span style="color:white">Current User ID:</span> <span style="color:pink;">${socket.id}</span>`;
}); 

// Use object destructuring to extract data from event object
socket.on('broadcast', ({ id, message }) => {
  console.log({ id, message });
  const messageElement = document.createElement('div');
  messageElement.className = 'message-received';
  const span = document.createElement('span');
  span.innerText = message;
  span.style.color = 'white';
  messageElement.innerText = `${id} said:\n`;
  msgContainer.append(messageElement);
  msgContainer.append(span);

  // Scroll to bottom of message container after appending new message
  msgContainer.scrollTop = msgContainer.scrollHeight;
});

msgForm.addEventListener('submit', event => {
  // Prevent default form submit behavior
  event.preventDefault();
  const message = msgInput.innerText.trim();

  if (message.length > 500) {
    console.log('limit exceeded 500 characters');
    sendBtn.style.color = 'pink';
    sendBtn.innerText = 'Sending your moms measurements? 😂';
    setTimeout(() => {
      sendBtn.innerText = 'Send !';    
      sendBtn.style.color = 'white';
    }, 3000);
    return;
  }

  if (message !== '') {
    // Emit 'send-client-message' event to server with id and message data
    socket.emit('send-client-message', { id: socket.id, message });
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message-sent';
    messageElement.innerText = message;
    msgContainer.append(messageElement);
    
    // Clear input field and scroll to bottom of message container after sending message
    msgInput.innerText = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;
  } else {
    sendBtn.style.color = 'pink';
    sendBtn.innerText = 'Type something you retard 🤓';
    setTimeout(() => {
      sendBtn.innerText = 'Send !';
      sendBtn.style.color = 'white';
    }, 3000);
    return;
  }
});
