document.addEventListener("DOMContentLoaded", function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navigation = document.querySelector('.navigation');
    const popups = document.querySelectorAll('.modal');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const popupLinks = document.querySelectorAll('.island-link');
    const petalContainer = document.querySelector('.petal-container');
    initPetalEffect(petalContainer);
    initSamuraiGuide();
    initFujiParallax();
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
    


    // Ícone do menu visível ao carregar a página
    toggleHamburgerIcon(true);

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
            showModal(popupId);
        });
    });

    function showModal(popupId) {
        const modal = document.getElementById(popupId);
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('tabindex', '-1');
            trapFocus(modal);
            modal.focus();
        }
    }

    // Função para fechar o modal ativo
    function closeModal() {
        const active = document.querySelector('.modal.active');
        if (active) {
            active.classList.remove('active');
            releaseFocus(active);
        }
    }


    // Eventos para fechar pop-ups
    closePopupButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });



    // Fechar pop-ups ao pressionar a tecla Escape
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    // Função global para fechar pop-ups individualmente
    window.closePopup = function(popupId) {
        const modal = document.getElementById(popupId);
        if (modal) {
            modal.classList.add("modal-closing");
            setTimeout(() => {
                modal.classList.remove("active", "modal-closing");
            }, 300);
        }
    };


    window.showModal = showModal;
    window.closeModal = closeModal;

});





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
const totalPaginasExperiencia = 4; // Atualize conforme adicionar mais páginas

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

function initSamuraiGuide() {
    if (sessionStorage.getItem('samuraiShown')) return;
    const guide = document.createElement('div');
    guide.id = 'samurai-guide';
    guide.innerHTML = `
        <img src="assets/samurai-guide.svg" alt="Guia Samurai">
        <div class="samurai-bubble">Passe o mouse nas lanternas para navegar</div>
        <button class="samurai-close" aria-label="Fechar">&times;</button>
    `;
    document.body.appendChild(guide);

    const closeGuide = () => {
        guide.remove();
        sessionStorage.setItem('samuraiShown', 'true');
        document.removeEventListener('keydown', escHandler);
    };

    const escHandler = (e) => {
        if (e.key === 'Escape') closeGuide();
    };

    guide.querySelector('.samurai-close').addEventListener('click', closeGuide);
    document.addEventListener('keydown', escHandler);
}

function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    modal.addEventListener('keydown', trap);
    function trap(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
    modal._trap = trap;
}

function releaseFocus(modal) {
    if (modal._trap) {
        modal.removeEventListener('keydown', modal._trap);
        delete modal._trap;
    }
}

function initFujiParallax() {
    const bg = document.querySelector('.fuji-parallax');
    if (!bg) return;
    if (window.matchMedia('(pointer:fine)').matches) {
        document.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            bg.style.setProperty('--mx', `${x}px`);
            bg.style.setProperty('--my', `${y}px`);
        });
    }
}

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
