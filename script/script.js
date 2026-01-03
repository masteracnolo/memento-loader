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

    // Tableau global pour stocker les entrées
    if (!window.formEntriesList) window.formEntriesList = [];
    menuContainer.addEventListener('submit', function(e) {
        e.preventDefault();
        // Récupère les valeurs du formulaire
        const nom = menuContainer.querySelector('#nom-input').value;
        const date = menuContainer.querySelector('#date-input').value;
        const heure = menuContainer.querySelector('#time-input').value;
        const note = menuContainer.querySelector('#note-input').value;

        // Structure de données simple pour chaque entrée
        const entry = {
            name: nom,
            date: date,
            hour: heure,
            note: note
        };

        window.formEntriesList.push(entry);

        // Trie les entrées par date/heure croissante
        window.formEntriesList.sort((a, b) => {
            const da = new Date(a.date + 'T' + a.hour);
            const db = new Date(b.date + 'T' + b.hour);
            return da - db;
        });

        // Réaffiche toutes les cards dans l'ordre
        const container = document.getElementById('display-container');
        container.innerHTML = '';
        window.formEntriesList.forEach(entry => {
            const card = createCard(entry);
            container.appendChild(card);
            setInterval(() => {
                const targetDate = new Date(entry.date + 'T' + entry.hour);
                const countdownElem = card.querySelector('.countdown-value');
                if (countdownElem) countdownElem.textContent = getCountdown(targetDate);
            }, 1000);
        });

        hideMenu();
    });

// Fonction pour formater la date cible en string lisible
function formatDateTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) return '';
    const d = new Date(dateStr + 'T' + timeStr);
    return d.toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Fonction pour calculer le compte à rebours
function getCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) return 'Terminé';
    const y = targetDate.getFullYear() - now.getFullYear();
    const m = targetDate.getMonth() - now.getMonth();
    const d = targetDate.getDate() - now.getDate();
    const h = targetDate.getHours() - now.getHours();
    const min = targetDate.getMinutes() - now.getMinutes();

    // Correction pour les valeurs négatives
    let years = y, months = m, days = d, hours = h, minutes = min;
    let ref = new Date(now);
    let t = targetDate;

    years = t.getFullYear() - ref.getFullYear();
    ref.setFullYear(ref.getFullYear() + years);
    if (ref > t) { years--; ref.setFullYear(ref.getFullYear() - 1); }

    months = t.getMonth() - ref.getMonth();
    if (months < 0) { months += 12; years--; }
    ref.setMonth(ref.getMonth() + months);

    if (ref > t) { months--; ref.setMonth(ref.getMonth() - 1); }
    days = Math.floor((t - ref) / (1000 * 60 * 60 * 24));
    ref.setDate(ref.getDate() + days);
    
    hours = t.getHours() - ref.getHours();
    minutes = t.getMinutes() - ref.getMinutes();

    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    let str = '';
    if (years > 0) str += years + ' an' + (years > 1 ? 's ' : ' ');
    if (months > 0) str += months + ' mois ';
    if (days > 0) str += days + ' jour' + (days > 1 ? 's ' : ' ');
    if (hours > 0) str += hours + 'h ';
    if (minutes > 0) str += minutes + 'min';
    return str.trim() || 'Moins d\'une minute';
}

// Fonction pour créer une card
function createCard({ name, date, hour, note }) {
    const card = document.createElement('div');
    card.className = 'memento-card';
    const targetDate = new Date(date + 'T' + hour);
    card.innerHTML = `
        <div class="countdown"><span class="countdown-value">${getCountdown(targetDate)}</span></div>
        <div class="card-nom"><strong>${name}</strong></div>
        <div class="card-date">${formatDateTime(date, hour)}</div>
        ${note ? `<div class="card-note">${note}</div>` : ''}
    `;
    return card;
}
});