/**
 * SMART COMUNICAÇÃO VISUAL - MODAL CONTROLLER
 * Controlador da Janela Modal para Carregar a Plataforma Vectora AI Studio
 */

(function () {
    const SMART_BASE_URL = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
        ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000/plataforma' : '/plataforma')
        : 'https://www.graficasmart.com/plataforma';
    let smartIsFullscreen = false;

    // Função Global para Abrir o Modal
    window.abrirPlataformaModal = function (rota) {
        const overlay = document.getElementById('smartModalOverlay');
        const iframe = document.getElementById('smartPlatformIframe');
        const loader = document.getElementById('smartIframeLoader');
        const externalBtn = document.getElementById('smartOpenExternalBtn');

        rota = rota || '';
        const targetUrl = SMART_BASE_URL + (rota ? '/' + rota : '');

        // Atualizar aba ativa
        document.querySelectorAll('.smart-tab-btn').forEach(function (btn) {
            const tool = btn.getAttribute('data-tool');
            if ((!rota && tool === 'studio') || (rota && tool === rota)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Atualizar link externo
        if (externalBtn) {
            externalBtn.href = targetUrl;
        }

        // Exibir loading
        if (loader) {
            loader.style.display = 'flex';
        }

        // Configurar src do iframe
        if (iframe) {
            iframe.onload = function () {
                if (loader) {
                    loader.style.display = 'none';
                }
            };
            if (iframe.src !== targetUrl && iframe.src !== targetUrl + '/') {
                iframe.src = targetUrl;
            } else {
                if (loader) {
                    loader.style.display = 'none';
                }
            }
        }

        // Abrir overlay
        if (overlay) {
            overlay.style.display = 'flex';
            setTimeout(function () {
                overlay.classList.add('open');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    };

    // Função Global para Fechar o Modal
    window.fecharPlataformaModal = function () {
        const overlay = document.getElementById('smartModalOverlay');
        if (overlay) {
            overlay.classList.remove('open');
            setTimeout(function () {
                overlay.style.display = 'none';
            }, 200);
            document.body.style.overflow = '';
        }
    };

    // Função Global para Trocar de Ferramenta
    window.trocarAbaPlataforma = function (rota, btnElem) {
        rota = rota || '';
        const targetUrl = SMART_BASE_URL + (rota ? '/' + rota : '');
        const iframe = document.getElementById('smartPlatformIframe');
        const loader = document.getElementById('smartIframeLoader');
        const externalBtn = document.getElementById('smartOpenExternalBtn');

        document.querySelectorAll('.smart-tab-btn').forEach(function (btn) {
            btn.classList.remove('active');
        });
        if (btnElem) {
            btnElem.classList.add('active');
        }

        if (externalBtn) {
            externalBtn.href = targetUrl;
        }

        if (loader) {
            loader.style.display = 'flex';
        }

        if (iframe) {
            iframe.src = targetUrl;
        }
    };

    // Função Global para Alternar Tela Cheia
    window.alternarTelaCheiaModal = function () {
        const win = document.getElementById('smartModalWindow');
        const icon = document.getElementById('smartExpandIcon');
        smartIsFullscreen = !smartIsFullscreen;
        if (win) {
            if (smartIsFullscreen) {
                win.classList.add('fullscreen');
                if (icon) icon.textContent = '🗗';
            } else {
                win.classList.remove('fullscreen');
                if (icon) icon.textContent = '⛶';
            }
        }
    };

    // Fechar ao clicar no backdrop (fora da janela)
    document.addEventListener('DOMContentLoaded', function () {
        const overlay = document.getElementById('smartModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    fecharPlataformaModal();
                }
            });
        }
    });

    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            fecharPlataformaModal();
        }
    });
})();
