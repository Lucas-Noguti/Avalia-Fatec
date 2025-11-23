import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  // Mock data - substituir por dados reais da API
  const assessments = [
    {
      id: 1,
      title: 'Cálculo I - Prova Final',
      turma: 'Engenharia Civil - 2025.1',
      createdAt: '24/10/2025',
      isDraft: false
    },
    {
      id: 2,
      title: 'Estrutura de Dados - T1',
      turma: 'Ciência da Computação - 2025.1',
      createdAt: '20/10/2025',
      isDraft: false
    },
    {
      id: 3,
      title: 'Redação - Tema Livre',
      turma: 'Letras - 2025.1',
      createdAt: '18/10/2025',
      isDraft: true
    }
  ];

  return (
    <>
      <section className="home-header">
        <h2>Suas Avaliações</h2>
        <Link to="/criar-avaliacao" className="btn btn-primary">
          <i className="fas fa-plus"></i> Criar Nova Avaliação
        </Link>
      </section>

      <section className="assessment-grid">
        {assessments.map((assessment) => (
          <article 
            key={assessment.id} 
            className={`assessment-card ${assessment.isDraft ? 'card-draft' : ''}`}
          >
            <h3>
              {assessment.isDraft && <i className="fas fa-pencil-alt"></i>} 
              {assessment.title}
              {assessment.isDraft && ' (Rascunho)'}
            </h3>
            <p className="card-details">Turma: {assessment.turma}</p>
            <p className="card-details">Criada em: {assessment.createdAt}</p>
            <div className="card-actions">
              {assessment.isDraft ? (
                <>
                  <Link to="/editar-avaliacao" className="btn btn-secondary">Continuar Editando</Link>
                  <button className="btn-icon" title="Excluir">
                    <i className="fas fa-trash"></i>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/editar-avaliacao" className="btn btn-secondary">Editar</Link>
                  <Link to="/ver-resultados" className="btn-link">Ver Resultados</Link>
                  <button className="btn-icon" title="Excluir">
                    <i className="fas fa-trash"></i>
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default Home;
