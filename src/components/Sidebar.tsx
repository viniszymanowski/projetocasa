import { Link, useLocation } from "wouter";
import { 
  Home, Users, Heart, MapPin, Building2, Grid3x3, 
  FileText, Image, ClipboardList, FolderOpen, Palette,
  FileSignature, DollarSign, Truck
} from "lucide-react";

const menuItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/persona", label: "Persona", icon: Users },
  { path: "/preferencias", label: "Preferências", icon: Heart },
  { path: "/terreno", label: "Terreno", icon: MapPin },
  { path: "/arquitetura", label: "Arquitetura", icon: Building2 },
  { path: "/layout", label: "Layout", icon: Grid3x3 },
  { path: "/normas", label: "Normas", icon: FileText },
  { path: "/galeria", label: "Galeria", icon: Image },
  { path: "/questionario", label: "Questionário", icon: ClipboardList },
  { path: "/meu-projeto", label: "Meu Projeto", icon: FolderOpen },
  { path: "/moodboard", label: "Moodboard", icon: Palette },
  { path: "/contrato", label: "Contrato", icon: FileSignature },
  { path: "/financeiro", label: "Financeiro", icon: DollarSign },
  { path: "/fornecedores", label: "Fornecedores", icon: Truck },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div style={{
      width: '250px',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '1.2rem', 
          color: '#667eea', 
          marginBottom: '5px',
          fontWeight: 'bold'
        }}>
          ProjetoCasa
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>
          Sistema Interativo de Gestão
        </p>
      </div>

      <nav>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 15px',
                marginBottom: '5px',
                borderRadius: '8px',
                background: isActive ? '#667eea' : 'transparent',
                color: isActive ? 'white' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
              >
                <Icon size={18} style={{ marginRight: '12px' }} />
                <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
