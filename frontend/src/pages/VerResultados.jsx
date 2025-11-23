import { Link } from 'react-router-dom';
import '../styles/resultados.css';

function VerResultados() {
  const resultados = {
    avaliacao: 'Cálculo I - Prova Final',
    estatisticas: {
      mediaTurma: 7.2,
      totalAlunos: 35,
      alunosConcluiram: 32,
      maiorNota: 10.0,
      menorNota: 3.5
    },
    alunos: [
      { id: 1, nome: 'Ana Beatriz Silva', status: 'concluido', nota: 9.5 },
      { id: 2, nome: 'Bruno Costa', status: 'concluido', nota: 7.0 },
      { id: 3, nome: 'Carla Dias', status: 'pendente', nota: null },
      { id: 4, nome: 'Daniel Moreira', status: 'concluido', nota: 3.5 }
    ],
    questoes: [
      { id: 1, enunciado: 'Qual é a derivada de x²?', mediaAcerto: 91 },
      { id: 2, enunciado: 'Calcule a integral de 1/x.', mediaAcerto: 55 },
      { id: 3, enunciado: 'O que é o Teorema Fundamental do Cálculo?', mediaAcerto: 62 }
    ]
  };

  return (
    <>
      <section className="home-header">
        <h2>Resultados: {resultados.avaliacao}</h2>
        <Link to="/home" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Voltar
        </Link>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <h3>Média da Turma</h3>
          <p className="stat-value">
            {resultados.estatisticas.mediaTurma} 
            <span className="stat-unit"> / 10.0</span>
          </p>
          <i className="fas fa-chart-line stat-icon"></i>
        </article>
        <article className="stat-card">
          <h3>Concluíram</h3>
          <p className="stat-value">
            {resultados.estatisticas.alunosConcluiram} 
            <span className="stat-unit"> / {resultados.estatisticas.totalAlunos}</span>
          </p>
          <i className="fas fa-user-check stat-icon"></i>
        </article>
        <article className="stat-card">
          <h3>Maior Nota</h3>
          <p className="stat-value">{resultados.estatisticas.maiorNota}</p>
          <i className="fas fa-arrow-up stat-icon"></i>
        </article>
        <article className="stat-card">
          <h3>Menor Nota</h3>
          <p className="stat-value">{resultados.estatisticas.menorNota}</p>
          <i className="fas fa-arrow-down stat-icon"></i>
        </article>
      </section>

      <section className="question-form-container">
        <h3>Resultados Individuais</h3>
        
        <div className="question-list-container">
          <table className="question-table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Status</th>
                <th>Nota</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {resultados.alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>
                    <span className={`status-badge status-${aluno.status}`}>
                      {aluno.status === 'concluido' ? 'Concluído' : 'Pendente'}
                    </span>
                  </td>
                  <td>{aluno.nota !== null ? aluno.nota : '-'}</td>
                  <td className="table-actions">
                    <Link 
                      to="#" 
                      className={`btn-link ${aluno.status === 'pendente' ? 'btn-link-disabled' : ''}`}
                    >
                      Ver Prova
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="question-form-container">
        <h3>Desempenho por Questão</h3>

        <ul className="performance-list">
          {resultados.questoes.map((questao) => (
            <li key={questao.id} className="performance-item">
              <div className="item-info">
                <p className="enunciado">Questão {questao.id}: {questao.enunciado}</p>
                <span className="details">Média de acerto: {questao.mediaAcerto}%</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className={`progress-bar ${questao.mediaAcerto < 60 ? 'low-performance' : ''}`}
                  style={{ width: `${questao.mediaAcerto}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default VerResultados;
