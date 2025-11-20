let etapaAtual = 1;
const totalEtapas = 7; // agora são 7 etapas

const passos = document.querySelectorAll(".step");
const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");
const indicador = document.getElementById("indicador-etapa");
const btnExportar = document.getElementById("btn-exportar");

function mostrarEtapa(novaEtapa) {
  passos.forEach((step) => {
    const stepNum = parseInt(step.getAttribute("data-step"), 10);
    step.classList.toggle("active", stepNum === novaEtapa);
  });

  etapaAtual = novaEtapa;
  indicador.textContent = `Etapa ${etapaAtual} de ${totalEtapas}`;

  btnAnterior.disabled = etapaAtual === 1;
  btnProximo.style.display = etapaAtual === totalEtapas ? "none" : "inline-block";
}

btnAnterior.addEven
