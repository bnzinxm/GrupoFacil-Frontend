// controls/Perfil.js
import { useState } from 'react';
import { FaUser, FaCog, FaFileInvoiceDollar, FaTools } from 'react-icons/fa';

const CardPerfil = () => {
  const [name, setName] = useState('João Silva');
  const [email, setEmail] = useState('joao.silva@exemplo.com');
  const [profileImage, setProfileImage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Controla a edição

  const handleSave = () => {
    alert('Informações salvas!');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto mt-8">
      <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden mb-4">
        {profileImage ? (
          <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-3xl">
            {name[0]}
          </div>
        )}
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        <p className="text-gray-600">{email}</p>
      </div>

      {/* Se estiver editando, exibe os campos para editar */}
      {isEditing ? (
        <div className="space-y-4 mt-4 w-full">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={handleEdit}
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
          >
            Editar Perfil
          </button>
        </div>
      )}
    </div>
  );
};

export default CardPerfil;