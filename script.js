
// Gestisce il click sul bottone "Acquista"
document.getElementById('acquista-btn').addEventListener('click', () => {
    alert('Grazie per aver acquistato!'); // Mostra un messaggio di conferma
    // Puoi aggiungere qui altre funzionalità, come il reindirizzamento
    // window.location.href = 'pagina-acquisto.html'; // Esempio di reindirizzamento
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.getElementById("menu-links");

    menuToggle.addEventListener("click", () => {
        menuLinks.classList.toggle("active"); // Alterna la classe "active"
    });

    // Chiudi il menu quando si clicca fuori
    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !menuLinks.contains(event.target)) {
            menuLinks.classList.remove("active"); // Rimuove la classe "active"
        }
    });
});
