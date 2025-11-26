import PageTemplate from "../components/PageTemplate";

export default function Preferencias() {
  return (
    <PageTemplate 
      title="Preferências de Design"
      subtitle="Defina estilos, cores e acabamentos para cada ambiente"
    >
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <p style={{ fontSize: '1.2rem' }}>🎨 Página em desenvolvimento</p>
        <p style={{ marginTop: '20px' }}>
          Em breve você poderá definir preferências de estilo, paleta de cores e acabamentos para cada ambiente.
        </p>
      </div>
    </PageTemplate>
  );
}
