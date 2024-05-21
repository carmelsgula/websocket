// script.js
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = event => {
  const message = document.createElement('p');
  message.textContent = event.data;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

sendButton.onclick = () => {
  const message = messageInput.value;
  if (message) {
    ws.send(message);
    const userMessage = document.createElement('p');
    userMessage.textContent = message;
    userMessage.className = 'user-message';
    chatWindow.appendChild(userMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    messageInput.value = '';
  }
};

messageInput.onkeypress = event => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
};
