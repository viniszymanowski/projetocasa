import { ReactNode } from "react";

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageTemplate({ title, subtitle, children }: PageTemplateProps) {
  return (
    <div style={{ 
      padding: '40px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        background: 'rgba(255,255,255,0.95)', 
        borderRadius: '16px', 
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a2e' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
