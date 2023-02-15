"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chatbox =
/*#__PURE__*/
function () {
  function Chatbox() {
    _classCallCheck(this, Chatbox);

    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
      sendButton: document.querySelector('.send__button')
    }; // State variable to keep track of whether the chatbox is open or closed

    this.isOpen = false; // Array to store the messages

    this.messages = []; // Attach event listeners
  } // Method to toggle the chatbox


  _createClass(Chatbox, [{
    key: "toggleChatbox",
    value: function toggleChatbox() {
      if (this.isOpen) {
        this.chatBox.style.display = 'none';
        this.isOpen = false;
      } else {
        this.chatBox.style.display = 'block';
        this.isOpen = true;
      }
    } // Method to send a message

  }, {
    key: "sendMessage",
    value: function sendMessage() {
      // Get the message from the input field
      var message = this.messageInput.value; // Add the message to the messages array

      this.messages.push(message); // Clear the input field

      this.messageInput.value = ''; // Log the messages to the console

      console.log(this.messages);
    }
  }, {
    key: "display",
    value: function display() {
      var _this = this;

      var _this$args = this.args,
          openButton = _this$args.openButton,
          chatBox = _this$args.chatBox,
          sendButton = _this$args.sendButton;
      openButton.addEventListener('click', function () {
        return _this.toggleState(chatBox);
      });
      sendButton.addEventListener('click', function () {
        return _this.onSendButton(chatBox);
      });
      var node = chatBox.querySelector('input');
      node.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          _this.onSendButton(chatBox);
        }
      });
    }
  }, {
    key: "toggleState",
    value: function toggleState(chatbox) {
      this.state = !this.state;

      if (this.state) {
        chatbox.classList.add('chatbox--active');
      } else {
        chatbox.classList.remove('chatbox--active');
      }
    }
  }, {
    key: "onSendButton",
    value: function onSendButton(chatbox) {
      var _this2 = this;

      var textField = chatbox.querySelector('input');
      var text1 = textField.value;

      if (text1 === "") {
        return;
      }

      var msg1 = {
        name: "User",
        message: text1
      };
      this.messages.push(msg1); // 'http://127.0.0.1:5000/predict'

      fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: JSON.stringify({
          message: text1
        }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      }).then(function (r) {
        console.log(r);
        var msg2 = {
          name: "Sam",
          message: r.answer
        };

        _this2.messages.push(msg2);

        _this2.updateChatText(chatbox);

        textField.value = '';
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    }
  }, {
    key: "updateChatText",
    value: function updateChatText(chatbox) {
      var html = '';
      this.messages.slice().reverse().forEach(function (item, number) {
        if (item.name === "Sam") {
          html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
        } else {
          html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
        }
      });
      var chatmessage = chatbox.querySelector('.chatbox__messages');
      chatmessage.innerHTML = html;
    }
  }]);

  return Chatbox;
}();

var chatbox = new Chatbox();
chatbox.display();