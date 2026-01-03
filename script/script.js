// Gestion du menu et du backdrop en JS vanilla
// Fonctions de sauvegarde/chargement localStorage
function saveEntries(entries) {
    localStorage.setItem('formEntriesList', JSON.stringify(entries));
}
function loadEntries() {
    const data = localStorage.getItem('formEntriesList');
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

main();

function main() {
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

    // Chargement depuis le localStorage
    window.formEntriesList = loadEntries();
    // Affiche les cards existantes au chargement
    const container = document.getElementById('display-container');
    window.formEntriesList.sort((a, b) => {
        const da = new Date(a.date + 'T' + a.hour);
        const db = new Date(b.date + 'T' + b.hour);
        return da - db;
    });
    window.formEntriesList.forEach(entry => {
        const card = createCard(entry);
        container.appendChild(card);
        setInterval(() => {
            const targetDate = new Date(entry.date + 'T' + entry.hour);
            const countdownElem = card.querySelector('.countdown-value');
            if (countdownElem) countdownElem.textContent = getCountdown(targetDate);
        }, 1000);
    });

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
        // Sauvegarde dans le localStorage
        saveEntries(window.formEntriesList);
        hideMenu();
    });
    });
}

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
    // Génère un id unique pour la suppression
    const cardId = name + '_' + date + '_' + hour;
    card.setAttribute('data-card-id', cardId);
    card.innerHTML = `
        <button class="delete-card-btn" title="Supprimer" aria-label="Supprimer">&times;</button>
        <div class="card-title"><strong>${name}</strong> <span class="arrive-label">arrive dans</span> <span class="countdown-value">${getCountdown(targetDate)}</span></div>
        <div class="card-details">
            <div class="card-date">${formatDateTime(date, hour)}</div>
            ${note ? `<div class="card-note">${note}</div>` : ''}
        </div>
    `;
    // Gestion suppression
    card.querySelector('.delete-card-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        // Supprime du DOM
        card.remove();
        // Supprime du tableau et du localStorage
        window.formEntriesList = window.formEntriesList.filter(entry => !(entry.name === name && entry.date === date && entry.hour === hour));
        saveEntries(window.formEntriesList);
    });
    return card;
}