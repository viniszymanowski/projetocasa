from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parents[1]


def resolver_conflitos_arquivo(caminho_arquivo: Path, modo: str):
    """
    Resolve conflitos em um único arquivo.

    modo: "local"  -> mantém bloco acima de =======
          "remoto" -> mantém bloco abaixo de =======
    """
    try:
        texto = caminho_arquivo.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        print(f"[IGNORADO] Arquivo binário ou com encoding estranho: {caminho_arquivo}")
        return

    if "<<<<<<<" not in texto:
        # nenhum conflito
        return

    linhas = texto.splitlines(keepends=True)
    resultado = []
    i = 0
    houve_conflito = False

    while i < len(linhas):
        linha = linhas[i]
        if linha.startswith("<<<<<<< "):
            houve_conflito = True
            i += 1
            bloco_local = []
            while i < len(linhas) and not linhas[i].startswith("======="):
                bloco_local.append(linhas[i])
                i += 1

            if i >= len(linhas) or not linhas[i].startswith("======="):
                print(f"[AVISO] Marcador '=======' não encontrado corretamente em {caminho_arquivo}")
                break

            i += 1  # pula =======

            bloco_remoto = []
            while i < len(linhas) and not linhas[i].startswith(">>>>>>> "):
                bloco_remoto.append(linhas[i])
                i += 1

            if i >= len(linhas) or not linhas[i].startswith(">>>>>>> "):
                print(f"[AVISO] Marcador '>>>>>>>' não encontrado corretamente em {caminho_arquivo}")
                break

            i += 1  # pula >>>>>>>

            if modo == "local":
                resultado.extend(bloco_local)
            else:
                resultado.extend(bloco_remoto)
        else:
            resultado.append(linha)
            i += 1

    if houve_conflito:
        caminho_arquivo.write_text("".join(resultado), encoding="utf-8")
        print(f"[OK] Conflitos resolvidos em: {caminho_arquivo}")


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("local", "remoto"):
        print("Uso: py scripts/resolver_conflitos.py local|remoto")
        print("  local  -> mantém sua versão (HEAD)")
        print("  remoto -> mantém versão do servidor (origin/main)")
        return

    modo = sys.argv[1]
    print(f"Modo de resolução: {modo}")
    print(f"Procurando conflitos em: {BASE_DIR}")
    print("-" * 60)

    arquivos_com_conflito = []

    for caminho in BASE_DIR.rglob("*"):
        if not caminho.is_file():
            continue
        if caminho.name.startswith("."):
            continue

        try:
            texto = caminho.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        if "<<<<<<<" in texto and "=======" in texto and ">>>>>>> " in texto:
            arquivos_com_conflito.append(caminho)

    if not arquivos_com_conflito:
        print("Nenhum arquivo com marcadores de conflito encontrado.")
        return

    print("Arquivos com conflito encontrados:")
    for arq in arquivos_com_conflito:
        print(" -", arq.relative_to(BASE_DIR))

    for arq in arquivos_com_conflito:
        resolver_conflitos_arquivo(arq, modo)

    print("\nConcluído. Verifique os arquivos no GitHub Desktop e depois faça o commit + push.")


if __name__ == "__main__":
    main()
