import { Link } from "wouter";
import { useState, useEffect } from "react";
import { 
  Users, MapPin, Building2, Grid3x3, Heart, FileText,
  Image, ClipboardList, FolderOpen, Palette, FileSignature,
  DollarSign, Truck, TrendingUp, CheckCircle, AlertCircle, Home as HomeIcon
} from "lucide-react";

export default function Dashboard() {
  const [metricas, setMetricas] = useState({
    progresso: 0,
    tarefasConcluidas: 0,
    pendencias: 0,
    taxaOcupacao: 0,
    areaOcupada: 0,
    areaTotal: 301
  });

  useEffect(() => {
    // Calcular métricas baseado nos dados salvos
    const ambientes = JSON.parse(localStorage.getItem('programa_necessidades') || '[]');
    const layout = JSON.parse(localStorage.getItem('layout_planta') || '[]');
    
    const areaOcupada = ambientes.reduce((sum: number, amb: any) => sum + (amb.metragem || 0), 0);
    const taxaOcupacao = (areaOcupada / 301) * 100;
    
    setMetricas({
      progresso: layout.length > 0 ? 60 : 0,
      tarefasConcluidas: layout.length,
      pendencias: ambientes.length - layout.length,
      taxaOcupacao,
      areaOcupada,
      areaTotal: 301
    });
  }, []);

  const modulos = [
    { nome: "Persona", descricao: "Defina o perfil dos moradores", link: "/persona", icon: Users, cor: "#3b82f6" },
    { nome: "Terreno", descricao: "Informações e fotos do lote", link: "/terreno", icon: MapPin, cor: "#10b981" },
    { nome: "Arquitetura", descricao: "Ambientes e necessidades", link: "/arquitetura", icon: Building2, cor: "#a855f7" },
    { nome: "Layout", descricao: "Crie e visualize a planta baixa", link: "/layout", icon: Grid3x3, cor: "#8b5cf6" },
    { nome: "Preferências", descricao: "Estilos e cores por ambiente", link: "/preferencias", icon: Heart, cor: "#ec4899" },
    { nome: "Normas", descricao: "Verificar conformidade", link: "/normas", icon: FileText, cor: "#f59e0b" },
    { nome: "Galeria", descricao: "Fotos organizadas por ambiente", link: "/galeria", icon: Image, cor: "#06b6d4" },
    { nome: "Moodboard", descricao: "Inspirações e referências", link: "/moodboard", icon: Palette, cor: "#d946ef" },
    { nome: "Questionário", descricao: "Perguntas e respostas", link: "/questionario", icon: ClipboardList, cor: "#14b8a6" },
    { nome: "Meu Projeto", descricao: "Visão geral e sugestões", link: "/meu-projeto", icon: FolderOpen, cor: "#f97316" },
    { nome: "Contrato", descricao: "Dados de compra do terreno", link: "/contrato", icon: FileSignature, cor: "#6366f1" },
    { nome: "Financeiro", descricao: "Controle de gastos e orçamento", link: "/financeiro", icon: DollarSign, cor: "#10b981" },
    { nome: "Fornecedores", descricao: "Cadastro e comparação", link: "/fornecedores", icon: Truck, cor: "#8b5cf6" },
  ];

  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Futura Residência B&S
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
            Sistema interativo de gestão e documentação do projeto residencial
          </p>
        </div>

        {/* Métricas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '50px' 
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '25px', 
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <TrendingUp size={24} style={{ color: '#3b82f6', marginRight: '10px' }} />
              <h3 style={{ fontSize: '0.9rem', color: '#666' }}>Progresso Geral</h3>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {metricas.progresso}%
            </p>
            <div style={{ 
              height: '6px', 
              background: '#e5e7eb', 
              borderRadius: '3px', 
              marginTop: '10px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${metricas.progresso}%`, 
                height: '100%', 
                background: '#3b82f6',
                transition: 'width 0.5s'
              }} />
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '25px', 
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <CheckCircle size={24} style={{ color: '#10b981', marginRight: '10px' }} />
              <h3 style={{ fontSize: '0.9rem', color: '#666' }}>Tarefas Concluídas</h3>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
              {metricas.tarefasConcluidas}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>Itens finalizados</p>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '25px', 
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AlertCircle size={24} style={{ color: '#f59e0b', marginRight: '10px' }} />
              <h3 style={{ fontSize: '0.9rem', color: '#666' }}>Pendências</h3>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {metricas.pendencias}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>Itens pendentes</p>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.95)', 
            padding: '25px', 
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <HomeIcon size={24} style={{ color: '#a855f7', marginRight: '10px' }} />
              <h3 style={{ fontSize: '0.9rem', color: '#666' }}>Taxa de Ocupação</h3>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a855f7' }}>
              {metricas.taxaOcupacao.toFixed(1)}%
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
              {metricas.areaOcupada.toFixed(0)}m² de {metricas.areaTotal}m²
            </p>
          </div>
        </div>

        {/* Módulos */}
        <div>
          <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Módulos do Sistema
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '25px' 
          }}>
            {modulos.map(modulo => {
              const Icon = modulo.icon;
              return (
                <Link key={modulo.nome} href={modulo.link}>
                  <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '30px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                  }}
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: modulo.cor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <Icon size={30} color="white" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#1a1a2e' }}>
                      {modulo.nome}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '15px' }}>
                      {modulo.descricao}
                    </p>
                    <div style={{ color: modulo.cor, fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Acessar →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
