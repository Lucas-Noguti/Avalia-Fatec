import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import BancoQuestoes from './pages/BancoQuestoes';
import CriarQuestao from './pages/CriarQuestao';
import EditarQuestao from './pages/EditarQuestao';
import CriarAvaliacao from './pages/CriarAvaliacao';
import EditarAvaliacao from './pages/EditarAvaliacao';
import VerResultados from './pages/VerResultados';
import GerenciarDisciplinas from './pages/GerenciarDisciplinas';
import GerenciarTurmas from './pages/GerenciarTurmas';
import GerenciarProfessores from './pages/GerenciarProfessores';
import TestarPDF from './pages/TestarPDF';
import Layout from './components/Layout';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/banco-questoes" element={<BancoQuestoes />} />
          <Route path="/criar-questao" element={<CriarQuestao />} />
          <Route path="/editar-questao" element={<EditarQuestao />} />
          <Route path="/criar-avaliacao" element={<CriarAvaliacao />} />
          <Route path="/editar-avaliacao" element={<EditarAvaliacao />} />
          <Route path="/ver-resultados" element={<VerResultados />} />
          <Route path="/gerenciar-disciplinas" element={<GerenciarDisciplinas />} />
          <Route path="/gerenciar-turmas" element={<GerenciarTurmas />} />
          <Route path="/gerenciar-professores" element={<GerenciarProfessores />} />
          <Route path="/testar-pdf" element={<TestarPDF />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
