var burger = document.querySelector('.navbar-burger');
var menu = document.querySelector('.navbar-menu');
burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

document.querySelectorAll("script[type='math/tex; mode=display']").forEach(function (element) {
    let text = element.innerHTML;
    let newSpan = document.createElement("div");
    newSpan.classList.add("equation")
    newSpan.innerHTML = katex.renderToString("\\displaystyle " + text)
    element.replaceWith(newSpan)
})