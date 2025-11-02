import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tables.css';
import '../styles/forms.css';
import '../styles/modal.css';

function BancoQuestoes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Mock data
  const questions = [
    {
      id: 1,
      enunciado: 'Qual é a derivada de x²?',
      materia: 'Cálculo I',
      tipo: 'Múltipla Escolha',
      nivel: 'Fácil',
      alternativas: [
        { letra: 'A', texto: '2x', correta: true },
        { letra: 'B', texto: 'x³/3', correta: false },
        { letra: 'C', texto: 'x', correta: false },
        { letra: 'D', texto: '2', correta: false }
      ]
    },
    {
      id: 2,
      enunciado: 'Explique o conceito de "Pilha" (Stack) em Estrutura de Dados, citando suas principais operações (push, pop).',
      materia: 'Estrutura de Dados',
      tipo: 'Dissertativa',
      nivel: 'Média'
    },
    {
      id: 3,
      enunciado: '"Java é uma linguagem de programação puramente interpretada." (Verdadeiro ou Falso?)',
      materia: 'Estrutura de Dados',
      tipo: 'Verdadeiro/Falso',
      nivel: 'Fácil'
    }
  ];

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <>
      <section className="home-header">
        <h2>Banco de Questões</h2>
        <Link to="/criar-questao" className="btn btn-primary">
          <i className="fas fa-plus"></i> Cadastrar Nova Questão
        </Link>
      </section>

      <section className="filter-bar">
        <form className="filter-form">
          <div className="form-group">
            <label htmlFor="materia-filter">Matéria</label>
            <select id="materia-filter" name="materia">
              <option value="">Todas as Matérias</option>
              <option value="calculo">Cálculo I</option>
              <option value="estrutura">Estrutura de Dados</option>
              <option value="redacao">Redação</option>
            </select>
          </div>
          <div className="form-group search-group">
            <label htmlFor="search-filter">Buscar no enunciado</label>
            <input
              type="search"
              id="search-filter"
              name="q"
              placeholder="Digite uma palavra-chave..."
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            <i className="fas fa-filter"></i> Filtrar
          </button>
        </form>
      </section>

      <section className="question-list-container">
        <table className="question-table">
          <thead>
            <tr>
              <th>Enunciado</th>
              <th>Matéria</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="enunciado-preview">{question.enunciado}</td>
                <td>{question.materia}</td>
                <td>{question.tipo}</td>
                <td className="table-actions">
                  <button
                    onClick={() => handleViewQuestion(question)}
                    className="btn-icon"
                    title="Visualizar"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <Link to="/editar-questao" className="btn-icon" title="Editar">
                    <i className="fas fa-pencil-alt"></i>
                  </Link>
                  <button className="btn-icon btn-icon-delete" title="Excluir">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>

          <div className="modal-header">
            <h2>Visualizar Questão</h2>
          </div>

          {selectedQuestion && (
            <div className="modal-body">
              <div className="info-group">
                <span className="info-label">Matéria</span>
                <p>{selectedQuestion.materia}</p>
              </div>
              <div className="info-group">
                <span className="info-label">Nível</span>
                <p>{selectedQuestion.nivel}</p>
              </div>
              <div className="info-group">
                <span className="info-label">Tipo</span>
                <p>{selectedQuestion.tipo}</p>
              </div>

              <hr className="modal-divider" />

              <div className="info-group">
                <span className="info-label">Enunciado</span>
                <p className="enunciado-completo">{selectedQuestion.enunciado}</p>
              </div>

              {selectedQuestion.alternativas && (
                <div className="info-group">
                  <span className="info-label">Alternativas</span>
                  <ul className="modal-alternativas">
                    {selectedQuestion.alternativas.map((alt) => (
                      <li
                        key={alt.letra}
                        className={`alternativa-item ${alt.correta ? 'correta' : ''}`}
                      >
                        <span className="letra">{alt.letra}</span> {alt.texto}
                        {alt.correta && (
                          <span className="tag-correta">
                            <i className="fas fa-check"></i> Correta
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BancoQuestoes;
