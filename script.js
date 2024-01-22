document.addEventListener("DOMContentLoaded", function () {
    const welcomeScreen = document.getElementById('welcome-screen');
    const firstPhase = document.querySelector('.welcome-container');
    const secondPhase = document.querySelector('.welcome-container-second-phase');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navigation = document.querySelector('.navigation');
    let clickCount = 0;
    const popups = document.querySelectorAll('.popup-content');
    const overlay = document.getElementById('popup-overlay');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const popupLinks = document.querySelectorAll('.island-link');
    const petalContainer = document.querySelector('.petal-container');
    initPetalEffect(petalContainer);
    document.addEventListener("DOMContentLoaded", atualizarBotoesNavegacao);
   
    

    function toggleHamburgerIcon(show) {
        if (show) {
            hamburgerIcon.classList.remove('hidden');
        } else {
            hamburgerIcon.classList.add('hidden');
        }
    }

        // Função para alternar a visibilidade do menu de navegação
        function toggleNavigation() {
            navigation.classList.toggle('active');
        }
    
        // Evento de clique no ícone do hambúrguer para alternar o menu
        hamburgerIcon.addEventListener('click', toggleNavigation);
    

    // Evento para alternar entre as fases da tela de boas-vindas
    welcomeScreen.addEventListener('click', function() {
        clickCount++;
        handleWelcomeScreenClick(clickCount);
    });

    function handleWelcomeScreenClick(count) {
        if (count === 1) {
            // Esconde a primeira fase e mostra a segunda
            firstPhase.classList.add('hidden');
            secondPhase.classList.remove('hidden');
        } else if (count === 2) {
            // Inicia a animação de fade out e depois esconde a tela de boas-vindas
        secondPhase.style.animation = 'fadeOut 1s ease-out';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            toggleHamburgerIcon(true); 
        }, 1000); // Aguarda a animação de fade out terminar
    }
}

    // Restaurar animação suave da tela de boas-vindas
    welcomeScreen.querySelector('.welcome-text').style.animation = '1s ease-out 0s 1 slideInFromLeft';
    welcomeScreen.querySelector('.welcome-image').style.animation = '1s ease-out slideInFromBottom';

    // Fechar a navegação ao clicar em um link
    document.querySelectorAll('.navigation a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.navigation').classList.remove('active');
        });
    });
    // Função para abrir um pop-up específico

    document.querySelectorAll('.image-menu').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const popupId = this.getAttribute('href').substring(1);
            openPopup(popupId);
        });
    });

    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add('popup-active');
            overlay.style.display = 'block';
        }
    }

    // Função para fechar todos os pop-ups e o overlay
    function closePopups() {
        popups.forEach(popup => popup.classList.remove('popup-active'));
        overlay.style.display = 'none';
    }


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


});



function closePopup(popupId) {
    const popup = document.getElementById(popupId.substring(1));
    if (popup) {
        popup.classList.add('popup-closing');
        setTimeout(() => {
            popup.classList.remove('popup-active', 'popup-closing');
            overlay.style.display = 'none';
        }, 300);
    }
}


// Restaurar animação das pétalas
    
    
function initPetalEffect(petalContainer) {
    for (let i = 0; i < 50; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animation = `fallingPetal ${Math.random() * 5 + 6}s linear infinite`;
        petal.style.animationDelay = `${-(Math.random() * 5)}s`;
        petalContainer.appendChild(petal);
        
    }
}

// logica de paginas
let paginaAtualProjeto = 1;
let paginaAtualExperiencia = 1;
const totalPaginasProjeto = 2; // Atualize conforme adicionar mais páginas
const totalPaginasExperiencia = 3; // Atualize conforme adicionar mais páginas

function mudarPagina(tipo, direcao) {
    let paginaAtual, totalPaginas, prefixoId;

    if (tipo === 'projeto') {
        paginaAtual = paginaAtualProjeto;
        totalPaginas = totalPaginasProjeto;
        prefixoId = 'projeto-pagina-';
    } else if (tipo === 'experiencia') {
        paginaAtual = paginaAtualExperiencia;
        totalPaginas = totalPaginasExperiencia;
        prefixoId = 'experiencia-pagina-';
    }

    const paginaAnterior = document.getElementById(`${prefixoId}${paginaAtual}`);
    const novaPagina = paginaAtual + direcao;

    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
        paginaAnterior.classList.add('hidden');

        const paginaSeguinte = document.getElementById(`${prefixoId}${novaPagina}`);
        paginaSeguinte.classList.remove('hidden');

        if (tipo === 'projeto') {
            paginaAtualProjeto = novaPagina;
        } else if (tipo === 'experiencia') {
            paginaAtualExperiencia = novaPagina;
        }

        atualizarBotoesNavegacao(tipo);
    }
}

function atualizarBotoesNavegacao(tipo) {
    let botaoVoltar, botaoProximo, paginaAtual, totalPaginas;

    if (tipo === 'projeto') {
        botaoVoltar = document.getElementById('botao-voltar-projeto');
        botaoProximo = document.getElementById('botao-proximo-projeto');
        paginaAtual = paginaAtualProjeto;
        totalPaginas = totalPaginasProjeto;
    } else if (tipo === 'experiencia') {
        botaoVoltar = document.getElementById('botao-voltar-experiencia');
        botaoProximo = document.getElementById('botao-proximo-experiencia');
        paginaAtual = paginaAtualExperiencia;
        totalPaginas = totalPaginasExperiencia;
    }

    botaoVoltar.classList.toggle('hidden', paginaAtual === 1);
    botaoProximo.classList.toggle('hidden', paginaAtual === totalPaginas);
}
//fim logica de paginas

var musicaDeFundo = document.getElementById('musicaDeFundo');
var playPauseIcon = document.getElementById('playPauseIcon');

// Função para alternar entre play e pause
function togglePlayPause() {
    var playButton = document.querySelector('button');
  if (musicaDeFundo.paused) {
    musicaDeFundo.play();
    playPauseIcon.className = 'fa fa-pause';
    playButton.classList.add('playing')
  } else {
    musicaDeFundo.pause();
    playPauseIcon.className = 'fa fa-play';
    playButton.classList.remove('playing')
  }
}

// Event listener para lidar com a reprodução automática bloqueada
window.addEventListener('DOMContentLoaded', (event) => {
  musicaDeFundo.play().catch(error => {
    console.error("A reprodução automática foi impedida pelo navegador.");
    // Quando a reprodução automática for impedida, altere o ícone para 'play'
    playPauseIcon.className = 'fa fa-play';
  });
});
