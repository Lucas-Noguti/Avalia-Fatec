import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

function GerenciarProfessores() {
  const [professores, setProfessores] = useState([
    { 
      id: 1, 
      nome: 'Professor Coordenador', 
      email: 'coordenador@flavalia.com', 
      papel: 'coordenador',
      disciplinas: []
    },
    { 
      id: 2, 
      nome: 'Professor Padrão', 
      email: 'professor@flavalia.com', 
      papel: 'professor',
      disciplinas: [2]
    }
  ]);

  const disciplinasDisponiveis = [
    { id: 1, nome: 'Cálculo I' },
    { id: 2, nome: 'Estrutura de Dados' },
    { id: 3, nome: 'Redação' }
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [formData, setFormData] = useState({ 
    nome: '', 
    email: '', 
    papel: 'professor',
    disciplinas: []
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newProfessor = {
      id: professores.length + 1,
      ...formData
    };
    setProfessores([...professores, newProfessor]);
    setFormData({ nome: '', email: '', papel: 'professor', disciplinas: [] });
    setShowAddModal(false);
  };

  const handleManage = (e) => {
    e.preventDefault();
    setProfessores(professores.map(p => 
      p.id === selectedProfessor.id ? { ...p, papel: formData.papel, disciplinas: formData.disciplinas } : p
    ));
    setShowManageModal(false);
    setSelectedProfessor(null);
    setFormData({ nome: '', email: '', papel: 'professor', disciplinas: [] });
  };

  const handleDelete = () => {
    setProfessores(professores.filter(p => p.id !== selectedProfessor.id));
    setShowDeleteModal(false);
    setSelectedProfessor(null);
  };

  const openManageModal = (professor) => {
    setSelectedProfessor(professor);
    setFormData({ 
      nome: professor.nome, 
      email: professor.email, 
      papel: professor.papel,
      disciplinas: professor.disciplinas || []
    });
    setShowManageModal(true);
  };

  const openDeleteModal = (professor) => {
    setSelectedProfessor(professor);
    setShowDeleteModal(true);
  };

  const toggleDisciplina = (disciplinaId) => {
    setFormData(prev => ({
      ...prev,
      disciplinas: prev.disciplinas.includes(disciplinaId)
        ? prev.disciplinas.filter(id => id !== disciplinaId)
        : [...prev.disciplinas, disciplinaId]
    }));
  };

  return (
    <>
      <section className="home-header">
        <h2>Painel de Administração</h2>
      </section>

      <nav className="admin-nav">
        <Link to="/gerenciar-disciplinas">Disciplinas</Link>
        <Link to="/gerenciar-turmas">Turmas</Link>
        <Link to="/gerenciar-professores" className="active">Professores</Link>
      </nav>

      <section className="question-form-container">
        <div className="admin-content-header">
          <h3>Professores Cadastrados</h3>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i> Adicionar Professor
          </button>
        </div>

        <div className="question-list-container">
          <table className="question-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Papel</th>
                <th className="column-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.nome}</td>
                  <td>{professor.email}</td>
                  <td>
                    <span className={`role-badge ${professor.papel === 'coordenador' ? 'role-admin' : 'role-prof'}`}>
                      {professor.papel === 'coordenador' ? 'Coordenador' : 'Professor'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button 
                      onClick={() => openManageModal(professor)}
                      className="btn-icon" 
                      title="Gerenciar"
                    >
                      <i className="fas fa-user-cog"></i>
                    </button>
                    <button 
                      onClick={() => openDeleteModal(professor)}
                      className="btn-icon btn-icon-delete" 
                      title="Excluir"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Adicionar */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowAddModal(false)} 
              className="modal-close" 
              title="Fechar"
            >
              &times;
            </button>
            <div className="modal-header">
              <h2>Adicionar Novo Professor</h2>
            </div>
            <form className="modal-body" onSubmit={handleAdd}>
              <div className="form-group">
                <label htmlFor="nome-professor">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome-professor" 
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: João da Silva"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email-professor">Email</label>
                <input 
                  type="email" 
                  id="email-professor" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: joao.silva@flavalia.com"
                  required
                />
              </div>
              <div className="form-group">
                <h4 className="form-subtitle">Papel do Usuário</h4>
                <div className="radio-group">
                  <input 
                    type="radio" 
                    id="role-prof-add" 
                    name="papel_add" 
                    value="professor"
                    checked={formData.papel === 'professor'}
                    onChange={(e) => setFormData({ ...formData, papel: e.target.value })}
                  />
                  <label htmlFor="role-prof-add">Professor</label>
                  <input 
                    type="radio" 
                    id="role-admin-add" 
                    name="papel_add" 
                    value="coordenador"
                    checked={formData.papel === 'coordenador'}
                    onChange={(e) => setFormData({ ...formData, papel: e.target.value })}
                  />
                  <label htmlFor="role-admin-add">Coordenador</label>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Salvar e Convidar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Gerenciar */}
      {showManageModal && selectedProfessor && (
        <div className="modal-overlay" onClick={() => setShowManageModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowManageModal(false)} 
              className="modal-close" 
              title="Fechar"
            >
              &times;
            </button>
            <div className="modal-header">
              <h2>Gerenciar Professor</h2>
            </div>
            <form className="modal-body" onSubmit={handleManage}>
              <p className="modal-user-info">
                {selectedProfessor.nome} ({selectedProfessor.email})
              </p>
              <div className="form-group">
                <h4 className="form-subtitle">Papel do Usuário</h4>
                <div className="radio-group">
                  <input 
                    type="radio" 
                    id="role-prof" 
                    name="papel" 
                    value="professor"
                    checked={formData.papel === 'professor'}
                    onChange={(e) => setFormData({ ...formData, papel: e.target.value })}
                  />
                  <label htmlFor="role-prof">Professor</label>
                  <input 
                    type="radio" 
                    id="role-admin" 
                    name="papel" 
                    value="coordenador"
                    checked={formData.papel === 'coordenador'}
                    onChange={(e) => setFormData({ ...formData, papel: e.target.value })}
                  />
                  <label htmlFor="role-admin">Coordenador</label>
                </div>
              </div>
              <div className="form-group">
                <h4 className="form-subtitle">Disciplinas Associadas</h4>
                <div className="checkbox-list">
                  {disciplinasDisponiveis.map((disciplina) => (
                    <div key={disciplina.id} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        id={`disc-${disciplina.id}`} 
                        checked={formData.disciplinas.includes(disciplina.id)}
                        onChange={() => toggleDisciplina(disciplina.id)}
                      />
                      <label htmlFor={`disc-${disciplina.id}`}>{disciplina.nome}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowManageModal(false)} 
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Excluir */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Confirmar Exclusão</h2>
            <div className="modal-body">
              <p className="confirm-text">
                Você tem certeza que deseja excluir este usuário?
              </p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete} 
                className="btn btn-primary"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GerenciarProfessores;
