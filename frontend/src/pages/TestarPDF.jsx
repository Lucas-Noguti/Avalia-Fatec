import { useState } from 'react';
import '../styles/forms.css';

function TestarPDF() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerateSamplePDF = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8080/api/exams/generate-sample-pdf', {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar PDF. Verifique se o backend está rodando.');
      }

      // Criar blob do PDF
      const blob = await response.blob();
      
      // Criar URL temporária para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'prova_exemplo.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="home-header">
        <h2>Testar Geração de PDF</h2>
      </section>

      <section className="form-container">
        <div className="form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📄
            </div>
            
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
              Gerador de PDF de Provas
            </h3>
            
            <p style={{ 
              color: '#7f8c8d', 
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Clique no botão abaixo para gerar um PDF de exemplo com questões mockadas.
              O PDF será baixado automaticamente com um template profissional.
            </p>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '10px',
              marginBottom: '30px',
              textAlign: 'left'
            }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                ✨ Recursos do PDF:
              </h4>
              <ul style={{ 
                color: '#555', 
                lineHeight: '1.8',
                paddingLeft: '20px',
                fontSize: '14px'
              }}>
                <li>Cabeçalho profissional com logo da instituição</li>
                <li>Informações da prova (professor, data, duração)</li>
                <li>Questões formatadas por tipo (múltipla escolha, dissertativa, etc.)</li>
                <li>Espaço para respostas em questões dissertativas</li>
                <li>Gabarito em página separada (opcional)</li>
                <li>Numeração de páginas automática</li>
              </ul>
            </div>

            <button
              onClick={handleGenerateSamplePDF}
              disabled={loading}
              className="btn btn-primary"
              style={{
                padding: '15px 40px',
                fontSize: '16px',
                fontWeight: '600',
                minWidth: '250px'
              }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Gerando PDF...
                </>
              ) : (
                <>
                  <i className="fas fa-file-pdf"></i> Gerar PDF de Exemplo
                </>
              )}
            </button>

            {success && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '8px',
                color: '#155724'
              }}>
                <i className="fas fa-check-circle"></i> PDF gerado com sucesso! O download deve iniciar automaticamente.
              </div>
            )}

            {error && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '8px',
                color: '#721c24'
              }}>
                <i className="fas fa-exclamation-circle"></i> {error}
                <br />
                <small style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  Certifique-se de que o backend está rodando em http://localhost:8080
                </small>
              </div>
            )}

            <div style={{
              marginTop: '30px',
              padding: '15px',
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#856404'
            }}>
              <strong>💡 Dica:</strong> Para iniciar o backend, execute:
              <code style={{
                display: 'block',
                marginTop: '10px',
                padding: '10px',
                background: '#fff',
                borderRadius: '5px',
                fontFamily: 'monospace',
                color: '#2c3e50'
              }}>
                cd backend && .\mvnw.cmd spring-boot:run
              </code>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TestarPDF;
