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

// Interval global pour mettre à jour tous les countdowns
let globalCountdownInterval = null;

function startGlobalCountdown() {
    // Nettoie l'ancien interval s'il existe
    if (globalCountdownInterval) {
        clearInterval(globalCountdownInterval);
    }
    
    // Crée un seul interval qui met à jour tous les countdowns
    globalCountdownInterval = setInterval(() => {
        document.querySelectorAll('.memento-card').forEach(card => {
            const dateStr = card.getAttribute('data-date');
            const hourStr = card.getAttribute('data-hour');
            if (dateStr && hourStr) {
                const targetDate = new Date(dateStr + 'T' + hourStr);
                const countdownElem = card.querySelector('.countdown-value');
                if (countdownElem) {
                    countdownElem.textContent = getCountdown(targetDate);
                }
            }
        });
    }, 1000);
}

function displayAllCards() {
    const container = document.getElementById('display-container');
    container.innerHTML = '';
    
    window.formEntriesList.forEach(entry => {
        const card = createCard(entry);
        container.appendChild(card);
    });
    
    // Démarre le countdown global
    startGlobalCountdown();
}

main();

function main() {
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.add');
    const menuContainer = document.getElementById('menu-container');
    const backdrop = document.getElementById('backdrop');
    const closeBtn = document.getElementById('close-popover');

    // Initialisation des valeurs par défaut du formulaire
    const dateInput = document.getElementById('date-input');
    const timeInput = document.getElementById('time-input');
    if (dateInput) {
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];
    }
    if (timeInput) {
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        let min = now.getMinutes();
        let nextQ = Math.ceil(min / 15) * 15;
        let hour = now.getHours();
        if (nextQ === 60) {
            nextQ = 0;
            hour = (hour + 1) % 24;
        }
        timeInput.value = pad(hour) + ':' + pad(nextQ);
    }

    function showMenu() {
        menuContainer.classList.add('show');
        backdrop.style.display = 'block';
    }

    function hideMenu() {
        menuContainer.classList.remove('show');
        backdrop.style.display = 'none';
        // Réinitialise le formulaire
        menuContainer.reset();
        // Réinitialise les valeurs par défaut
        if (dateInput) {
            const today = new Date();
            dateInput.value = today.toISOString().split('T')[0];
        }
        if (timeInput) {
            const now = new Date();
            const pad = n => n.toString().padStart(2, '0');
            let min = now.getMinutes();
            let nextQ = Math.ceil(min / 15) * 15;
            let hour = now.getHours();
            if (nextQ === 60) {
                nextQ = 0;
                hour = (hour + 1) % 24;
            }
            timeInput.value = pad(hour) + ':' + pad(nextQ);
        }
    }

    menuBtn.addEventListener('click', showMenu);
    if (closeBtn) closeBtn.addEventListener('click', hideMenu);
    backdrop.addEventListener('click', hideMenu);

    // Chargement depuis le localStorage
    window.formEntriesList = loadEntries();
    
    // Trie les entrées par date/heure croissante
    window.formEntriesList.sort((a, b) => {
        const da = new Date(a.date + 'T' + a.hour);
        const db = new Date(b.date + 'T' + b.hour);
        return da - db;
    });
    
    // Affiche les cards existantes au chargement
    displayAllCards();

    menuContainer.addEventListener('submit', function(e) {
        e.preventDefault();
        // Récupère les valeurs du formulaire
        const nom = menuContainer.querySelector('#nom-input').value.trim();
        const date = menuContainer.querySelector('#date-input').value;
        const heure = menuContainer.querySelector('#time-input').value;
        const note = menuContainer.querySelector('#note-input').value.trim();

        // Validation
        if (!nom || !date || !heure) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

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
        displayAllCards();
        
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
    
    // Calcul précis en utilisant une copie de la date actuelle
    let tempDate = new Date(now);
    let years = 0, months = 0, days = 0, hours = 0, minutes = 0;
    
    // Calcul des années
    let nextYear = new Date(tempDate);
    nextYear.setFullYear(tempDate.getFullYear() + 1);
    while (nextYear <= targetDate) {
        years++;
        tempDate = new Date(nextYear);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
    }
    
    // Calcul des mois
    let nextMonth = new Date(tempDate);
    nextMonth.setMonth(tempDate.getMonth() + 1);
    while (nextMonth <= targetDate) {
        months++;
        tempDate = new Date(nextMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    }
    
    // Calcul des jours, heures et minutes restants
    const remainingMs = targetDate - tempDate;
    days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Construction de la chaîne de résultat
    let parts = [];
    if (years > 0) parts.push(years + ' an' + (years > 1 ? 's' : ''));
    if (months > 0) parts.push(months + ' mois');
    if (days > 0) parts.push(days + ' jour' + (days > 1 ? 's' : ''));
    if (hours > 0) parts.push(hours + 'h');
    if (minutes > 0) parts.push(minutes + 'min');
    
    return parts.length > 0 ? parts.join(' ') : 'Moins d\'une minute';
}

// Fonction pour créer une card
function createCard({ name, date, hour, note }) {
    const card = document.createElement('div');
    card.className = 'memento-card';
    const targetDate = new Date(date + 'T' + hour);
    
    // Stocke les données dans les attributs pour le countdown global
    card.setAttribute('data-date', date);
    card.setAttribute('data-hour', hour);
    card.setAttribute('data-name', name);
    
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
        window.formEntriesList = window.formEntriesList.filter(entry => 
            !(entry.name === name && entry.date === date && entry.hour === hour)
        );
        saveEntries(window.formEntriesList);
    });
    
    return card;
}