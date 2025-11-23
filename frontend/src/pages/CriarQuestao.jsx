import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { testBackendConnection } from '../utils/testConnection';
import '../styles/forms.css';

function CriarQuestao() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);
  const [formData, setFormData] = useState({
    statement: '',
    subject: '',
    topic: '',
    difficulty: 'EASY',
    points: 1.0
  });
  const [alternativas, setAlternativas] = useState([
    { id: 1, letra: 'A', texto: '', correta: false },
    { id: 2, letra: 'B', texto: '', correta: false },
    { id: 3, letra: 'C', texto: '', correta: false },
    { id: 4, letra: 'D', texto: '', correta: false }
  ]);

  useEffect(() => {
    // Testa conexão com backend ao montar componente
    testBackendConnection().then(isOnline => {
      setBackendOnline(isOnline);
      if (!isOnline) {
        alert('⚠️ Backend não está respondendo. Verifique se o servidor está rodando em http://localhost:8080');
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!formData.statement.trim()) {
      alert('Por favor, preencha o enunciado da questão.');
      return;
    }
    
    if (!formData.subject.trim()) {
      alert('Por favor, preencha a matéria.');
      return;
    }
    
    const alternativasPreenchidas = alternativas.filter(alt => alt.texto.trim());
    if (alternativasPreenchidas.length < 2) {
      alert('Por favor, preencha pelo menos 2 alternativas.');
      return;
    }
    
    const alternativaCorreta = alternativas.find(alt => alt.correta);
    if (!alternativaCorreta) {
      alert('Por favor, marque uma alternativa como correta.');
      return;
    }
    
    if (!alternativaCorreta.texto.trim()) {
      alert('A alternativa marcada como correta precisa ter texto.');
      return;
    }
    
    try {
      setLoading(true);
      
      const questionData = {
        statement: formData.statement,
        type: 'MULTIPLE_CHOICE',
        subject: formData.subject,
        topic: formData.topic || null,
        difficulty: formData.difficulty,
        points: parseFloat(formData.points),
        options: alternativasPreenchidas.map(alt => alt.texto),
        correctAnswer: `${alternativaCorreta.letra}) ${alternativaCorreta.texto}`
      };
      
      await api.createQuestion(questionData);
      alert('Questão cadastrada com sucesso!');
      navigate('/banco-questoes');
    } catch (err) {
      alert('Erro ao cadastrar questão: ' + err.message);
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="home-header">
        <h2>Cadastrar Nova Questão</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!backendOnline && (
            <span style={{ color: '#ff4444', fontSize: '0.9rem' }}>
              <i className="fas fa-exclamation-triangle"></i> Backend offline
            </span>
          )}
          <Link to="/banco-questoes" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Voltar ao Banco
          </Link>
        </div>
      </section>

      <section className="question-form-container">
        <form className="question-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="subject">Matéria *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Ex: Cálculo I, Estrutura de Dados..."
                required
              />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="topic">Tópico (Opcional)</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="Ex: Derivadas, Pilhas..."
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="difficulty">Nível de Dificuldade *</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value="EASY">Fácil</option>
                <option value="MEDIUM">Média</option>
                <option value="HARD">Difícil</option>
              </select>
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="points">Pontuação *</label>
              <input
                type="number"
                id="points"
                name="points"
                value={formData.points}
                onChange={handleInputChange}
                min="0.5"
                max="10"
                step="0.5"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="statement">Enunciado *</label>
            <textarea
              id="statement"
              name="statement"
              rows="6"
              value={formData.statement}
              onChange={handleInputChange}
              placeholder="Digite o enunciado da questão..."
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tipo de Questão</label>
            <input type="text" value="Múltipla Escolha" disabled />
          </div>

          {
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
          }

          <div className="form-actions">
            <Link to="/banco-questoes" className="btn btn-secondary">
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Salvando...
                </>
              ) : (
                'Salvar Questão'
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CriarQuestao;
