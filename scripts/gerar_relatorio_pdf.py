#!/usr/bin/env python3
"""
gerar_relatorio_pdf.py
----------------------
Gera um relatório completo do projeto em formato PDF, consolidando
todas as informações relevantes da documentação.

Uso:
    python scripts/gerar_relatorio_pdf.py
"""

import sys
from pathlib import Path
from datetime import datetime


def coletar_conteudo_markdown(base_dir: Path) -> dict:
    """
    Coleta o conteúdo de todos os arquivos Markdown relevantes.
    """
    secoes = {
        'Persona': [],
        'Terreno': [],
        'Arquitetura': [],
        'Decisões': [],
        'Normas': [],
        'Projeto': []
    }
    
    # Mapeamento de diretórios para seções
    mapeamento = {
        'persona': 'Persona',
        'terreno': 'Terreno',
        'arquitetura': 'Arquitetura',
        'decisoes': 'Decisões',
        'normas': 'Normas',
        'projeto': 'Projeto'
    }
    
    docs_dir = base_dir / 'docs'
    
    for pasta, secao in mapeamento.items():
        pasta_path = docs_dir / pasta
        if not pasta_path.exists():
            continue
        
        # Coleta todos os arquivos .md recursivamente
        for arquivo_md in sorted(pasta_path.rglob('*.md')):
            # Ignora arquivos muito pequenos (provavelmente vazios)
            if arquivo_md.stat().st_size < 50:
                continue
            
            try:
                conteudo = arquivo_md.read_text(encoding='utf-8')
                titulo = arquivo_md.stem.replace('_', ' ').replace('-', ' ').title()
                
                secoes[secao].append({
                    'titulo': titulo,
                    'arquivo': arquivo_md.relative_to(base_dir),
                    'conteudo': conteudo
                })
            except Exception as e:
                print(f"⚠️  Erro ao ler {arquivo_md}: {e}")
    
    return secoes


def gerar_markdown_consolidado(base_dir: Path, secoes: dict) -> Path:
    """
    Gera um arquivo Markdown consolidado com todo o conteúdo.
    """
    linhas = []
    
    # Cabeçalho
    linhas.append("# Relatório Completo do Projeto - ProjetoCasa")
    linhas.append("")
    linhas.append(f"**Data de geração:** {datetime.now().strftime('%d/%m/%Y às %H:%M')}")
    linhas.append("")
    linhas.append("---")
    linhas.append("")
    
    # Índice
    linhas.append("## Índice")
    linhas.append("")
    for secao, documentos in secoes.items():
        if documentos:
            linhas.append(f"- **{secao}**")
            for doc in documentos:
                linhas.append(f"  - {doc['titulo']}")
    linhas.append("")
    linhas.append("---")
    linhas.append("")
    
    # Conteúdo de cada seção
    for secao, documentos in secoes.items():
        if not documentos:
            continue
        
        linhas.append(f"# {secao}")
        linhas.append("")
        
        for doc in documentos:
            linhas.append(f"## {doc['titulo']}")
            linhas.append("")
            linhas.append(f"*Fonte: `{doc['arquivo']}`*")
            linhas.append("")
            linhas.append(doc['conteudo'])
            linhas.append("")
            linhas.append("---")
            linhas.append("")
    
    # Rodapé
    linhas.append("")
    linhas.append("---")
    linhas.append("")
    linhas.append("*Relatório gerado automaticamente pelo sistema ProjetoCasa*")
    
    # Salva o arquivo consolidado
    output_path = base_dir / "relatorio_completo.md"
    output_path.write_text("\n".join(linhas), encoding='utf-8')
    
    return output_path


def converter_para_pdf(markdown_path: Path, pdf_path: Path) -> bool:
    """
    Converte o arquivo Markdown para PDF usando a ferramenta manus-md-to-pdf.
    """
    import subprocess
    
    try:
        resultado = subprocess.run(
            ['manus-md-to-pdf', str(markdown_path), str(pdf_path)],
            capture_output=True,
            text=True
        )
        
        if resultado.returncode == 0:
            return True
        else:
            print(f"❌ Erro na conversão: {resultado.stderr}")
            return False
    except FileNotFoundError:
        print("❌ Ferramenta manus-md-to-pdf não encontrada.")
        print("   O relatório em Markdown foi gerado, mas não foi possível converter para PDF.")
        return False
    except Exception as e:
        print(f"❌ Erro ao converter para PDF: {e}")
        return False


def main():
    BASE_DIR = Path(__file__).resolve().parents[1]
    
    print("=" * 70)
    print("📄 GERADOR DE RELATÓRIO COMPLETO - ProjetoCasa")
    print("=" * 70)
    print()
    
    # Passo 1: Coletar conteúdo
    print("📚 Coletando documentação...")
    secoes = coletar_conteudo_markdown(BASE_DIR)
    
    total_docs = sum(len(docs) for docs in secoes.values())
    print(f"   ✅ {total_docs} documentos coletados")
    print()
    
    # Passo 2: Gerar Markdown consolidado
    print("📝 Gerando relatório consolidado...")
    markdown_path = gerar_markdown_consolidado(BASE_DIR, secoes)
    print(f"   ✅ Markdown gerado: {markdown_path.name}")
    print()
    
    # Passo 3: Converter para PDF
    print("🔄 Convertendo para PDF...")
    pdf_path = BASE_DIR / "relatorio_completo.pdf"
    
    if converter_para_pdf(markdown_path, pdf_path):
        print(f"   ✅ PDF gerado: {pdf_path.name}")
        print()
        print("=" * 70)
        print("✅ RELATÓRIO COMPLETO GERADO COM SUCESSO!")
        print("=" * 70)
        print()
        print(f"📄 Arquivos gerados:")
        print(f"   - Markdown: {markdown_path}")
        print(f"   - PDF: {pdf_path}")
    else:
        print()
        print("=" * 70)
        print("⚠️  RELATÓRIO PARCIALMENTE GERADO")
        print("=" * 70)
        print()
        print(f"📄 Arquivo gerado:")
        print(f"   - Markdown: {markdown_path}")
        print()
        print("💡 Para gerar o PDF manualmente, execute:")
        print(f"   manus-md-to-pdf {markdown_path} {pdf_path}")
    
    print()


if __name__ == "__main__":
    main()
