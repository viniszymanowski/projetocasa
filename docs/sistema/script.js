// Formulário único de dados do terreno

const btnExportar = document.getElementById("btn-exportar");

if (btnExportar) {
  btnExportar.addEventListener("click", () => {
    // Campos obrigatórios
    const requiredFields = [
      "terreno_dimensoes",
      "terreno_recuos",
      "terreno_taxa_ocupacao",
      "terreno_link_planta",
    ];

    const missing = [];

    requiredFields.forEach((name) => {
      const field = document.querySelector(`[name="${name}"]`);
      if (field && !field.value.trim()) {
        missing.push(name);
      }
    });

    if (missing.length > 0) {
      alert(
        "Para exportar os dados do terreno, preencha os campos principais:\n\n" +
        "- Dimensões básicas do terreno\n" +
        "- Recuos / restrições\n" +
        "- Taxa de ocupação / altura (se souber)\n" +
        "- Link da planta oficial do terreno"
      );
      return;
    }

    // Coletar todos os campos
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
        tipo_formulario: "dados_terreno",
        atualizado_em: new Date().toISOString(),
        respostas,
      },
      null,
      2
    );

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dados_terreno.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(
      "Arquivo JSON de dados do terreno gerado com sucesso.\n\n" +
      "Salve em /data no repositório ou em uma pasta do Google Drive para ser analisado pela IA."
    );
  });
}
