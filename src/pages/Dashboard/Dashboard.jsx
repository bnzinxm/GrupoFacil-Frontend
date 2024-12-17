// Dashboard.jsx
import { useState } from 'react';
import Sidebar from './components/Sidebar'; // Sidebar da navegação
import PainelUsuario from './components/PainelUsuario'; // Painel de usuário com nome e foto de perfil
import Agendamentos from './controls/Agendamentos'; // Card de Agendamentos
import CardPerfil from './controls/Perfil'; // Card de Perfil
import Principal from './controls/Principal'; // Control Principal
import Cadastros from './controls/Cadastros';
import Sorteios from './controls/Sorteios';

const Dashboard = () => {
  const [currentControl, setCurrentControl] = useState('servicos'); // Control inicial

  // Usuário de teste
  const user = {
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    profileImage: "", // Foto de perfil vazia, logo geramos uma cor de fundo
  };

  const renderControl = () => {
    switch (currentControl) {
      case 'agendamentos':
        return <Agendamentos />;
      case 'perfil':
        return <CardPerfil />;
      case 'cadastros':
        return <Cadastros />
      case 'sorteios':
        return <Sorteios />
      case 'principal':
        return <Principal />
      default:
        return <div>Selecione um controle</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar com os controles */}
      <Sidebar setCurrentControl={setCurrentControl} />

      <div className="flex-1 ml-64 bg-gray-100">
        {/* Painel de usuário */}
        <div className="p-6">
          <PainelUsuario user={user} />
        </div>

        {/* Área de Controle */}
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
            {renderControl()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;