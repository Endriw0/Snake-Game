const musicaFundo = new Audio("music/somVillager.mp3");
const musicaGameover = new Audio("music/perdeu.mp3");
const musicaMover = new Audio("music/move.mp3");
const musicaComer = new Audio("music/comer54.mp3");

var direcao = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }]

var fruta =
{
    x: Math.floor(Math.random() * 18)+1,
    y: Math.floor(Math.random() * 18)+1
}

var pontos = 0;
var ultimaAtualizacao = 0;
var velocidade = 10;

function main(tempoAtual) {
    window.requestAnimationFrame(main);
    if ((tempoAtual - ultimaAtualizacao) / 1000 < (1 / velocidade)) {
        return;
    }
    ultimaAtualizacao = tempoAtual;
    atualizacaoJogo();

}

function verificaColisao() {


    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y) {
            return true;
        }
    }
    if (cobrinha[0].x >= 20 || cobrinha[0].x <= 0 || cobrinha[0].y >= 20 || cobrinha[0].y <= 0) {
        return true;
    }
    return false;
}

function verificaComer() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        musicaComer.play();
        pontos += 10;
        pontuacao.innerHTML = pontos + "pontos";
        cobrinha.unshift({ x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y })
        fruta.x = Math.floor(Math.random() * 20)
        fruta.y = Math.floor(Math.random() * 20)
    }
}


function atualizacaoJogo() {
    musicaFundo.play();
    var colidiu = verificaColisao();
    if (colidiu == true) {
        musicaFundo.pause();
        musicaGameover.play();
        alert("Game over")
        cobrinha = [{ x: 5, y: 5 }]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }

    verificaComer();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;


    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var partesCobra = document.createElement('div');
        partesCobra.style.gridRowStart = cobrinha[i].y;
        partesCobra.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            partesCobra.classList.add("head");
        } else {
            partesCobra.classList.add("tronco");
        }
        board.appendChild(partesCobra);
    }
    var food = document.createElement("div");
    food.style.gridColumnStart = fruta.x;
    food.style.gridRowStart = fruta.y;
    food.classList.add("fruta");
    board.appendChild(food)
}



function VerificaClickTeclado(e) {

    musicaMover.play();

    switch (e.code) {
        case "Numpad8":
            direcao.x = 0
            direcao.y = -1;
            //SUBIR
            break;
        case "Numpad2":
            direcao.x = 0
            direcao.y = 1;
            //DESCER
            break;
        case "Numpad4":
            direcao.x = -1;
            direcao.y = 0;
            //ESQUERDA
            break;
        case "Numpad6":
            direcao.x = 1;
            direcao.y = 0;
            //DIREITA
            break;


        case "Numpad9":
            direcao.x = 1;
            direcao.y = -1;
            //SUBIR
            break;
        case "Numpad7":
            direcao.x = -1;
            direcao.y = -1;
            //DESCER
            break;
        case "Numpad3":
            direcao.x = 1;
            direcao.y = 1;
            //ESQUERDA
            break;
        case "Numpad1":
            direcao.x = -1;
            direcao.y = 1;
            //DIREITA
            break;
        case "Numpad0":
            direcao.x = 0;
            direcao.y = 0;
            break;
    }
}

window.addEventListener('keydown', (e) => VerificaClickTeclado(e))

main();





























