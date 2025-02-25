let listaNumerosSorteados = [];
let quantidadeNumerosSorteados = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function exibeTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibeTextoNaTela('h1', 'Jogo do número secreto');
    exibeTextoNaTela('p', 'Escolha um número de 1 a 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibeTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto em ${tentativa} ${palavraTentativa}`;
        exibeTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibeTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibeTextoNaTela('p', 'O número secreto é maior');
        }
        tentativa++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * quantidadeNumerosSorteados + 1);
    if (listaNumerosSorteados.length == quantidadeNumerosSorteados) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        console.log(listaNumerosSorteados);
        listaNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativa = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}