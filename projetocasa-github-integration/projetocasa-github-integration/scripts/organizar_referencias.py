
import os
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]

# Pastas de origem (de onde você joga as imagens brutas)
BASE_REFERENCIAS = BASE_DIR / "data" / "Referencias"

# Mapeamento de categorias: origem -> destino -> arquivo .md
CATEGORIAS = {
    "Fachada": {
        "dest": BASE_DIR / "fotos" / "referencias" / "fachada",
        "doc": BASE_DIR / "docs" / "arquitetura" / "referencias" / "fachada.md",
        "titulo": "Referências – Fachada",
    },
    "Interiores": {
        "dest": BASE_DIR / "fotos" / "referencias" / "interiores",
        "doc": BASE_DIR / "docs" / "arquitetura" / "referencias" / "interiores.md",
        "titulo": "Referências – Interiores",
    },
    "Gourmet": {
        "dest": BASE_DIR / "fotos" / "referencias" / "gourmet",
        "doc": BASE_DIR / "docs" / "arquitetura" / "referencias" / "gourmet.md",
        "titulo": "Referências – Área Gourmet",
    },
    "Outros": {
        "dest": BASE_DIR / "fotos" / "referencias" / "outros",
        "doc": BASE_DIR / "docs" / "arquitetura" / "referencias" / "outros.md",
        "titulo": "Outras Referências",
    },
}

EXTENSOES_IMAGENS = {".png", ".jpg", ".jpeg", ".gif", ".webp"}


def slugify(nome: str) -> str:
    nome = nome.strip().lower()
    nome = nome.replace(" ", "-")
    nome = nome.replace("ç", "c")
    for ch in ["(", ")", "[", "]", ","]:
        nome = nome.replace(ch, "")
    return nome


def coletar_imagens_categoria(origem_categoria: Path):
    arquivos = []
    if not origem_categoria.exists():
        return arquivos

    for item in origem_categoria.iterdir():
        if item.is_file() and item.suffix.lower() in EXTENSOES_IMAGENS:
            arquivos.append(item)
    return arquivos


def mover_imagens(arquivos, destino: Path):
    destino.mkdir(parents=True, exist_ok=True)
    novos_caminhos = []

    for origem in arquivos:
        novo_nome = slugify(origem.stem) + origem.suffix.lower()
        destino_arquivo = destino / novo_nome

        i = 1
        while destino_arquivo.exists():
            destino_arquivo = destino / f"{slugify(origem.stem)}-{i}{origem.suffix.lower()}"
            i += 1

        shutil.move(str(origem), str(destino_arquivo))
        novos_caminhos.append(destino_arquivo)
        print(f"Movido: {origem} -> {destino_arquivo}")

    return novos_caminhos


def atualizar_markdown(doc_path: Path, titulo: str, caminhos):
    if not caminhos:
        return

    linhas = []

    if doc_path.exists():
        conteudo_atual = doc_path.read_text(encoding="utf-8").strip()
        if conteudo_atual:
            linhas.append(conteudo_atual)
            linhas.append("\n\n---\n\n")
    else:
        doc_path.parent.mkdir(parents=True, exist_ok=True)
        linhas.append(f"# {titulo}\n\n")
        linhas.append("> Arquivo gerado automaticamente a partir da pasta `fotos/referencias`.\n\n")

    linhas.append("## Novas referências adicionadas\n\n")
    linhas.append("| Imagem | Comentário |\n")
    linhas.append("|--------|-----------|\n")

    for caminho in caminhos:
        rel_path = caminho.relative_to(BASE_DIR).as_posix()
        linhas.append(f"| ![](/{{rel_path}}) | *(descrever porque você gostou desta referência)* |\n")

    doc_path.write_text("".join(linhas), encoding="utf-8")
    print(f"Arquivo de referências atualizado: {doc_path}")


def processar():
    print(f"Raiz do projeto: {BASE_DIR}")
    print(f"Pasta base de referências: {BASE_REFERENCIAS}")
    print("-" * 60)

    if not BASE_REFERENCIAS.exists():
        print("Nenhuma pasta data/Referencias encontrada. Crie e coloque as imagens nas subpastas Fachada, Interiores, Gourmet, Outros.")
        return

    mudou_alguma_coisa = False

    for nome_categoria, config in CATEGORIAS.items():
        origem_cat = BASE_REFERENCIAS / nome_categoria
        if not origem_cat.exists():
            continue

        print(f"\n>>> Processando categoria: {nome_categoria}")
        imagens = coletar_imagens_categoria(origem_cat)
        if not imagens:
            print("Nenhuma imagem nova nesta categoria.")
            continue

        movidas = mover_imagens(imagens, config["dest"])
        atualizar_markdown(config["doc"], config["titulo"], movidas)
        mudou_alguma_coisa = True

    if not mudou_alguma_coisa:
        print("\nNenhuma nova referência encontrada para mover.")
    else:
        print("\nProcesso concluído. Verifique os arquivos .md de referências e faça commit/push.")


if __name__ == "__main__":
    processar()
