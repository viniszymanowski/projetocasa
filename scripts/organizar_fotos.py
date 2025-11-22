
import os
import shutil
from pathlib import Path

# Caminhos base (raiz do repositório = pasta onde está este script)
BASE_DIR = Path(__file__).resolve().parents[1]

# Pastas de origem e destino das fotos
ORIGEM_FOTOS = BASE_DIR / "data" / "Fotos"       # onde o GitHub Desktop salvou suas imagens
DESTINO_FOTOS = BASE_DIR / "fotos" / "terreno"   # pasta organizada
DOC_FOTOS = BASE_DIR / "docs" / "terreno" / "fotos-terreno.md"

EXTENSOES_IMAGENS = {".png", ".jpg", ".jpeg", ".gif", ".webp"}


def slugify(nome: str) -> str:
    """Simplifica o nome do arquivo: minúsculo, sem espaços estranhos."""
    nome = nome.strip().lower()
    nome = nome.replace("captura de tela", "captura")
    nome = nome.replace(" ", "-")
    nome = nome.replace("ç", "c")
    for ch in ["(", ")", "[", "]"]:
        nome = nome.replace(ch, "")
    return nome


def coletar_imagens():
    if not ORIGEM_FOTOS.exists():
        print(f"Nenhuma pasta de origem encontrada em: {ORIGEM_FOTOS}")
        return []

    arquivos = []
    for item in ORIGEM_FOTOS.iterdir():
        if item.is_file() and item.suffix.lower() in EXTENSOES_IMAGENS:
            arquivos.append(item)
    return arquivos


def mover_imagens(arquivos):
    DESTINO_FOTOS.mkdir(parents=True, exist_ok=True)

    novos_caminhos = []

    for origem in arquivos:
        novo_nome = slugify(origem.stem) + origem.suffix.lower()
        destino = DESTINO_FOTOS / novo_nome

        # Evita sobrescrever se já existir
        i = 1
        while destino.exists():
            destino = DESTINO_FOTOS / f"{slugify(origem.stem)}-{i}{origem.suffix.lower()}"
            i += 1

        shutil.move(str(origem), str(destino))
        novos_caminhos.append(destino)
        print(f"Movido: {origem} -> {destino}")

    return novos_caminhos


def atualizar_markdown(caminhos):
    if not caminhos:
        print("Nenhuma nova imagem para registrar em fotos-terreno.md")
        return

    DOC_FOTOS.parent.mkdir(parents=True, exist_ok=True)

    linhas = []

    if DOC_FOTOS.exists():
        conteudo_atual = DOC_FOTOS.read_text(encoding="utf-8")
        linhas.append(conteudo_atual.strip())
        linhas.append("\n\n---\n")
    else:
        linhas.append("# Fotos do Terreno\n")
        linhas.append("> Arquivo gerado automaticamente a partir da pasta `fotos/terreno`.\n\n")

    linhas.append("## Novas fotos adicionadas\n\n")
    linhas.append("| Arquivo | Descrição |\n")
    linhas.append("|--------|-----------|\n")

    for caminho in caminhos:
        rel_path = caminho.relative_to(BASE_DIR).as_posix()
        linhas.append(f"| ![](/{{rel_path}}) | *(preencher descrição)* |\n")

    DOC_FOTOS.write_text("".join(linhas), encoding="utf-8")
    print(f"Arquivo de índice atualizado: {DOC_FOTOS}")


def main():
    print(f"Raiz do projeto: {BASE_DIR}")
    print(f"Origem das fotos: {ORIGEM_FOTOS}")
    print(f"Destino das fotos: {DESTINO_FOTOS}")
    print("-" * 60)

    imagens = coletar_imagens()
    if not imagens:
        print("Nenhuma imagem encontrada em data/Fotos.")
        return

    movidas = mover_imagens(imagens)
    atualizar_markdown(movidas)

    print("\nConcluído. Agora você pode fazer commit e push das alterações.")


if __name__ == "__main__":
    main()
