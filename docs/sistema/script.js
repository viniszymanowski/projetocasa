let etapaAtual = 1;
const totalEtapas = 6;

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

btnAnterior.addEventListener("click", () => {
  if (etapaAtual > 1) {
    mostrarEtapa(etapaAtual - 1);
  }
});

btnProximo.addEventListener("click", () => {
  if (etapaAtual < totalEtapas) {
    mostrarEtapa(etapaAtual + 1);
  }
});

if (btnExportar) {
  btnExportar.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input, textarea");
    const respostas = {};

    inputs.forEach((campo) => {
      const nome = campo.name || campo.id;
      if (nome) {
        respostas[nome] = campo.value;
      }
    });

    const json = JSON.stringify(
      {
        atualizado_em: new Date().toISOString(),
        etapa_total: totalEtapas,
        respostas,
      },
      null,
      2
    );

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "respostas_questionario.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Arquivo JSON gerado. Salve em /data no repositório ou em uma pasta do Google Drive.");
  });
}

// mostrar primeira etapa ao carregar
mostrarEtapa(1);
