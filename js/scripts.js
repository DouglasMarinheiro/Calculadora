const textodaOperacaoAnterior = document.querySelector("#operacao-anterior");
const textodaOperacaoAtual = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor(textodaOperacaoAnterior, textodaOperacaoAtual) {
    this.textodaOperacaoAnterior = textodaOperacaoAnterior;
    this.textodaOperacaoAtual = textodaOperacaoAtual;
    this.operacaoAtual = "";
  }
  addDigito(digito) {
    if (digito === "." && this.textodaOperacaoAtual.innerText.includes(".")) {
      return;
    }
    this.operacaoAtual = digito;
    this.updateScreen();
  }

  processodaOperacao(operacao) {
    if (this.textodaOperacaoAtual.innerText === "" && operacao !== "C") {
      if (this.textodaOperacaoAnterior.innerText !== "") {
        this.mudarOperacao(operacao);
      }
      return;
    }

    let valordaOperacao;
    let anterior = +this.textodaOperacaoAnterior.innerText.split(" ")[0];
    let atual = +this.textodaOperacaoAtual.innerText;

    switch (operacao) {
      case "+":
        valordaOperacao = anterior + atual;
        this.updateScreen(valordaOperacao, operacao, atual, anterior);
        break;
      case "-":
        valordaOperacao = anterior - atual;
        this.updateScreen(valordaOperacao, operacao, atual, anterior);
        break;
      case "/":
        valordaOperacao = anterior / atual;
        this.updateScreen(valordaOperacao, operacao, atual, anterior);
        break;
      case "*":
        valordaOperacao = anterior * atual;
        this.updateScreen(valordaOperacao, operacao, atual, anterior);
        break;
      case "DEL":
        this.deletarOperador();
        break;
      case "CE":
        this.limparOperacao();
        break;
      case "C":
        this.limparTodaOperacao();
        break;
      case "=":
        this.operadorIgual();
        break;
      default:
       return;
    }
  }

  updateScreen(
    valordaOperacao = null,
    operacao = null,
    atual = null,
    anterior = null
  ) {
    if (valordaOperacao === null) {
      this.textodaOperacaoAtual.innerText += this.operacaoAtual;
    } else {
      if (anterior === 0) {
        valordaOperacao = atual;
      }
      this.textodaOperacaoAnterior.innerText = `${valordaOperacao} ${operacao}`;
      this.textodaOperacaoAtual.innerText = "";
    }
  }

  mudarOperacao(operacao) {
    const operacaoMatematica = ["*", "-", "+", "/"];
    if (!operacaoMatematica.includes(operacao)) {
      return;
    }
    this.textodaOperacaoAnterior.innerText =
      this.textodaOperacaoAnterior.innerText.slice(0, -1) + operacao;
  }

  deletarOperador() {
    this.textodaOperacaoAtual.innerText =
      this.textodaOperacaoAtual.innerText.slice(0, -1);
  }
  limparOperacao() {
    this.textodaOperacaoAtual.innerText = "";
  }

  limparTodaOperacao() {
    this.textodaOperacaoAtual.innerText = "";
    this.textodaOperacaoAnterior.innerText = "";
    
  }

  operadorIgual() {
    
    const operacao = textodaOperacaoAnterior.innerText.split(" ")[1];
    this.processodaOperacao(operacao);
  }
}

const calc = new Calculadora(textodaOperacaoAnterior, textodaOperacaoAtual);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigito(value);
    } else {
      calc.processodaOperacao(value);
    }
  });
});
