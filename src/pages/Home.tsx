import { Link } from "wouter";

export default function Home() {
  const modulos = [
    { nome: "Persona", descricao: "Defina o perfil dos moradores", link: "/persona" },
    { nome: "Arquitetura", descricao: "Ambientes e necessidades", link: "/arquitetura" },
    { nome: "Layout", descricao: "Crie e visualize a planta baixa", link: "/layout" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            ProjetoCasa
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)' }}>
            Sistema Interativo de Gestão de Projeto Residencial
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {modulos.map(modulo => (
            <Link key={modulo.nome} href={modulo.link}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
                }
              }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#1a1a2e' }}>
                  {modulo.nome}
                </h2>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                  {modulo.descricao}
                </p>
                <div style={{ marginTop: '20px', color: '#3b82f6', fontWeight: 'bold' }}>
                  Acessar →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
          <p>✨ Editor geométrico com zoom, pan, réguas e rotação</p>
          <p style={{ marginTop: '10px' }}>🎨 Interface moderna e intuitiva</p>
        </div>
      </div>
    </div>
  );
}
