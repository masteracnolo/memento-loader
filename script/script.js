// Gestion du menu et du backdrop en JS vanilla
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.add');
    const menuContainer = document.getElementById('menu-container');
    const backdrop = document.getElementById('backdrop');
    const closeBtn = document.getElementById('close-popover');

    function showMenu() {
        menuContainer.classList.add('show');
        backdrop.style.display = 'block';
    }

    function hideMenu() {
        menuContainer.classList.remove('show');
        backdrop.style.display = 'none';
    }

    menuBtn.addEventListener('click', showMenu);
    if (closeBtn) closeBtn.addEventListener('click', hideMenu);
    backdrop.addEventListener('click', hideMenu);

    menuContainer.addEventListener('submit', function(e) {
        e.preventDefault();
        hideMenu();
    });
});