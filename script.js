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
document.addEventListener('DOMContentLoaded', function() {
    // Gestione chiusura popup cookie su accetta/rifiuta
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    if (cookiePopup && cookieAccept && cookieReject) {
        // Mostra il popup cookie all'apertura del sito
        cookiePopup.style.display = 'flex';
        

        function closeAndScrollTop() {
            cookiePopup.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.style.overflow = ''; // Riabilita lo scroll
        }
        cookieAccept.addEventListener('click', closeAndScrollTop);
        cookieReject.addEventListener('click', closeAndScrollTop);
    }

    // Gestione apertura/chiusura popup informativa cookies
    const cookiePrivacyLink = document.getElementById('cookie-privacy-link');
    const cookiePrivacyInfo = document.getElementById('cookie-privacy-info');
    const closeCookiePrivacy = document.getElementById('close-cookie-privacy');
    if (cookiePrivacyLink && cookiePrivacyInfo && closeCookiePrivacy) {
        cookiePrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            cookiePrivacyInfo.style.display = 'flex';
        });
        closeCookiePrivacy.addEventListener('click', function(e) {
            e.stopPropagation();
            cookiePrivacyInfo.style.display = 'none';
        });
        cookiePrivacyInfo.addEventListener('click', function(e) {
            if (e.target === cookiePrivacyInfo) cookiePrivacyInfo.style.display = 'none';
        });
    }

    // Carousel prodotti mobile
    function setupProdottiCarousel() {
        const grid = document.getElementById('prodotti-carousel');
        if (!grid) return;
        const boxes = Array.from(grid.querySelectorAll('.prodotti-box'));
        if (boxes.length <= 1) return;

        const dotsContainer = document.getElementById('carousel-dots');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        let current = 0;

        // Mostra solo il box corrente, nasconde gli altri (per evitare che manchi oil.jpg)
        function updateCarousel() {
            boxes.forEach((box, i) => {
                if (i === current) {
                    box.style.display = '';
                    box.style.transform = 'translateX(0)';
                } else {
                    box.style.display = 'none';
                }
            });
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === current);
                });
            }
            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current === boxes.length - 1;
        }

        function goTo(idx) {
            current = Math.max(0, Math.min(idx, boxes.length - 1));
            updateCarousel();
        }

        // Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            boxes.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.type = 'button';
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });
        }

        // Arrows
        if (prevBtn) prevBtn.onclick = () => goTo(current - 1);
        if (nextBtn) nextBtn.onclick = () => goTo(current + 1);

        // Touch swipe
        let startX = null;
        grid.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) startX = e.touches[0].clientX;
        });
        grid.addEventListener('touchend', function(e) {
            if (startX !== null && e.changedTouches.length === 1) {
                let dx = e.changedTouches[0].clientX - startX;
                if (dx > 40) goTo(current - 1);
                else if (dx < -40) goTo(current + 1);
            }
            startX = null;
        });

        // Responsive: only on mobile
        function checkMobile() {
            if (window.innerWidth <= 1023) {
                updateCarousel();
            } else {
                boxes.forEach(box => {
                    box.style.display = '';
                    box.style.transform = '';
                });
            }
        }
        window.addEventListener('resize', checkMobile);
        checkMobile();
    }
    setupProdottiCarousel();
});
document.addEventListener('DOMContentLoaded', function() {
    // Pop-up descrizione prodotto
    const productDescriptions = {
        "CREMA IDRATANTE": {
            title: "Crema Idratante",
            text: "Crema idratante per mani e unghie, arricchita con ingredienti naturali per nutrire e proteggere la pelle. Ideale per l'uso quotidiano."
        },
        "GLITTER TOP COAT": {
            title: "Glitter Top Coat",
            text: "Top coat con effetto glitterato per unghie brillanti e luminose. Si applica sopra il colore per un finish scintillante."
        },
        "OLIO NUTRIENTE": {
            title: "Olio Nutriente",
            text: "Olio nutriente per cuticole e unghie, favorisce la crescita e la salute dell'unghia. Da applicare quotidianamente per risultati ottimali."
        }
    };

    // Crea il popup una sola volta
    let prodottoPopup = document.getElementById('prodotto-popup');
    if (!prodottoPopup) {
        prodottoPopup = document.createElement('div');
        prodottoPopup.id = 'prodotto-popup';
        prodottoPopup.className = 'popup';
        prodottoPopup.innerHTML = `
            <div class="popup-content">
                <span class="close-popup" id="close-prodotto-popup">&times;</span>
                <h2 id="prodotto-popup-title"></h2>
                <p id="prodotto-popup-text"></p>
            </div>
        `;
        document.body.appendChild(prodottoPopup);
    }

    // Mostra popup al click sulla descrizione
    document.querySelectorAll('.prodotti-box .descrizione').forEach(desc => {
        desc.addEventListener('click', function(e) {
            e.stopPropagation();
            const name = desc.querySelector('p')?.textContent?.trim();
            if (name && productDescriptions[name]) {
                document.getElementById('prodotto-popup-title').textContent = productDescriptions[name].title;
                document.getElementById('prodotto-popup-text').textContent = productDescriptions[name].text;
                prodottoPopup.style.display = 'flex';
            }
        });
    });

    // Chiudi popup prodotto
    document.getElementById('close-prodotto-popup').addEventListener('click', function() {
        prodottoPopup.style.display = 'none';
    });
    prodottoPopup.addEventListener('click', function(e) {
        if (e.target === prodottoPopup) prodottoPopup.style.display = 'none';
    });
});

// Pop-up "Acquista ora" gel autolivellante
document.addEventListener('DOMContentLoaded', function() {
    const acquistaBtn = document.getElementById('acquista-btn');
    const popupGel = document.getElementById('popup-gel');
    const closeGelBtn = document.getElementById('close-popup-gel-btn');
    if (acquistaBtn && popupGel && closeGelBtn) {
        acquistaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            popupGel.style.display = 'flex';
        });
        closeGelBtn.addEventListener('click', function() {
            popupGel.style.display = 'none';
        });
        popupGel.addEventListener('click', function(e) {
            if (e.target === popupGel) popupGel.style.display = 'none';
        });
    }
});
