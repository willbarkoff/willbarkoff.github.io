var greetingElement = document.querySelector(".greeting")
var greetings = ["Hello", "Howdy", "Hi", "G'day", "Hey", "Hiya"];
greetingElement.textContent = ("👋 " + greetings[Math.floor(Math.random() * greetings.length)]);
