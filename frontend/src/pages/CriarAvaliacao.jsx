import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import '../styles/tables.css';

function CriarAvaliacao() {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState([
    { id: 1, enunciado: 'Qual é a derivada de x²?', pontos: 1.5 },
    { id: 2, enunciado: 'Explique o conceito de "Pilha" (Stack)...', pontos: 2.0 }
  ]);

  // Mock data para busca de questões
  const availableQuestions = [
    { id: 1, enunciado: 'Qual é a derivada de x²?', materia: 'Cálculo I', tipo: 'Múltipla Escolha' },
    { id: 2, enunciado: 'Explique o conceito de "Pilha" (Stack)...', materia: 'Estrutura de Dados', tipo: 'Dissertativa' },
    { id: 3, enunciado: 'Calcule a integral de 1/x.', materia: 'Cálculo I', tipo: 'Dissertativa' }
  ];

  const handleAddQuestion = (question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, { ...question, pontos: 1.0 }]);
    }
  };

  const handleRemoveQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const handlePointsChange = (id, value) => {
    setSelectedQuestions(selectedQuestions.map(q =>
      q.id === id ? { ...q, pontos: parseFloat(value) || 0 } : q
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar a avaliação
    navigate('/home');
  };

  return (
    <>
      <section className="home-header">
        <h2>Criar Nova Avaliação</h2>
        <Link to="/home" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Voltar
        </Link>
      </section>

      <section className="question-form-container">
        <form className="question-form">
          <h3>1. Detalhes da Avaliação</h3>

          <div className="form-group">
            <label htmlFor="titulo-avaliacao">Título da Avaliação</label>
            <input
              type="text"
              id="titulo-avaliacao"
              name="titulo"
              placeholder="Ex: Prova Final - Cálculo I"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="turma">Turma</label>
              <select id="turma" name="turma" required>
                <option value="">Selecione a turma</option>
                <option value="eng-2025-1">Engenharia Civil - 2025.1</option>
                <option value="cc-2025-1">Ciência da Computação - 2025.1</option>
                <option value="letras-2025-1">Letras - 2025.1</option>
              </select>
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="valor-prova">Valor Total (Pontos)</label>
              <input
                type="number"
                id="valor-prova"
                name="valor"
                placeholder="Ex: 10.0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="data-inicio">Data de Abertura</label>
              <input type="datetime-local" id="data-inicio" name="data-inicio" required />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="data-fim">Data de Fechamento</label>
              <input type="datetime-local" id="data-fim" name="data-fim" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="instrucoes">Instruções para o Aluno</label>
            <textarea
              id="instrucoes"
              name="instrucoes"
              rows="4"
              placeholder="Digite as instruções (tempo de prova, consulta, etc.)"
            ></textarea>
          </div>
        </form>
      </section>

      <section className="question-form-container">
        <h3>2. Adicionar Questões do Banco</h3>

        <section className="filter-bar no-margin">
          <form className="filter-form">
            <div className="form-group">
              <label htmlFor="materia-filter-2">Matéria</label>
              <select id="materia-filter-2" name="materia">
                <option value="">Todas</option>
                <option value="calculo">Cálculo I</option>
                <option value="estrutura">Estrutura de Dados</option>
              </select>
            </div>
            <div className="form-group search-group">
              <label htmlFor="search-filter-2">Buscar no enunciado</label>
              <input
                type="search"
                id="search-filter-2"
                name="q"
                placeholder="Digite uma palavra-chave..."
              />
            </div>
            <button type="button" className="btn btn-secondary">
              <i className="fas fa-search"></i> Buscar
            </button>
          </form>
        </section>

        <div className="question-search-results">
          {availableQuestions.map((question) => (
            <article key={question.id} className="question-search-item">
              <div className="item-info">
                <p className="enunciado">{question.enunciado}</p>
                <span className="details">{question.materia} | {question.tipo}</span>
              </div>
              <button
                type="button"
                onClick={() => handleAddQuestion(question)}
                className="btn btn-add"
              >
                <i className="fas fa-plus"></i> Adicionar
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="question-form-container">
        <h3>3. Questões da Avaliação ({selectedQuestions.length})</h3>

        <div className="selected-questions-list">
          {selectedQuestions.map((question) => (
            <article key={question.id} className="selected-question-item">
              <p className="enunciado">{question.enunciado}</p>
              <div className="item-controls">
                <div className="points-group">
                  <label htmlFor={`q${question.id}-points`}>Pontos:</label>
                  <input
                    type="number"
                    id={`q${question.id}-points`}
                    value={question.pontos}
                    onChange={(e) => handlePointsChange(question.id, e.target.value)}
                    step="0.1"
                    min="0"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.id)}
                  className="btn-icon btn-icon-delete"
                  title="Remover"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="form-actions">
        <button type="button" className="btn btn-secondary">
          Salvar como Rascunho
        </button>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Salvar e Publicar Avaliação
        </button>
      </section>
    </>
  );
}

export default CriarAvaliacao;
