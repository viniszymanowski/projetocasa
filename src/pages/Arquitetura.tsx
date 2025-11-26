import { useState, useEffect } from "react";

interface Ambiente {
  id: string;
  nome: string;
  categoria: string;
  metragem: number;
  requisitos: string;
}

const categorias = ["Social", "Íntimo", "Serviço", "Circulação", "Área Externa"];

const ambientesPadrao = [
  { nome: "Sala de Estar", categoria: "Social", metragem: 20, requisitos: "" },
  { nome: "Cozinha", categoria: "Social", metragem: 15, requisitos: "Cozinha ampla com ilha central" },
  { nome: "Sala de Jantar", categoria: "Social", metragem: 15, requisitos: "" },
  { nome: "Quarto Casal", categoria: "Íntimo", metragem: 15, requisitos: "" },
  { nome: "Banheiro Suíte", categoria: "Íntimo", metragem: 6, requisitos: "" },
  { nome: "Quarto Hóspedes", categoria: "Íntimo", metragem: 12, requisitos: "" },
  { nome: "Banheiro Social", categoria: "Serviço", metragem: 4, requisitos: "" },
  { nome: "Lavanderia", categoria: "Serviço", metragem: 4, requisitos: "" },
  { nome: "Garagem", categoria: "Serviço", metragem: 30, requisitos: "" },
  { nome: "Área de Lazer", categoria: "Área Externa", metragem: 25, requisitos: "" },
];

export default function Arquitetura() {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [novoAmbiente, setNovoAmbiente] = useState({
    nome: "",
    categoria: "Social",
    metragem: 0,
    requisitos: ""
  });

  // Carregar dados salvos ou padrão
  useEffect(() => {
    const savedAmbientes = localStorage.getItem('programa_necessidades');
    
    if (savedAmbientes) {
      setAmbientes(JSON.parse(savedAmbientes));
    } else {
      // Se não houver dados salvos, carregar padrão automaticamente
      const ambientesComId = ambientesPadrao.map((amb, idx) => ({
        id: `padrao-${idx}`,
        ...amb
      }));
      setAmbientes(ambientesComId);
      localStorage.setItem('programa_necessidades', JSON.stringify(ambientesComId));
      window.dispatchEvent(new Event('localStorageUpdate'));
    }
  }, []);

  const salvarDados = () => {
    localStorage.setItem('programa_necessidades', JSON.stringify(ambientes));
    window.dispatchEvent(new Event('localStorageUpdate'));
    alert("Programa de necessidades salvo!");
  };

  const adicionarAmbiente = () => {
    if (!novoAmbiente.nome || novoAmbiente.metragem <= 0) {
      alert("Preencha nome e metragem válida!");
      return;
    }

    const ambiente: Ambiente = {
      id: Date.now().toString(),
      ...novoAmbiente
    };

    const novosAmbientes = [...ambientes, ambiente];
    setAmbientes(novosAmbientes);
    localStorage.setItem('programa_necessidades', JSON.stringify(novosAmbientes));
    window.dispatchEvent(new Event('localStorageUpdate'));
    
    setNovoAmbiente({
      nome: "",
      categoria: "Social",
      metragem: 0,
      requisitos: ""
    });
    
    alert(`${ambiente.nome} adicionado!`);
  };

  const removerAmbiente = (id: string) => {
    const novosAmbientes = ambientes.filter(a => a.id !== id);
    setAmbientes(novosAmbientes);
    localStorage.setItem('programa_necessidades', JSON.stringify(novosAmbientes));
    window.dispatchEvent(new Event('localStorageUpdate'));
  };

  const carregarPadrao = () => {
    const ambientesComId = ambientesPadrao.map((amb, idx) => ({
      id: `padrao-${idx}`,
      ...amb
    }));
    setAmbientes(ambientesComId);
    localStorage.setItem('programa_necessidades', JSON.stringify(ambientesComId));
    window.dispatchEvent(new Event('localStorageUpdate'));
    alert("Programa padrão carregado!");
  };

  const areaTotal = ambientes.reduce((sum, amb) => sum + amb.metragem, 0);

  const distribuicaoPorCategoria = categorias.map(cat => {
    const total = ambientes
      .filter(amb => amb.categoria === cat)
      .reduce((sum, amb) => sum + amb.metragem, 0);
    return { categoria: cat, total };
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a2e' }}>Programa Arquitetônico</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Defina os ambientes e requisitos do seu projeto</p>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <button onClick={carregarPadrao} style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Carregar Padrão
          </button>
          <button onClick={salvarDados} style={{ padding: '12px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Salvar
          </button>
        </div>

        {/* Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Área Total</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{areaTotal.toFixed(2)} m²</p>
          </div>
          <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Ambientes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{ambientes.length}</p>
          </div>
        </div>

        {/* Distribuição por Categoria */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>Distribuição de Áreas por Categoria</h2>
          {distribuicaoPorCategoria.map(({ categoria, total }) => (
            <div key={categoria} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>{categoria}</span>
                <span>{total.toFixed(2)} m² ({areaTotal > 0 ? ((total / areaTotal) * 100).toFixed(1) : 0}%)</span>
              </div>
              <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${areaTotal > 0 ? (total / areaTotal) * 100 : 0}%`, 
                  height: '100%', 
                  background: '#3b82f6',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Adicionar Ambiente */}
        <div style={{ background: '#f9fafb', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>Adicionar Ambiente</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Nome do Ambiente</label>
              <input
                type="text"
                placeholder="Ex: Sala de Estar"
                value={novoAmbiente.nome}
                onChange={(e) => setNovoAmbiente({...novoAmbiente, nome: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Categoria</label>
              <select
                value={novoAmbiente.categoria}
                onChange={(e) => setNovoAmbiente({...novoAmbiente, categoria: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Metragem (m²)</label>
              <input
                type="number"
                placeholder="0"
                value={novoAmbiente.metragem || ""}
                onChange={(e) => setNovoAmbiente({...novoAmbiente, metragem: parseFloat(e.target.value) || 0})}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Requisitos Específicos (opcional)</label>
            <textarea
              placeholder="Ex: Pé direito duplo, iluminação natural, vista..."
              value={novoAmbiente.requisitos}
              onChange={(e) => setNovoAmbiente({...novoAmbiente, requisitos: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '80px' }}
            />
          </div>
          <button 
            onClick={adicionarAmbiente}
            style={{ marginTop: '15px', padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Adicionar
          </button>
        </div>

        {/* Lista de Ambientes */}
        <div>
          <h2 style={{ marginBottom: '20px' }}>Ambientes do Projeto ({ambientes.length})</h2>
          <p style={{ marginBottom: '15px', color: '#666' }}>Total: {areaTotal.toFixed(2)} m²</p>
          <div style={{ display: 'grid', gap: '15px' }}>
            {ambientes.map(amb => (
              <div key={amb.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{amb.nome}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>{amb.categoria}</p>
                    <p style={{ color: '#3b82f6', fontWeight: 'bold' }}>{amb.metragem} m²</p>
                    {amb.requisitos && (
                      <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>{amb.requisitos}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => removerAmbiente(amb.id)}
                    style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
