//let titulo = document.querySelector('h1');
//let paragrafo = document.querySelector('p');
//titulo.innerHTML = 'Jogo do número secreto';
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumerosSorteados = [];
let tentativas = 1;
let numeroMaximo = 4;
let numeroSecreto =  gerarNumeroAleatorio();

console.log(numeroSecreto);

exibirMensagemInicial();


//functions

function definirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    //Utilizando a biblioteca responsiveVoice.js para falar o texto - comentada devido a não funcionar responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 } );

    //Alternativa utilizando a Web Speech API
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function gerarNumeroAleatorio() {
   let numeroAleatorio = parseInt(Math.random() * numeroMaximo) + 1;
   let quantidadeNumerosLista = listaNumerosSorteados.length;  

   if(quantidadeNumerosLista == numeroMaximo) {
        listaNumerosSorteados = [];
        console.log('Resetou a lista');
    }   

   if(listaNumerosSorteados.includes(numeroAleatorio)) {
        console.log('Número já sorteado: ' + numeroAleatorio);

        return gerarNumeroAleatorio();
    }

   listaNumerosSorteados.push(numeroAleatorio);    
    console.log('Novo número sorteado: ' + numeroAleatorio);

   return numeroAleatorio;
}

function exibirMensagemInicial() {
    definirTextoTela('h1', 'Jogo do número secreto');
    definirTextoTela('p', 'Escolha um número entre 1 e ' + numeroMaximo);
}

function verificarChute() {
    let numeroDigitado = document.querySelector('input').value;
    let palavraTentativa = (tentativas == 1) ? 'tentativa' : 'tentativas'; 

    if (numeroDigitado == numeroSecreto) {
        let texto =  `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        let botaoNovoJogo = document.getElementById('reiniciar');
        
        definirTextoTela('h1', 'Acertou!');
        definirTextoTela('p', texto);

        botaoNovoJogo.removeAttribute('disabled');


    } else {
        let texto;

        if (numeroDigitado > numeroSecreto) {
            texto = `O número secreto é menor que ${numeroDigitado}! ${tentativas} ${palavraTentativa}!`;

        } else {
            texto = `O número secreto é maior que ${numeroDigitado}! ${tentativas} ${palavraTentativa}!`;
        }

        definirTextoTela('p', texto);
        
        tentativas++;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1; 
    limparCampo();
    exibirMensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);

}

function limparCampo() {
    let numeroDigitado = document.querySelector('input');

    numeroDigitado.value = '';
    numeroDigitado.focus();
}