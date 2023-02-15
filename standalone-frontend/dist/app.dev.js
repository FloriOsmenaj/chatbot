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
    };
    this.state = false;
    this.messages = [];
  }

  _createClass(Chatbox, [{
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
      node.addEventListener("keyup", function (_ref) {
        var key = _ref.key;

        if (key === "Enter") {
          _this.onSendButton(chatBox);
        }
      });
    }
  }, {
    key: "toggleState",
    value: function toggleState(chatbox) {
      this.state = !this.state; // show or hides the box

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
      this.messages.push(msg1);
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
        var msg2 = {
          name: "Sam",
          message: r.answer
        };

        _this2.messages.push(msg2);

        _this2.updateChatText(chatbox);

        textField.value = '';
      })["catch"](function (error) {
        console.error('Error:', error);

        _this2.updateChatText(chatbox);

        textField.value = '';
      });
    }
  }, {
    key: "updateChatText",
    value: function updateChatText(chatbox) {
      var html = '';
      this.messages.slice().reverse().forEach(function (item, index) {
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