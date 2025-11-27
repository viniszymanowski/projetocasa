import { useState } from 'react';
import { Download, Upload, Database, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Configuracoes() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const exportData = () => {
    try {
      // Coletar todos os dados do localStorage
      const allData: Record<string, any> = {};
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              // Tentar parsear como JSON
              allData[key] = JSON.parse(value);
            } catch {
              // Se não for JSON, salvar como string
              allData[key] = value;
            }
          }
        }
      }

      // Criar arquivo JSON
      const dataStr = JSON.stringify(allData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      // Criar link de download
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `projetocasa-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMessage({ 
        type: 'success', 
        text: `✅ Dados exportados com sucesso! ${Object.keys(allData).length} itens salvos.` 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `❌ Erro ao exportar dados: ${error}` 
      });
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        // Importar todos os dados
        let importedCount = 0;
        for (const [key, value] of Object.entries(data)) {
          const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, valueStr);
          importedCount++;
        }

        setMessage({ 
          type: 'success', 
          text: `✅ Dados importados com sucesso! ${importedCount} itens restaurados. Recarregue a página para ver as mudanças.` 
        });

        // Recarregar página após 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: `❌ Erro ao importar dados: ${error}` 
        });
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('⚠️ ATENÇÃO: Isso vai apagar TODOS os dados salvos! Tem certeza?')) {
      if (window.confirm('Última confirmação: Todos os dados serão perdidos. Continuar?')) {
        localStorage.clear();
        setMessage({ 
          type: 'info', 
          text: '🗑️ Todos os dados foram apagados. Recarregando página...' 
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <Database size={32} color="#667eea" />
            <h1 style={{ fontSize: '2rem', margin: 0, color: '#333' }}>
              Gerenciar Dados
            </h1>
          </div>
          <p style={{ color: '#666', margin: 0 }}>
            Exporte, importe ou limpe todos os dados do sistema
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            background: message.type === 'success' ? '#d4edda' : message.type === 'error' ? '#f8d7da' : '#d1ecf1',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : message.type === 'error' ? '#f5c6cb' : '#bee5eb'}`,
            color: message.type === 'success' ? '#155724' : message.type === 'error' ? '#721c24' : '#0c5460',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Exportar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Download size={24} color="#667eea" />
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#333' }}>
              Exportar Dados
            </h2>
          </div>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Baixe todos os dados salvos (ambientes, contratos, preferências, etc.) como arquivo JSON.
          </p>
          <button
            onClick={exportData}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '15px 30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Download size={20} />
            Exportar Todos os Dados
          </button>
        </div>

        {/* Importar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Upload size={24} color="#667eea" />
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#333' }}>
              Importar Dados
            </h2>
          </div>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Restaure dados de um backup anterior. Isso vai sobrescrever os dados atuais.
          </p>
          <label style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '15px 30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Upload size={20} />
            Selecionar Arquivo JSON
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* Limpar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          border: '2px solid #f8d7da'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <AlertCircle size={24} color="#dc3545" />
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#dc3545' }}>
              Limpar Todos os Dados
            </h2>
          </div>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            ⚠️ <strong>ATENÇÃO:</strong> Esta ação é irreversível! Todos os dados serão perdidos permanentemente.
          </p>
          <button
            onClick={clearAllData}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '15px 30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🗑️ Limpar Todos os Dados
          </button>
        </div>
      </div>
    </div>
  );
}
