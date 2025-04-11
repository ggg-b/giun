// Aggiunge un effetto hover al contenitore delle descrizioni
document.querySelectorAll('.descrizione').forEach((descrizione) => {
    descrizione.addEventListener('mouseover', () => {
        descrizione.style.backgroundColor = '#eae7e5'; // Colore beige chiaro
    });

    descrizione.addEventListener('mouseout', () => {
        descrizione.style.backgroundColor = '#fff'; // Colore bianco
    });
});

