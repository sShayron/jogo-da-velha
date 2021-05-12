celulas = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const IA = "X";
const HUMANO = "O";

// faz a jogada do HUMANO -> verifica condicao de vitoria -> chama a jogada do computador
const onClick = (id) => {
  // return se celula ja esta preenchida
  if ([IA, HUMANO].includes(celulas[id - 1])) {
    return;
  }
  if (!vence(celulas, HUMANO) && !vence(celulas, IA)) {
    document.getElementById(id).innerHTML = HUMANO;
    document.getElementById(id).style.backgroundColor = "#9da6f7";
    celulas.splice(id - 1, 1, HUMANO);

    if (vence(celulas, HUMANO)) {
      document.getElementById("winText").innerHTML = "Você venceu!";
    } else {
      var vazios = celulasVazias(celulas);
      if (vazios.length === 0) {
        document.getElementById("winText").innerHTML = "Empate!";
      } else {
        autoPlay();
      }
    }
  }
};

// joga automatico e verifica se venceu
const autoPlay = () => {
  var melhorJogada = minimax(celulas, IA);
  document.getElementById(melhorJogada.index + 1).innerHTML = IA;
  document.getElementById(melhorJogada.index + 1).style.backgroundColor =
    "#ffe887";
  celulas.splice(melhorJogada.index, 1, IA);

  if (vence(celulas, IA)) {
    document.getElementById("winText").innerHTML = "IA venceu!";
  }
};

// Minimax meotodo
const minimax = (novoTabuleiro, jogador) => {
  // armazena em um array as celulas vazias
  var possiveisJogadas = celulasVazias(novoTabuleiro);

  // Verifica se IA ganhou, perdeu ou empatou e retorna uma pontuacao
  if (vence(novoTabuleiro, IA)) {
    return { pontuacao: -10 };
  } else if (vence(novoTabuleiro, HUMANO)) {
    return { pontuacao: 10 };
  } else if (possiveisJogadas.length === 0) {
    return { pontuacao: 0 };
  }

  // array que vai guardar todas as jogadas e suas pontuacoes
  var jogadas = [];

  // loop que vai colocar todas as possiveis jogadas no array
  for (var i = 0; i < possiveisJogadas.length; i++) {
    // vai criar um objeto para cada um e armazenar o index da celula de cada jogada
    var jogada = {};
    jogada.index = novoTabuleiro[possiveisJogadas[i]];

    // faz uma jogada numa celula vazia
    novoTabuleiro.splice(possiveisJogadas[i], 1, jogador);

    // armazena a pontuacao retornada do estado terminal daquela jogada
    if (jogador == HUMANO) {
      var result = minimax(novoTabuleiro, IA);
      jogada.pontuacao = result.pontuacao;
    } else {
      var result = minimax(novoTabuleiro, HUMANO);
      jogada.pontuacao = result.pontuacao;
    }

    // desfaz a jogada
    novoTabuleiro.splice(possiveisJogadas[i], 1, jogada.index);

    // coloca a jogada no array de jogadas
    jogadas.push(jogada);
  }

  // se for a vez do COMPUTADOR o loop resultara na jogada com a melhor pontuacao
  var melhorJogada;
  if (jogador === HUMANO) {
    var melhorPontuacao = -10000;
    for (var i = 0; i < jogadas.length; i++) {
      if (jogadas[i].pontuacao > melhorPontuacao) {
        melhorPontuacao = jogadas[i].pontuacao;
        melhorJogada = i;
      }
    }
  } else {
    // se for a vez do HUMANOO o loop resultara na jogada com a pior pontuacao
    var melhorPontuacao = 10000;
    for (var i = 0; i < jogadas.length; i++) {
      if (jogadas[i].pontuacao < melhorPontuacao) {
        melhorPontuacao = jogadas[i].pontuacao;
        melhorJogada = i;
      }
    }
  }

  // retorna a jogada com a maior pontuacao
  return jogadas[melhorJogada];
};

// verifica se alguem venceu
const vence = (novoTabuleiro, jogador) => {
  // checa vitoria de HUMANO ou IA
  if (
    // checando horizontal
    (novoTabuleiro[0] == jogador &&
      novoTabuleiro[1] == jogador &&
      novoTabuleiro[2] == jogador) ||
    (novoTabuleiro[3] == jogador &&
      novoTabuleiro[4] == jogador &&
      novoTabuleiro[5] == jogador) ||
    (novoTabuleiro[6] == jogador &&
      novoTabuleiro[7] == jogador &&
      novoTabuleiro[8] == jogador) ||
    // checando vertical
    (novoTabuleiro[0] == jogador &&
      novoTabuleiro[3] == jogador &&
      novoTabuleiro[6] == jogador) ||
    (novoTabuleiro[1] == jogador &&
      novoTabuleiro[4] == jogador &&
      novoTabuleiro[7] == jogador) ||
    (novoTabuleiro[2] == jogador &&
      novoTabuleiro[5] == jogador &&
      novoTabuleiro[8] == jogador) ||
    // checando diagonal
    (novoTabuleiro[0] == jogador &&
      novoTabuleiro[4] == jogador &&
      novoTabuleiro[8] == jogador) ||
    (novoTabuleiro[2] == jogador &&
      novoTabuleiro[4] == jogador &&
      novoTabuleiro[6] == jogador)
  ) {
    return true;
  }
  return false;
};

// retorna um array com os indices das jogadas possiveis no tabuleiro
const celulasVazias = (tabuleiro) => {
  return tabuleiro.filter((s) => s != IA && s != HUMANO);
};
