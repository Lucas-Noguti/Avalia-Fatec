import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import BancoQuestoes from './pages/BancoQuestoes';
import CriarQuestao from './pages/CriarQuestao';
import EditarQuestao from './pages/EditarQuestao';
import CriarAvaliacao from './pages/CriarAvaliacao';
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
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
