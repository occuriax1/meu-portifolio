document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-menu");
    const navigation = document.getElementById("navigation");
    const welcomeScreen = document.getElementById('welcome-screen');
    const popups = document.querySelectorAll('.popup-content');
    const overlay = document.getElementById('popup-overlay');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const popupLinks = document.querySelectorAll('.island-link');


    // Função para alternar a navegação do menu hambúrguer
    function toggleNavigation() {
        navigation.classList.toggle("active");
    }

    // Função para abrir um pop-up específico
    function openPopup(popupId) {
        const popup = document.querySelector(popupId);
        if (popup) {
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }
    }

    // Função para fechar todos os pop-ups e o overlay
    function closePopups() {
        popups.forEach(popup => popup.style.display = 'none');
        overlay.style.display = 'none';
    }

    // Evento para alternar o menu de navegação
    hamburger.addEventListener("click", toggleNavigation);

    // Evento para fechar a tela de boas-vindas
    welcomeScreen.addEventListener('click', function() {
        this.style.display = 'none';
    });

    // Eventos para abrir pop-ups a partir dos links
    popupLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do link
            const popupId = this.getAttribute('href');
            openPopup(popupId);
        });
    });

    // Eventos para fechar pop-ups
    closePopupButtons.forEach(button => {
        button.addEventListener('click', closePopups);
    });

    // Fechar pop-ups ao clicar no overlay
    overlay.addEventListener('click', closePopups);

    // Fechar pop-ups ao pressionar a tecla Escape
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePopups();
        }
    });

    // Gerar pétalas de sakura caindo
    const petalContainer = document.querySelector('.petal-container');
    for (let i = 0; i < 50; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 5 + 3 + 's';
        petal.style.animationDelay = -(Math.random() * 5) + 's';
        petalContainer.appendChild(petal);
    }
});

// Função para abrir o pop-up
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove("popup-closing");
    popup.classList.add("popup-active");
}

// Função para fechar o pop-up
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.add("popup-closing");
    setTimeout(() => {
        popup.classList.remove("popup-active", "popup-closing");
    }, 300); // 300ms corresponde à duração da animação
}