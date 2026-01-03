// https://michalsnik.github.io/aos/
document.addEventListener('DOMContentLoaded', function() {
    if (window.AOS) {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true
        });
    }
});
