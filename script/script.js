// Tableau custom pour stocker les entrées du formulaire
const formEntries = [];

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
        // Récupère les valeurs du formulaire
        const nom = menuContainer.querySelector('#nom-input').value;
        const date = menuContainer.querySelector('#date-input').value;
        const heure = menuContainer.querySelector('#time-input').value;
        const note = menuContainer.querySelector('#note-input').value;

        // Stocke dans le tableau 
        formEntries.push({ nom, date, heure, note });
        console.log(formEntries);
        hideMenu();
    });
});