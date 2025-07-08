document.addEventListener('DOMContentLoaded', function() {
    // --- Menu mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.getElementById('menu-links');
    const links = document.querySelectorAll('.menu-links a');
    menuToggle.addEventListener('click', () => {
        menuLinks.classList.toggle('active');
    });
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('active');
        });
    });

    // --- Privacy popup ---
    const privacyLink = document.getElementById("privacy-link");
    const privacyPopup = document.getElementById("privacy-popup");
    const closePopup = document.querySelector(".close-popup");
    if (privacyLink && privacyPopup && closePopup) {
        privacyLink.addEventListener("click", (event) => {
            event.preventDefault();
            privacyPopup.style.display = "flex";
        });
        closePopup.addEventListener("click", () => {
            privacyPopup.style.display = "none";
        });
        window.addEventListener("click", (event) => {
            if (event.target === privacyPopup) {
                privacyPopup.style.display = "none";
            }
        });
    }

    // --- Cookie popup ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    if (cookiePopup && cookieAccept && cookieReject) {
        cookiePopup.style.display = 'flex';
        function closeAndScrollTop() {
            cookiePopup.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.style.overflow = '';
        }
        cookieAccept.addEventListener('click', closeAndScrollTop);
        cookieReject.addEventListener('click', closeAndScrollTop);
    }

    // --- Cookie privacy info popup ---
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

    // --- Carousel prodotti mobile ---
    function setupProdottiCarousel() {
        const grid = document.getElementById('prodotti-carousel');
        if (!grid) return;
        const boxes = Array.from(grid.querySelectorAll('.prodotti-box'));
        if (boxes.length <= 1) return;
        const dotsContainer = document.getElementById('carousel-dots');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        let current = 0;
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
        if (prevBtn) prevBtn.onclick = () => goTo(current - 1);
        if (nextBtn) nextBtn.onclick = () => goTo(current + 1);
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

    // --- Popup descrizione prodotto ---
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
    document.getElementById('close-prodotto-popup').addEventListener('click', function() {
        prodottoPopup.style.display = 'none';
    });
    prodottoPopup.addEventListener('click', function(e) {
        if (e.target === prodottoPopup) prodottoPopup.style.display = 'none';
    });

    // --- Bottone Acquista Ora - Popup Gel Autolivellante ---
    ['popup-acquista-btn-desktop', 'popup-acquista-btn-mobile'].forEach(function(btnId) {
    const btn = document.getElementById(btnId);
    if (btn) {
        let acquistaPopup = document.getElementById('acquista-popup');
        if (!acquistaPopup) {
            acquistaPopup = document.createElement('div');
            acquistaPopup.id = 'acquista-popup';
            acquistaPopup.className = 'popup';
            acquistaPopup.style.display = 'none';
            acquistaPopup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup" id="close-acquista-popup">&times;</span>
                    <h2>Acquisto Gel Autolivellante</h2>
                    <p>Grazie per il tuo interesse! Il nostro gel autolivellante garantisce una stesura perfetta e una durata eccezionale. Per completare l'acquisto, contattaci tramite il modulo o visita la nostra pagina dedicata.</p>
                </div>
            `;
            document.body.appendChild(acquistaPopup);
        }
        function openAcquistaPopup(e) {
            e.preventDefault();
            acquistaPopup.style.display = 'flex';
        }
        btn.addEventListener('click', openAcquistaPopup);
        btn.addEventListener('touchend', openAcquistaPopup);

        acquistaPopup.addEventListener('click', function(e) {
            if (
                e.target === acquistaPopup ||
                (e.target.id === 'close-acquista-popup')
            ) {
                acquistaPopup.style.display = 'none';
            }
        });
    }
});

    // --- Mappa Google Maps ---
    const mappa = document.getElementById('mappa');
    if (mappa) {
        const mapsUrl = 'https://www.google.com/maps?q=YOUR_ADDRESS_OR_COORDINATES';
        mappa.style.cursor = 'pointer';
        mappa.addEventListener('click', function () {
            window.open(mapsUrl, '_blank');
        });
    }

    // --- Form contatti ---
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (event) => {
            const privacyCheckbox = document.getElementById("privacy");
            if (!privacyCheckbox.checked) {
                event.preventDefault();
                alert("Devi accettare la privacy policy per procedere.");
            }
        });
    }
});