class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        // State variable to keep track of whether the chatbox is open or closed
        this.isOpen = false;

        // Array to store the messages
        this.messages = [];

        // Attach event listeners
       
    }
    


    // Method to toggle the chatbox
    toggleChatbox() {
        if (this.isOpen) {
            this.chatBox.style.display = 'none';
            this.isOpen = false;
        } else {
            this.chatBox.style.display = 'block';
            this.isOpen = true;
        }
    }

    // Method to send a message
    sendMessage() {
        // Get the message from the input field
        const message = this.messageInput.value;

        // Add the message to the messages array
        this.messages.push(message);

        // Clear the input field
        this.messageInput.value = '';

        // Log the messages to the console
        console.log(this.messages);
    }

    display(){
        const {openButton, chatBox, sendButton} = this.args;
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
            this.state = !this.state;
    
            if(this.state) {
                chatbox.classList.add('chatbox--active')
            } else {
                chatbox.classList.remove('chatbox--active')
            }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === ""){
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        // 'http://127.0.0.1:5000/predict'
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            console.log(r)
            let msg2 = {name: "Flori", message: r.answer};
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = ''
        }).catch((error) => {
          console.error('Error:', error);  
        })
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, number) {
            if (item.name === "Flori")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
