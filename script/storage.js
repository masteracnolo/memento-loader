// Gestion du stockage local pour les formEntriesList
export function saveEntries(entries) {
    localStorage.setItem('formEntriesList', JSON.stringify(entries));
}

export function loadEntries() {
    const data = localStorage.getItem('formEntriesList');
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}
