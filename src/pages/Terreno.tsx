import PageTemplate from "../components/PageTemplate";

export default function Terreno() {
  return (
    <PageTemplate 
      title="Informações do Terreno"
      subtitle="Dados, medidas e fotos do lote"
    >
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <p style={{ fontSize: '1.2rem' }}>📍 Página em desenvolvimento</p>
        <p style={{ marginTop: '20px' }}>
          Em breve você poderá cadastrar informações detalhadas do terreno, incluindo medidas, topografia e fotos.
        </p>
      </div>
    </PageTemplate>
  );
}
