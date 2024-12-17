import { Link } from 'react-router-dom'; // Importando Link do React Router

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src="/src/assets/logo (2).png" alt="Grupo Fácil Logo" className="h-10" />
          <h1 className="text-xl font-semibold">Grupo Fácil</h1>
        </div>

        {/* Links de Navegação */}
        <div className="flex items-center space-x-6 ml-auto">
          {/* Links de Navegação à Direita */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="#home" className="text-white hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link to="#services" className="text-white hover:text-blue-400">Serviços</Link>
              </li>
              <li>
                <Link to="#about" className="text-white hover:text-blue-400">Sobre</Link>
              </li>
              <li>
                <Link to="#contact" className="text-white hover:text-blue-400">Contato</Link>
              </li>
            </ul>
          </nav>

          {/* Botões Login e Registre-se */}
          <div className="flex space-x-4">
            <Link 
              to="/login"  // Caminho para a página de Login
              className="border-2 border-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 hover:text-gray-900 transition duration-300"
            >
              Login
            </Link>
            <Link 
              to="/registrar"  // Caminho para a página de Login
              className="border-2 border-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 hover:text-gray-900 transition duration-300"
            >
              Registre-se
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;