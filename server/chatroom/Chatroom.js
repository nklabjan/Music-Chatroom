const members = new Map();

let chatHistory = [];

function broadcastMessage(message) {
    members.forEach(m => m.emit('message_sent', message));
}

function addEntry(entry) {
    chatHistory = chatHistory.concat(entry);
}

function getChatHistory() {
    return chatHistory.slice();
}

function addUser() {
    
}
