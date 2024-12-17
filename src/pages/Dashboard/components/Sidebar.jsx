import { FaRegClipboard, FaRegCalendarAlt, FaRegListAlt, FaRegUser, FaRegBell, FaAddressBook } from "react-icons/fa"; // Importando os ícones

const Sidebar = ({ setCurrentControl }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 space-y-8 fixed shadow-lg">
      {/* Logo e Título */}
      <div className="flex items-center space-x-4">
        <img 
          src="src/assets/logo (2).png" 
          alt="Logo" 
          className="h-12 w-12 object-contain" 
        />
        <h1 className="text-3xl font-bold tracking-wide">Grupo Fácil</h1>
      </div>

      {/* Navegação */}
      <nav className="space-y-6">
        {[
          { label: "Principal", value: "principal", icon: <FaAddressBook /> },
          { label: "Agendamentos", value: "agendamentos", icon: <FaRegCalendarAlt /> },
          { label: "Cadastros", value: "cadastros", icon: <FaRegClipboard /> },
          { label: "Sorteios", value: "sorteios", icon: <FaRegBell />},
          { label: "Perfil", value: "perfil", icon: <FaRegUser /> },
        ].map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => setCurrentControl(value)}
            className="flex items-center text-lg font-medium text-gray-200 hover:text-white w-full py-3 px-4 rounded-md transition-all duration-300 hover:bg-gray-700"
          >
            <span className="mr-3">{icon}</span> {/* Ícone à esquerda do texto */}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;