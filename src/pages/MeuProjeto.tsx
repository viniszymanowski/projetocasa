import PageTemplate from "../components/PageTemplate";

export default function MeuProjeto() {
  return (
    <PageTemplate 
      title="Meu Projeto"
      subtitle="Visão geral e sugestões personalizadas"
    >
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <p style={{ fontSize: '1.2rem' }}>🚧 Página em desenvolvimento</p>
        <p style={{ marginTop: '20px' }}>
          Funcionalidade será implementada em breve.
        </p>
      </div>
    </PageTemplate>
  );
}
