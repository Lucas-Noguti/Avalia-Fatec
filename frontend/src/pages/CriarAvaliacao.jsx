import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import '../styles/tables.css';
import '../styles/criar-avaliacao.css';

function CriarAvaliacao() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    turma: '',
    valor: '',
    dataInicio: '',
    dataFim: '',
    instrucoes: ''
  });
  const [filters, setFilters] = useState({ materia: '', search: '' });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log('Filtros aplicados:', filters);
  };

  const filteredQuestions = availableQuestions.filter(q => {
    const matchesMateria = !filters.materia || q.materia.toLowerCase().includes(filters.materia.toLowerCase());
    const matchesSearch = !filters.search || q.enunciado.toLowerCase().includes(filters.search.toLowerCase());
    const notSelected = !selectedQuestions.find(sq => sq.id === q.id);
    return matchesMateria && matchesSearch && notSelected;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.turma || !formData.valor) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (selectedQuestions.length === 0) {
      alert('Por favor, adicione pelo menos uma questão à avaliação.');
      return;
    }
    // Aqui você adicionaria a lógica para salvar a avaliação
    console.log('Avaliação criada:', { ...formData, questoes: selectedQuestions });
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
        <form className="question-form" onSubmit={handleSubmit}>
          <h3>1. Detalhes da Avaliação</h3>

          <div className="form-group">
            <label htmlFor="titulo-avaliacao">Título da Avaliação</label>
            <input
              type="text"
              id="titulo-avaliacao"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Ex: Prova Final - Cálculo I"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="turma">Turma</label>
              <select 
                id="turma" 
                name="turma" 
                value={formData.turma}
                onChange={handleInputChange}
                required
              >
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
                value={formData.valor}
                onChange={handleInputChange}
                placeholder="Ex: 10.0"
                step="0.1"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="data-inicio">Data de Abertura</label>
              <input 
                type="datetime-local" 
                id="data-inicio" 
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="data-fim">Data de Fechamento</label>
              <input 
                type="datetime-local" 
                id="data-fim" 
                name="dataFim"
                value={formData.dataFim}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="instrucoes">Instruções para o Aluno</label>
            <textarea
              id="instrucoes"
              name="instrucoes"
              value={formData.instrucoes}
              onChange={handleInputChange}
              rows="4"
              placeholder="Digite as instruções (tempo de prova, consulta, etc.)"
            ></textarea>
          </div>
        </form>
      </section>

      <section className="question-form-container">
        <h3>2. Adicionar Questões do Banco</h3>

        <section className="filter-bar no-margin">
          <form className="filter-form" onSubmit={handleFilterSubmit}>
            <div className="form-group">
              <label htmlFor="materia-filter-2">Matéria</label>
              <select 
                id="materia-filter-2" 
                name="materia"
                value={filters.materia}
                onChange={handleFilterChange}
              >
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
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Digite uma palavra-chave..."
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              <i className="fas fa-search"></i> Buscar
            </button>
          </form>
        </section>

        <div className="question-search-results">
          {filteredQuestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-gray-light)' }}>
              Nenhuma questão disponível com os filtros aplicados.
            </div>
          ) : (
            filteredQuestions.map((question) => (
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
          ))
          )}
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
        <button type="button" className="btn btn-secondary" onClick={() => console.log('Rascunho salvo')}>
          Salvar como Rascunho
        </button>
        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          Salvar e Publicar Avaliação
        </button>
      </section>
    </>
  );
}

export default CriarAvaliacao;
