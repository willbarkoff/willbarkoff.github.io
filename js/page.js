var burger = document.querySelector('.navbar-burger');
var menu = document.querySelector('.navbar-menu');
burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

if (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack) {
    $(".notracking").show()
    $(".tracking").hide()
} else {
    $(".tracking").show()
    $(".notracking").hide()
}