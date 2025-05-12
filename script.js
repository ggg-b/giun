


document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.getElementById("menu-links");

    menuToggle.addEventListener("click", () => {
        menuLinks.classList.toggle("active"); // Mostra o nasconde il menu
    });
});

    // Gestisce il click sul bottone "Acquista"
document.getElementById('acquista-btn').addEventListener('click', () => {
    alert('Grazie per aver acquistato!'); // Mostra un messaggio di conferma
    // Puoi aggiungere qui altre funzionalità, come il reindirizzamento
    // window.location.href = 'pagina-acquisto.html'; // Esempio di reindirizzamento
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (event) => {
        const privacyCheckbox = document.getElementById("privacy");

        if (!privacyCheckbox.checked) {
            event.preventDefault(); // Impedisce l'invio del modulo
            alert("Devi accettare la privacy policy per procedere.");
        }
    });
});