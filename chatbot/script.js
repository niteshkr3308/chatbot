function chatbot(input) {
  let output = "";
  input = input.toLowerCase();
  if (input.includes("hello") || input.includes("hi")) {
      output = "Hello, nice to meet you!";
  } else if (input.includes("how are you")) {
      output = "I'm fine, thank you for asking.";
  } else if (input.includes("what is your name")) {
      output = "I am your helper, I'm a chatbot.";
  } else if (input.includes("what can you do")) {
      output = "I can chat with you and answer some simple questions.";
  } else if (input.includes("today thought")) {
      output = "Young people have an almost biological destiny to be hopeful.";
  } else {
      output = "Sorry, I don't understand that. Please try something else.";
  }
  return output;
}

function displayUserMessage(message) {
  let chat = document.getElementById("chat");
  let userMessage = document.createElement("div");
  userMessage.classList.add("message");
  userMessage.classList.add("user");
  let userAvatar = document.createElement("div");
  userAvatar.classList.add("avatar");
  let userText = document.createElement("div");
  userText.classList.add("text");
  userText.innerHTML = message;
  userMessage.appendChild(userAvatar);
  userMessage.appendChild(userText);
  chat.appendChild(userMessage);
  chat.scrollTop = chat.scrollHeight;
}

function displayBotMessage(message) {
  let chat = document.getElementById("chat");
  let botMessage = document.createElement("div");
  botMessage.classList.add("message");
  botMessage.classList.add("bot");
  let botAvatar = document.createElement("div");
  botAvatar.classList.add("avatar");
  let botText = document.createElement("div");
  botText.classList.add("text");
  botText.innerHTML = message;
  botMessage.appendChild(botAvatar);
  botMessage.appendChild(botText);
  chat.appendChild(botMessage);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  let input = document.getElementById("input").value;
  if (input) {
      displayUserMessage(input);
      let output = chatbot(input);
      setTimeout(function() {
          displayBotMessage(output);
      }, 1000);
      document.getElementById("input").value = "";
  }
}

document.getElementById("button").addEventListener("click", sendMessage);

document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
      sendMessage();
  }
});

// voice recorgnition
const micButton = document.getElementById("mic-button");
const inputField = document.getElementById("input");

micButton.addEventListener("click", function() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  
  recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
      sendMessage();
  };

  recognition.onerror = function(event) {
      console.error("Speech recognition error", event);
  };
});
