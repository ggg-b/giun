// Seleziona gli elementi del menu
const menuToggle = document.getElementById('menu-toggle');
const menuLinks = document.getElementById('menu-links');
const links = document.querySelectorAll('.menu-links a');

// Mostra/nasconde il menu quando si clicca sul toggle
menuToggle.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
});

// Chiude il menu quando si clicca su un link
links.forEach(link => {
    link.addEventListener('click', () => {
        menuLinks.classList.remove('active');
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
document.addEventListener("DOMContentLoaded", () => {
    const privacyLink = document.getElementById("privacy-link");
    const privacyPopup = document.getElementById("privacy-popup");
    const closePopup = document.querySelector(".close-popup");

    // Mostra il pop-up quando si clicca sul link
    privacyLink.addEventListener("click", (event) => {
        event.preventDefault(); // Impedisce il comportamento predefinito del link
        privacyPopup.style.display = "flex"; // Mostra il pop-up
    });

    // Chiudi il pop-up quando si clicca sulla "X"
    closePopup.addEventListener("click", () => {
        privacyPopup.style.display = "none"; // Nascondi il pop-up
    });

    // Chiudi il pop-up quando si clicca fuori dal contenuto
    window.addEventListener("click", (event) => {
        if (event.target === privacyPopup) {
            privacyPopup.style.display = "none"; // Nascondi il pop-up
        }
    });
});