// components/BottomBar.jsx
import { FaUser, FaCog, FaFileInvoiceDollar, FaTools } from 'react-icons/fa';

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white flex justify-around items-center py-2 shadow-lg">
      <button className="flex flex-col items-center space-y-1">
        <FaUser className="text-2xl" />
        <span className="text-sm">Perfil</span>
      </button>
      <button className="flex flex-col items-center space-y-1">
        <FaFileInvoiceDollar className="text-2xl" />
        <span className="text-sm">Planos</span>
      </button>
      <button className="flex flex-col items-center space-y-1">
        <FaTools className="text-2xl" />
        <span className="text-sm">Configurações</span>
      </button>
      <button className="flex flex-col items-center space-y-1">
        <FaCog className="text-2xl" />
        <span className="text-sm">Ajuda</span>
      </button>
    </div>
  );
};

export default BottomBar;