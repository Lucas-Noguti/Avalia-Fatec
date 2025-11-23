import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/home" className="logo-link">
          <img src="/Logo_Fla_Avalia.png" alt="Logo Fla Avalia" className="logo-icon" />
          <h1 className="logo-text">FLAVALIA</h1>
        </Link>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
        </button>

        <nav className={mobileMenuOpen ? 'active' : ''}>
          <ul>
            <li>
              <Link 
                to="/home" 
                className={location.pathname === '/home' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Minhas Avaliações
              </Link>
            </li>
            <li>
              <Link 
                to="/banco-questoes" 
                className={location.pathname === '/banco-questoes' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Banco de Questões
              </Link>
            </li>
            <li>
              <Link 
                to="#" 
                className={location.pathname === '/resultados' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resultados
              </Link>
            </li>
            <li>
              <Link 
                to="/testar-pdf" 
                className={location.pathname === '/testar-pdf' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-file-pdf"></i> Testar PDF
              </Link>
            </li>
          </ul>
        </nav>

        <div className="user-menu">
          <a href="#">Olá, Professor!</a>
          <Link 
            to="/gerenciar-disciplinas" 
            className={`admin-link ${location.pathname.includes('gerenciar') ? 'active' : ''}`}
          >
            Admin
          </Link>
          <a href="#" onClick={handleLogout} className="logout-link">
            Sair <i className="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
