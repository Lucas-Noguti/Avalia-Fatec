import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/tables.css';
import '../styles/forms.css';
import '../styles/modal.css';

function BancoQuestoes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ subject: '', search: '', difficulty: '' });

  // Fetch questions from backend
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await api.getQuestions();
      setQuestions(data);
      setError(null);
      setFilters({ subject: '', search: '', difficulty: '' });
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar questões:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await api.filterQuestions({
        subject: filters.subject,
        difficulty: filters.difficulty,
        keyword: filters.search
      });
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao filtrar questões:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta questão?')) return;
    
    try {
      await api.deleteQuestion(id);
      await fetchQuestions();
    } catch (err) {
      alert('Erro ao excluir questão: ' + err.message);
    }
  };

  const getQuestionTypeLabel = (type) => {
    return 'Múltipla Escolha';
  };

  const getDifficultyLabel = (difficulty) => {
    const levels = {
      'EASY': 'Fácil',
      'MEDIUM': 'Média',
      'HARD': 'Difícil'
    };
    return levels[difficulty] || difficulty;
  };

  return (
    <>
      <section className="home-header">
        <h2>Banco de Questões</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/testar-pdf" className="btn btn-secondary">
            <i className="fas fa-file-pdf"></i> Testar Geração de PDF
          </Link>
          <Link to="/criar-questao" className="btn btn-primary">
            <i className="fas fa-plus"></i> Cadastrar Nova Questão
          </Link>
        </div>
      </section>

      <section className="filter-bar">
        <form className="filter-form" onSubmit={handleFilterSubmit}>
          <div className="form-group">
            <label htmlFor="subject-filter">Matéria</label>
            <input
              type="text"
              id="subject-filter"
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              placeholder="Ex: Cálculo I"
            />
          </div>
          <div className="form-group">
            <label htmlFor="difficulty-filter">Dificuldade</label>
            <select
              id="difficulty-filter"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="EASY">Fácil</option>
              <option value="MEDIUM">Média</option>
              <option value="HARD">Difícil</option>
            </select>
          </div>
          <div className="form-group search-group">
            <label htmlFor="search-filter">Buscar</label>
            <input
              type="search"
              id="search-filter"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Palavra-chave..."
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            <i className="fas fa-search"></i> Buscar
          </button>
          <button type="button" onClick={fetchQuestions} className="btn btn-secondary">
            <i className="fas fa-sync"></i> Limpar
          </button>
        </form>
      </section>

      <section className="question-list-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-gray-light)' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <p>Carregando questões...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-red)' }}>
            <i className="fas fa-exclamation-circle" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <p>{error}</p>
            <button onClick={fetchQuestions} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              Tentar Novamente
            </button>
          </div>
        ) : (
          <table className="question-table">
            <thead>
              <tr>
                <th>Enunciado</th>
                <th>Matéria</th>
                <th>Dificuldade</th>
                <th>Pontos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-gray-light)' }}>
                    Nenhuma questão cadastrada. Clique em "Cadastrar Nova Questão" para começar.
                  </td>
                </tr>
              ) : (
                questions.map((question) => (
                  <tr key={question.id}>
                    <td className="enunciado-preview">{question.statement}</td>
                    <td>{question.subject}</td>
                    <td>{getDifficultyLabel(question.difficulty)}</td>
                    <td>{question.points}</td>
                    <td className="table-actions">
                      <button
                        onClick={() => handleViewQuestion(question)}
                        className="btn-icon"
                        title="Visualizar"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <Link to={`/editar-questao/${question.id}`} className="btn-icon" title="Editar">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button 
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="btn-icon btn-icon-delete" 
                        title="Excluir"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} type="button">
              &times;
            </button>

            <div className="modal-header">
              <h2>Visualizar Questão</h2>
            </div>

            {selectedQuestion && (
              <div className="modal-body">
                <div className="info-group">
                  <span className="info-label">Matéria</span>
                  <p>{selectedQuestion.subject}</p>
                </div>
                {selectedQuestion.topic && (
                  <div className="info-group">
                    <span className="info-label">Tópico</span>
                    <p>{selectedQuestion.topic}</p>
                  </div>
                )}
                <div className="info-group">
                  <span className="info-label">Dificuldade</span>
                  <p>{getDifficultyLabel(selectedQuestion.difficulty)}</p>
                </div>
                <div className="info-group">
                  <span className="info-label">Pontuação</span>
                  <p>{selectedQuestion.points} pontos</p>
                </div>

                <hr className="modal-divider" />

                <div className="info-group">
                  <span className="info-label">Enunciado</span>
                  <p className="enunciado-completo">{selectedQuestion.statement}</p>
                </div>

                {selectedQuestion.options && selectedQuestion.options.length > 0 && (
                  <div className="info-group">
                    <span className="info-label">Alternativas</span>
                    <ul className="modal-alternativas">
                      {selectedQuestion.options.map((option, index) => (
                        <li key={index} className="alternativa-item">
                          <span className="letra">{String.fromCharCode(65 + index)}</span> {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuestion.correctAnswer && (
                  <div className="info-group">
                    <span className="info-label">Resposta Correta</span>
                    <p style={{ color: 'var(--color-red)', fontWeight: '500' }}>{selectedQuestion.correctAnswer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BancoQuestoes;
