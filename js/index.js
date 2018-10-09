$( document ).ready(function() {
    var greetings = ["Hello", "Howdy", "Hi", "G'day", "Hey", "Hiya"];
    $("#greeting").text("👋 " + greetings[Math.floor(Math.random() * greetings.length)]);
});