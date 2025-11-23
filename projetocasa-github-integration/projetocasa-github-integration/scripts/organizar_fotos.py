import os
import shutil
from pathlib import Path

# Raiz do repositório (pasta acima de /scripts)
BASE_DIR = Path(__file__).resolve().parents[1]

# Pastas de origem e destino das fotos
ORIGEM_FOTOS = BASE_DIR / "data" / "Fotos"       # onde você joga as fotos novas
DESTINO_FOTOS = BASE_DIR / "fotos" / "terreno"   # pasta organizada
DOC_FOTOS_MD = BASE_DIR / "docs" / "terreno" / "fotos-terreno.md"
DOC_FOTOS_HTML = BASE_DIR / "docs" / "terreno" / "fotos-terreno.html"

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


def coletar_imagens_origem():
    if not ORIGEM_FOTOS.exists():
        print(f"Nenhuma pasta de origem encontrada em: {ORIGEM_FOTOS}")
        return []

    arquivos = []
    for item in ORIGEM_FOTOS.iterdir():
        if item.is_file() and item.suffix.lower() in EXTENSOES_IMAGENS:
            arquivos.append(item)
    return arquivos


def mover_imagens(arquivos):
    """
    Move apenas as imagens que estão em data/Fotos para fotos/terreno.
    Retorna a lista de novos caminhos movidos.
    """
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


def atualizar_markdown(caminhos_novos):
    """
    Atualiza o fotos-terreno.md SEM apagar o que já existe.
    Cada execução vai acrescentando blocos de 'Novas fotos adicionadas'.
    """
    if not caminhos_novos:
        print("Nenhuma nova imagem para registrar em fotos-terreno.md")
        return

    DOC_FOTOS_MD.parent.mkdir(parents=True, exist_ok=True)

    linhas = []

    if DOC_FOTOS_MD.exists():
        conteudo_atual = DOC_FOTOS_MD.read_text(encoding="utf-8").strip()
        if conteudo_atual:
            linhas.append(conteudo_atual)
            linhas.append("\n\n---\n\n")
    else:
        linhas.append("# Fotos do Terreno\n\n")
        linhas.append("> Arquivo gerado automaticamente a partir da pasta `fotos/terreno`.\n\n")

    linhas.append("## Novas fotos adicionadas\n\n")
    linhas.append("| Arquivo | Descrição |\n")
    linhas.append("|--------|-----------|\n")

    for caminho in caminhos_novos:
        rel_path = caminho.relative_to(BASE_DIR).as_posix()
        linhas.append(f"| ![](/{rel_path}) | *(preencher descrição)* |\n")

    DOC_FOTOS_MD.write_text("".join(linhas), encoding="utf-8")
    print(f"Arquivo de índice Markdown atualizado: {DOC_FOTOS_MD}")


def gerar_html_galeria():
    """
    Gera/atualiza um HTML de galeria simples com TODAS as imagens
    que estiverem em fotos/terreno.
    Sempre reconstrói a página do zero.
    """
    if not DESTINO_FOTOS.exists():
        print("Pasta de destino ainda não existe, não há galeria HTML para gerar.")
        return

    imagens = [
        p for p in sorted(DESTINO_FOTOS.iterdir())
        if p.is_file() and p.suffix.lower() in EXTENSOES_IMAGENS
    ]

    if not imagens:
        print("Nenhuma imagem em fotos/terreno para montar galeria HTML.")
        return

    DOC_FOTOS_MD.parent.mkdir(parents=True, exist_ok=True)

    html = [
        "<!DOCTYPE html>",
        "<html lang='pt-BR'>",
        "<head>",
        "  <meta charset='UTF-8' />",
        "  <title>Fotos do Terreno – Galeria</title>",
        "  <style>",
        "    body { font-family: system-ui, sans-serif; background:#f4f4f7; margin:0; padding:20px; }",
        "    h1 { margin-top:0; }",
        "    .grid { display:flex; flex-wrap:wrap; gap:16px; }",
        "    .foto { background:#fff; border-radius:8px; padding:8px; box-shadow:0 2px 6px rgba(0,0,0,0.08); width:260px; }",
        "    .foto img { max-width:100%; border-radius:6px; display:block; }",
        "    .foto figcaption { font-size:0.85rem; margin-top:6px; color:#444; }",
        "  </style>",
        "</head>",
        "<body>",
        "  <h1>Fotos do Terreno – Galeria</h1>",
        "  <p>Galeria gerada automaticamente a partir da pasta <code>fotos/terreno</code>.</p>",
        "  <div class='grid'>",
    ]

    for img in imagens:
        rel_path = img.relative_to(BASE_DIR).as_posix()
        html.append("    <figure class='foto'>")
        html.append(f"      <img src='/{rel_path}' alt='{img.name}' />")
        html.append(f"      <figcaption>{img.name}</figcaption>")
        html.append("    </figure>")

    html.extend([
        "  </div>",
        "</body>",
        "</html>",
    ])

    DOC_FOTOS_HTML.write_text("\n".join(html), encoding="utf-8")
    print(f"Galeria HTML atualizada: {DOC_FOTOS_HTML}")


def main():
    print(f"Raiz do projeto: {BASE_DIR}")
    print(f"Origem das fotos: {ORIGEM_FOTOS}")
    print(f"Destino das fotos: {DESTINO_FOTOS}")
    print("-" * 60)

    imagens_origem = coletar_imagens_origem()

    if not imagens_origem:
        print("Nenhuma nova imagem encontrada em data/Fotos. Mesmo assim vou atualizar apenas a galeria HTML com o que já existe em fotos/terreno.")
        gerar_html_galeria()
        return

    caminhos_novos = mover_imagens(imagens_origem)
    atualizar_markdown(caminhos_novos)
    gerar_html_galeria()

    print("\nConcluído. Agora você pode fazer commit e push das alterações.")


if __name__ == "__main__":
    main()
