$(document).ready(function () {
    Particles.init({
        selector: '#particles',
        color: '#ffffff',
        connectParticles: 'true',
        maxParticles: 50,
        sizeVariations: 5
    });
    var greetings = ["Hello", "Howdy", "Hi", "G'day", "Hey", "Hiya"];
    $("#greeting").text("👋 " + greetings[Math.floor(Math.random() * greetings.length)]);
});