/**
 * CONCURSO AGRINHO 2026 - CATEGORIA: PROGRAMAÇÃO FRONT-END
 * Componente: Lógica de Negócio, Validação de UI e Renderização Dedicada
 * Arquivo: script.js
 */

// 1. CAPTURA DE ELEMENTOS DO DOM (Utilizando document.querySelector)
const formCalculadora = document.querySelector('#form-calculadora');
const inputConsumo = document.querySelector('#input-consumo');
const inputEmissao = document.querySelector('#input-emissao');
const btnCalcular = document.querySelector('#btn-calcular');

// Elementos de saída na tela (Renderização direta na UI)
const containerResultado = document.querySelector('#container-resultado');
const textoMensagemErro = document.querySelector('#mensagem-erro');
const textoValorCalculado = document.querySelector('#valor-calculado');
const textoStatusSustentavel = document.querySelector('#status-sustentavel');

// 2. FUNÇÃO PRINCIPAL DE VALIDAÇÃO E PROCESSAMENTO
function processarDadosAgro(event) {
    // Impede o recarregamento padrão da página ao submeter o formulário
    event.preventDefault();

    // Limpa estados anteriores de resultados ou erros da tela
    textoMensagemErro.textContent = '';
    textoMensagemErro.classList.add('hidden');
    containerResultado.classList.add('hidden');

    // Captura dos valores inseridos e conversão explícita para ponto flutuante (Float)
    const valorConsumo = parseFloat(inputConsumo.value);
    const valorEmissao = parseFloat(inputEmissao.value);

    // ==========================================
    // VALIDAÇÃO ESTRITA DE DADOS (Direto na Tela)
    // ==========================================
    
    // Verifica se os campos estão vazios ou não são números válidos (NaN)
    if (isNaN(valorConsumo) || isNaN(valorEmissao)) {
        exibirErroNaTela("Por favor, preencha todos os campos do formulário antes de calcular.");
        return;
    }

    // Impede a entrada de números negativos
    if (valorConsumo < 0 || valorEmissao < 0) {
        exibirErroNaTela("Os valores inseridos não podem ser negativos. Insira dados válidos do seu manejo agrícola.");
        return;
    }

    // 3. PROCESSAMENTO DA APLICAÇÃO (Regra de Negócio / Tema: Equilíbrio Sustentável)
    // Exemplo clássico de cálculo de pegada de carbono/eficiência: (Emissões divididas pelo Consumo Eficiente)
    let indiceSustentabilidade = 0;
    if (valorConsumo > 0) {
        indiceSustentabilidade = valorEmissao / valorConsumo;
    }

    // 4. RENDERIZAÇÃO ELEGANTE DOS RESULTADOS DIRETAMENTE NA PÁGINA
    exibirResultadoNaTela(indiceSustentabilidade);
}

// FUNÇÃO AUXILIAR: Exibe a mensagem de erro amigável na tela
function exibirErroNaTela(mensagem) {
    textoMensagemErro.textContent = mensaje; 
    textoMensagemErro.classList.remove('hidden'); // Exibe a área de erro tratada no CSS
    textoMensagemErro.focus(); // Foco para acessibilidade
}

// FUNÇÃO AUXILIAR: Renderiza os cálculos de forma limpa na UI
function exibirResultadoNaTela(indice) {
    // Formata o número para exibir apenas duas casas decimais
    textoValorCalculado.textContent = indice.toFixed(2);

    // Altera o feedback textual e visual dinamicamente baseado no Equilíbrio Sustentável
    if (indice <= 0.5) {
        textoStatusSustentavel.textContent = "Excelente! Sua propriedade mantém um forte equilíbrio sustentável.";
        textoStatusSustentavel.style.color = "var(--cor-primaria, #2e7d32)"; // Usa as variáveis de cor do CSS
    } else if (indice > 0.5 && indice <= 1.2) {
        textoStatusSustentavel.textContent = "Atenção: A produção está estável, mas pode melhorar a eficiência ambiental.";
        textoStatusSustentavel.style.color = "var(--cor-alerta, #ef6c00)";
    } else {
        textoStatusSustentavel.textContent = "Alerta Crítico: Alto impacto ambiental detectado. É necessário reavaliar o manejo.";
        textoStatusSustentavel.style.color = "var(--cor-erro, #c62828)";
    }

    // Revela o bloco de resultado na tela de forma limpa
    containerResultado.classList.remove('hidden');
}

// 5. ADICIONANDO O ESCUTADOR DE EVENTOS (Event Listener)
// Captura o clique do botão através do evento de 'submit' do próprio formulário semântico
formCalculadora.addEventListener('submit', processarDadosAgro);
