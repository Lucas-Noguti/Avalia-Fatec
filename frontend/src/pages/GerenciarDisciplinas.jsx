import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

function GerenciarDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([
    { id: 1, nome: 'Cálculo I' },
    { id: 2, nome: 'Estrutura de Dados' },
    { id: 3, nome: 'Redação' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [formData, setFormData] = useState({ nome: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newDisciplina = {
      id: disciplinas.length + 1,
      nome: formData.nome
    };
    setDisciplinas([...disciplinas, newDisciplina]);
    setFormData({ nome: '' });
    setShowAddModal(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setDisciplinas(disciplinas.map(d => 
      d.id === selectedDisciplina.id ? { ...d, nome: formData.nome } : d
    ));
    setShowEditModal(false);
    setSelectedDisciplina(null);
    setFormData({ nome: '' });
  };

  const handleDelete = () => {
    setDisciplinas(disciplinas.filter(d => d.id !== selectedDisciplina.id));
    setShowDeleteModal(false);
    setSelectedDisciplina(null);
  };

  const openEditModal = (disciplina) => {
    setSelectedDisciplina(disciplina);
    setFormData({ nome: disciplina.nome });
    setShowEditModal(true);
  };

  const openDeleteModal = (disciplina) => {
    setSelectedDisciplina(disciplina);
    setShowDeleteModal(true);
  };

  return (
    <>
      <section className="home-header">
        <h2>Painel de Administração</h2>
      </section>

      <nav className="admin-nav">
        <Link to="/gerenciar-disciplinas" className="active">Disciplinas</Link>
        <Link to="/gerenciar-turmas">Turmas</Link>
        <Link to="/gerenciar-professores">Professores</Link>
      </nav>

      <section className="question-form-container">
        <div className="admin-content-header">
          <h3>Disciplinas Cadastradas</h3>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i> Nova Disciplina
          </button>
        </div>

        <div className="question-list-container">
          <table className="question-table">
            <thead>
              <tr>
                <th>Nome da Disciplina</th>
                <th className="column-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map((disciplina) => (
                <tr key={disciplina.id}>
                  <td>{disciplina.nome}</td>
                  <td className="table-actions">
                    <button 
                      onClick={() => openEditModal(disciplina)}
                      className="btn-icon" 
                      title="Editar"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button 
                      onClick={() => openDeleteModal(disciplina)}
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
              <h2>Adicionar Nova Disciplina</h2>
            </div>
            <form className="modal-body" onSubmit={handleAdd}>
              <div className="form-group">
                <label htmlFor="nome-disciplina-add">Nome da Disciplina</label>
                <input 
                  type="text" 
                  id="nome-disciplina-add" 
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                  placeholder="Ex: Banco de Dados"
                  required
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowEditModal(false)} 
              className="modal-close" 
              title="Fechar"
            >
              &times;
            </button>
            <div className="modal-header">
              <h2>Editar Disciplina</h2>
            </div>
            <form className="modal-body" onSubmit={handleEdit}>
              <div className="form-group">
                <label htmlFor="nome-disciplina-edit">Nome da Disciplina</label>
                <input 
                  type="text" 
                  id="nome-disciplina-edit" 
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                  required
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)} 
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
                Você tem certeza que deseja excluir esta disciplina? 
                Todas as questões associadas a ela podem ser afetadas.
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

export default GerenciarDisciplinas;
