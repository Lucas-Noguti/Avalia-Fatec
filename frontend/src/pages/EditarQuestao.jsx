import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';

function EditarQuestao() {
  const navigate = useNavigate();
  const [tipoQuestao, setTipoQuestao] = useState('multipla');
  const [alternativas, setAlternativas] = useState([
    { id: 1, letra: 'A', texto: '2x', correta: true },
    { id: 2, letra: 'B', texto: 'x³/3', correta: false },
    { id: 3, letra: 'C', texto: 'x', correta: false },
    { id: 4, letra: 'D', texto: '2', correta: false }
  ]);

  const handleTipoChange = (e) => {
    setTipoQuestao(e.target.value);
  };

  const handleAddAlternativa = () => {
    const nextLetra = String.fromCharCode(65 + alternativas.length);
    setAlternativas([
      ...alternativas,
      { id: alternativas.length + 1, letra: nextLetra, texto: '', correta: false }
    ]);
  };

  const handleRemoveAlternativa = (id) => {
    if (alternativas.length > 2) {
      setAlternativas(alternativas.filter(alt => alt.id !== id));
    }
  };

  const handleAlternativaChange = (id, field, value) => {
    setAlternativas(alternativas.map(alt =>
      alt.id === id ? { ...alt, [field]: value } : alt
    ));
  };

  const handleCorretaChange = (id) => {
    setAlternativas(alternativas.map(alt =>
      alt.id === id ? { ...alt, correta: true } : { ...alt, correta: false }
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para atualizar a questão
    navigate('/banco-questoes');
  };

  return (
    <>
      <section className="home-header">
        <h2>Editar Questão</h2>
        <Link to="/banco-questoes" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Voltar ao Banco
        </Link>
      </section>

      <section className="question-form-container">
        <form className="question-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="materia">Matéria</label>
              <select id="materia" name="materia" defaultValue="calculo" required>
                <option value="">Selecione a matéria</option>
                <option value="calculo">Cálculo I</option>
                <option value="estrutura">Estrutura de Dados</option>
                <option value="redacao">Redação</option>
              </select>
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="dificuldade">Nível de Dificuldade</label>
              <select id="dificuldade" name="dificuldade" defaultValue="facil" required>
                <option value="facil">Fácil</option>
                <option value="media">Média</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="enunciado">Enunciado</label>
            <textarea
              id="enunciado"
              name="enunciado"
              rows="8"
              defaultValue="Qual é a derivada de x²?"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="tipo-questao">Tipo de Questão</label>
            <select
              id="tipo-questao"
              name="tipo-questao"
              value={tipoQuestao}
              onChange={handleTipoChange}
              required
            >
              <option value="multipla">Múltipla Escolha</option>
              <option value="dissertativa">Dissertativa</option>
              <option value="vf">Verdadeiro/Falso</option>
            </select>
          </div>

          {tipoQuestao === 'multipla' && (
            <div className="conditional-block">
              <h4>Alternativas</h4>
              {alternativas.map((alt) => (
                <div key={alt.id} className="alternativa-group">
                  <input
                    type="radio"
                    name="alternativa_correta"
                    id={`correta-${alt.letra.toLowerCase()}`}
                    value={alt.letra}
                    checked={alt.correta}
                    onChange={() => handleCorretaChange(alt.id)}
                  />
                  <label
                    htmlFor={`correta-${alt.letra.toLowerCase()}`}
                    className="radio-label"
                    title="Marcar como correta"
                  >
                    {alt.letra}
                  </label>
                  <input
                    type="text"
                    placeholder={`Texto da Alternativa ${alt.letra}`}
                    value={alt.texto}
                    onChange={(e) => handleAlternativaChange(alt.id, 'texto', e.target.value)}
                  />
                  {alternativas.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAlternativa(alt.id)}
                      className="btn-icon btn-icon-delete"
                      title="Excluir alternativa"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary btn-add-option"
                onClick={handleAddAlternativa}
              >
                <i className="fas fa-plus"></i> Adicionar Alternativa
              </button>
            </div>
          )}

          {tipoQuestao === 'dissertativa' && (
            <div className="conditional-block">
              <h4>Resposta Esperada / Gabarito</h4>
              <div className="form-group">
                <textarea
                  id="resposta-dissertativa"
                  name="resposta-dissertativa"
                  rows="5"
                  placeholder="Descreva o gabarito ou a resposta esperada para esta questão..."
                ></textarea>
              </div>
            </div>
          )}

          {tipoQuestao === 'vf' && (
            <div className="conditional-block">
              <h4>Resposta Correta</h4>
              <div className="vf-group">
                <input type="radio" name="vf_correta" id="vf-v" value="true" />
                <label htmlFor="vf-v">Verdadeiro</label>
              </div>
              <div className="vf-group">
                <input type="radio" name="vf_correta" id="vf-f" value="false" />
                <label htmlFor="vf-f">Falso</label>
              </div>
            </div>
          )}

          <div className="form-actions">
            <Link to="/banco-questoes" className="btn btn-secondary">
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary">
              Atualizar Questão
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditarQuestao;
