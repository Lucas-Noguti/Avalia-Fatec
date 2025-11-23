import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

function GerenciarTurmas() {
  const [turmas, setTurmas] = useState([
    { id: 1, nome: 'Engenharia Civil - 2025.1' },
    { id: 2, nome: 'Ciência da Computação - 2025.1' },
    { id: 3, nome: 'Letras - 2025.1' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [formData, setFormData] = useState({ nome: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newTurma = {
      id: turmas.length + 1,
      nome: formData.nome
    };
    setTurmas([...turmas, newTurma]);
    setFormData({ nome: '' });
    setShowAddModal(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setTurmas(turmas.map(t => 
      t.id === selectedTurma.id ? { ...t, nome: formData.nome } : t
    ));
    setShowEditModal(false);
    setSelectedTurma(null);
    setFormData({ nome: '' });
  };

  const handleDelete = () => {
    setTurmas(turmas.filter(t => t.id !== selectedTurma.id));
    setShowDeleteModal(false);
    setSelectedTurma(null);
  };

  const openEditModal = (turma) => {
    setSelectedTurma(turma);
    setFormData({ nome: turma.nome });
    setShowEditModal(true);
  };

  const openDeleteModal = (turma) => {
    setSelectedTurma(turma);
    setShowDeleteModal(true);
  };

  return (
    <>
      <section className="home-header">
        <h2>Painel de Administração</h2>
      </section>

      <nav className="admin-nav">
        <Link to="/gerenciar-disciplinas">Disciplinas</Link>
        <Link to="/gerenciar-turmas" className="active">Turmas</Link>
        <Link to="/gerenciar-professores">Professores</Link>
      </nav>

      <section className="question-form-container">
        <div className="admin-content-header">
          <h3>Turmas Cadastradas</h3>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i> Nova Turma
          </button>
        </div>

        <div className="question-list-container">
          <table className="question-table">
            <thead>
              <tr>
                <th>Nome da Turma</th>
                <th className="column-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td>{turma.nome}</td>
                  <td className="table-actions">
                    <button 
                      onClick={() => openEditModal(turma)}
                      className="btn-icon" 
                      title="Editar"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button 
                      onClick={() => openDeleteModal(turma)}
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
              <h2>Adicionar Nova Turma</h2>
            </div>
            <form className="modal-body" onSubmit={handleAdd}>
              <div className="form-group">
                <label htmlFor="nome-turma-add">Nome da Turma</label>
                <input 
                  type="text" 
                  id="nome-turma-add" 
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                  placeholder="Ex: Engenharia Elétrica - 2025.2"
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
              <h2>Editar Turma</h2>
            </div>
            <form className="modal-body" onSubmit={handleEdit}>
              <div className="form-group">
                <label htmlFor="nome-turma-edit">Nome da Turma</label>
                <input 
                  type="text" 
                  id="nome-turma-edit" 
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
                Você tem certeza que deseja excluir esta turma? 
                Todas as avaliações associadas a ela podem ser afetadas.
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

export default GerenciarTurmas;
