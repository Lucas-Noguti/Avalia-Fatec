import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/criar-avaliacao.css';

function EditarAvaliacao() {
  const [formData, setFormData] = useState({
    titulo: 'Redação - Tema Livre (Rascunho)',
    turma: 'letras-2025-1',
    valor: 10.0,
    dataInicio: '',
    dataFim: '',
    instrucoes: 'Aguardando definição das instruções...'
  });

  const [filtros, setFiltros] = useState({
    materia: 'redacao',
    busca: ''
  });

  const [questoesSelecionadas, setQuestoesSelecionadas] = useState([
    { 
      id: 1, 
      enunciado: 'Dissertação sobre o tema: O impacto da inteligência artificial no mercado de trabalho.', 
      pontos: 10.0 
    }
  ]);

  const questoesDisponiveis = [
    { 
      id: 2, 
      enunciado: 'Dissertação sobre o tema: A tecnologia e as relações sociais.', 
      materia: 'Redação',
      tipo: 'Múltipla Escolha'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const adicionarQuestao = (questao) => {
    if (!questoesSelecionadas.find(q => q.id === questao.id)) {
      setQuestoesSelecionadas([
        ...questoesSelecionadas, 
        { ...questao, pontos: 1.0 }
      ]);
    }
  };

  const removerQuestao = (questaoId) => {
    setQuestoesSelecionadas(questoesSelecionadas.filter(q => q.id !== questaoId));
  };

  const atualizarPontos = (questaoId, pontos) => {
    setQuestoesSelecionadas(questoesSelecionadas.map(q => 
      q.id === questaoId ? { ...q, pontos: parseFloat(pontos) } : q
    ));
  };

  const handleSalvarRascunho = (e) => {
    e.preventDefault();
    console.log('Salvar rascunho:', { formData, questoesSelecionadas });
    alert('Rascunho salvo com sucesso!');
  };

  const handlePublicar = (e) => {
    e.preventDefault();
    console.log('Publicar avaliação:', { formData, questoesSelecionadas });
    alert('Avaliação publicada com sucesso!');
  };

  return (
    <>
      <section className="home-header">
        <h2>Editar Avaliação (Rascunho)</h2>
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
              value={formData.titulo}
              onChange={handleInputChange}
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
                step="0.1"
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
            />
          </div>
        </form>
      </section>

      <section className="question-form-container">
        <h3>2. Adicionar Questões do Banco</h3>
        <section className="filter-bar no-margin">
          <form className="filter-form">
            <div className="form-group">
              <label htmlFor="materia-filter-2">Matéria</label>
              <select 
                id="materia-filter-2" 
                name="materia"
                value={filtros.materia}
                onChange={handleFiltroChange}
              >
                <option value="">Todas</option>
                <option value="calculo">Cálculo I</option>
                <option value="estrutura">Estrutura de Dados</option>
                <option value="redacao">Redação</option>
              </select>
            </div>
            <div className="form-group search-group">
              <label htmlFor="search-filter-2">Buscar no enunciado</label>
              <input 
                type="search" 
                id="search-filter-2" 
                name="busca"
                value={filtros.busca}
                onChange={handleFiltroChange}
                placeholder="Digite uma palavra-chave..."
              />
            </div>
            <button type="button" className="btn btn-secondary">
              <i className="fas fa-search"></i> Buscar
            </button>
          </form>
        </section>

        <div className="question-search-results">
          {questoesDisponiveis.map((questao) => (
            <article key={questao.id} className="question-search-item">
              <div className="item-info">
                <p className="enunciado">{questao.enunciado}</p>
                <span className="details">{questao.materia} | {questao.tipo}</span>
              </div>
              <button 
                onClick={() => adicionarQuestao(questao)}
                className="btn btn-add"
              >
                <i className="fas fa-plus"></i> Adicionar
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="question-form-container">
        <h3>3. Questões da Avaliação ({questoesSelecionadas.length})</h3>
        
        <div className="selected-questions-list">
          {questoesSelecionadas.map((questao, index) => (
            <article key={questao.id} className="selected-question-item">
              <p className="enunciado">{questao.enunciado}</p>
              <div className="item-controls">
                <div className="points-group">
                  <label htmlFor={`q${index}-points`}>Pontos:</label>
                  <input 
                    type="number" 
                    id={`q${index}-points`}
                    value={questao.pontos}
                    onChange={(e) => atualizarPontos(questao.id, e.target.value)}
                    step="0.1"
                    min="0"
                  />
                </div>
                <button 
                  onClick={() => removerQuestao(questao.id)}
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
        <button 
          onClick={handleSalvarRascunho}
          className="btn btn-secondary"
        >
          Salvar Alterações (Rascunho)
        </button>
        <button 
          onClick={handlePublicar}
          className="btn btn-primary"
        >
          Salvar e Publicar Avaliação
        </button>
      </section>
    </>
  );
}

export default EditarAvaliacao;
