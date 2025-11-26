import { useState, useEffect, useRef } from "react";

interface Ambiente {
  id: string;
  nome: string;
  categoria: string;
  metragem: number;
}

interface Vertice {
  x: number;
  y: number;
}

interface ElementoLayout {
  id: string;
  ambienteId: string;
  vertices: Vertice[];
  cor: string;
  rotacao: number; // em graus
}

type ModoEdicao = 'selecionar' | 'editar_vertices' | 'desenhar_poligono';

const ESCALA_BASE = 20; // 1 metro = 20 pixels
const GRID_SIZE = 20;
const VERTICE_RAIO = 6;

export default function Layout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [elementos, setElementos] = useState<ElementoLayout[]>([]);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState<string>("");
  const [elementoSelecionado, setElementoSelecionado] = useState<string | null>(null);
  const [modoEdicao, setModoEdicao] = useState<ModoEdicao>('selecionar');
  
  // Estados para zoom e pan
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Carregar ambientes do localStorage
  useEffect(() => {
    const ambientesStr = localStorage.getItem('programa_necessidades');
    if (ambientesStr) {
      setAmbientes(JSON.parse(ambientesStr));
    }

    const layoutStr = localStorage.getItem('layout_planta');
    if (layoutStr) {
      setElementos(JSON.parse(layoutStr));
    }
  }, []);

  // Salvar layout no localStorage
  useEffect(() => {
    if (elementos.length > 0) {
      localStorage.setItem('layout_planta', JSON.stringify(elementos));
    }
  }, [elementos]);

  // Desenhar canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Aplicar transformações (zoom e pan)
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    // Desenhar grid
    desenharGrid(ctx, canvas.width / zoom, canvas.height / zoom);

    // Desenhar réguas
    desenharReguas(ctx, canvas.width / zoom, canvas.height / zoom);

    // Desenhar elementos
    elementos.forEach(el => {
      desenharElemento(ctx, el, el.id === elementoSelecionado);
    });

    ctx.restore();
  }, [elementos, elementoSelecionado, zoom, panX, panY]);

  const desenharGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const desenharReguas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    // Régua horizontal (topo)
    for (let x = 0; x <= width; x += GRID_SIZE * 5) {
      const metros = Math.round(x / ESCALA_BASE);
      ctx.fillText(`${metros}m`, x, 15);
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, 25);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
    }

    // Régua vertical (esquerda)
    ctx.textAlign = 'right';
    for (let y = 0; y <= height; y += GRID_SIZE * 5) {
      const metros = Math.round(y / ESCALA_BASE);
      ctx.fillText(`${metros}m`, 35, y + 5);
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(45, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
    }
  };

  const desenharElemento = (ctx: CanvasRenderingContext2D, el: ElementoLayout, selecionado: boolean) => {
    if (el.vertices.length < 3) return;

    // Desenhar polígono
    ctx.beginPath();
    ctx.moveTo(el.vertices[0].x, el.vertices[0].y);
    el.vertices.forEach((v, i) => {
      if (i > 0) ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();

    ctx.fillStyle = el.cor + '80'; // 50% transparência
    ctx.fill();

    if (selecionado) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
    } else {
      ctx.strokeStyle = el.cor;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
    }
    ctx.stroke();

    // Desenhar vértices se selecionado
    if (selecionado && modoEdicao === 'editar_vertices') {
      el.vertices.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, VERTICE_RAIO, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Desenhar nome do ambiente no centro
    const ambiente = ambientes.find(a => a.id === el.ambienteId);
    if (ambiente) {
      const centroX = el.vertices.reduce((sum, v) => sum + v.x, 0) / el.vertices.length;
      const centroY = el.vertices.reduce((sum, v) => sum + v.y, 0) / el.vertices.length;
      
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(ambiente.nome, centroX, centroY - 5);
      ctx.font = '12px Arial';
      ctx.fillText(`${ambiente.metragem}m²`, centroX, centroY + 10);
    }
  };

  // Handler de zoom (scroll do mouse)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)));
  };

  // Handler de pan (arrastar com botão direito)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2 || e.ctrlKey) { // Botão direito ou Ctrl+click
      setIsPanning(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      setPanX(prev => prev + dx);
      setPanY(prev => prev + dy);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Adicionar ambiente ao layout
  const adicionarAmbiente = () => {
    if (!ambienteSelecionado) {
      alert('Selecione um ambiente primeiro!');
      return;
    }

    const ambiente = ambientes.find(a => a.id === ambienteSelecionado);
    if (!ambiente) return;

    // Criar retângulo baseado na metragem
    const largura = Math.sqrt(ambiente.metragem) * ESCALA_BASE;
    const altura = largura;

    const novoElemento: ElementoLayout = {
      id: Date.now().toString(),
      ambienteId: ambiente.id,
      vertices: [
        { x: 100, y: 100 },
        { x: 100 + largura, y: 100 },
        { x: 100 + largura, y: 100 + altura },
        { x: 100, y: 100 + altura }
      ],
      cor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      rotacao: 0
    };

    setElementos([...elementos, novoElemento]);
    setAmbienteSelecionado("");
  };

  // Rotacionar elemento selecionado
  const rotacionarElemento = (graus: number) => {
    if (!elementoSelecionado) return;

    setElementos(elementos.map(el => {
      if (el.id === elementoSelecionado) {
        // Calcular centro do polígono
        const centroX = el.vertices.reduce((sum, v) => sum + v.x, 0) / el.vertices.length;
        const centroY = el.vertices.reduce((sum, v) => sum + v.y, 0) / el.vertices.length;

        // Rotacionar cada vértice ao redor do centro
        const rad = (graus * Math.PI) / 180;
        const novosVertices = el.vertices.map(v => {
          const dx = v.x - centroX;
          const dy = v.y - centroY;
          return {
            x: centroX + dx * Math.cos(rad) - dy * Math.sin(rad),
            y: centroY + dx * Math.sin(rad) + dy * Math.cos(rad)
          };
        });

        return { ...el, vertices: novosVertices, rotacao: (el.rotacao + graus) % 360 };
      }
      return el;
    }));
  };

  // Remover elemento
  const removerElemento = () => {
    if (!elementoSelecionado) return;
    setElementos(elementos.filter(el => el.id !== elementoSelecionado));
    setElementoSelecionado(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#1a1a2e' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', background: '#16213e', padding: '20px', color: 'white', overflowY: 'auto' }}>
        <h2>Layout e Planta Baixa</h2>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Adicionar Ambiente</h3>
          <select 
            value={ambienteSelecionado}
            onChange={(e) => setAmbienteSelecionado(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          >
            <option value="">Selecione...</option>
            {ambientes.map(amb => (
              <option key={amb.id} value={amb.id}>
                {amb.nome} ({amb.metragem}m²)
              </option>
            ))}
          </select>
          <button 
            onClick={adicionarAmbiente}
            style={{ width: '100%', padding: '10px', marginTop: '10px', cursor: 'pointer' }}
          >
            Adicionar ao Layout
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Modo de Edição</h3>
          <button 
            onClick={() => setModoEdicao('selecionar')}
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '10px',
              background: modoEdicao === 'selecionar' ? '#3b82f6' : '#444'
            }}
          >
            Selecionar
          </button>
          <button 
            onClick={() => setModoEdicao('editar_vertices')}
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '10px',
              background: modoEdicao === 'editar_vertices' ? '#3b82f6' : '#444'
            }}
          >
            Editar Vértices
          </button>
        </div>

        {elementoSelecionado && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#0f3460', borderRadius: '8px' }}>
            <h3>Controles</h3>
            <button onClick={() => rotacionarElemento(90)} style={{ width: '100%', padding: '8px', marginTop: '10px' }}>
              Rotacionar 90°
            </button>
            <button onClick={() => rotacionarElemento(180)} style={{ width: '100%', padding: '8px', marginTop: '10px' }}>
              Rotacionar 180°
            </button>
            <button onClick={removerElemento} style={{ width: '100%', padding: '8px', marginTop: '10px', background: '#dc2626' }}>
              Remover
            </button>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <h3>Ambientes no Layout ({elementos.length})</h3>
          {elementos.map(el => {
            const amb = ambientes.find(a => a.id === el.ambienteId);
            return (
              <div 
                key={el.id}
                onClick={() => setElementoSelecionado(el.id)}
                style={{
                  padding: '10px',
                  marginTop: '10px',
                  background: el.id === elementoSelecionado ? '#3b82f6' : '#0f3460',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {amb?.nome} - {amb?.metragem}m²
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
          <p>💡 Dicas:</p>
          <p>• Scroll do mouse: Zoom</p>
          <p>• Botão direito + arrastar: Pan</p>
          <p>• Ctrl + click: Pan alternativo</p>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
          style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        />
        
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '8px', color: 'white' }}>
          <div>Zoom: {(zoom * 100).toFixed(0)}%</div>
          <button onClick={() => setZoom(1)} style={{ marginTop: '5px', padding: '5px 10px' }}>
            Reset Zoom
          </button>
        </div>
      </div>
    </div>
  );
}
