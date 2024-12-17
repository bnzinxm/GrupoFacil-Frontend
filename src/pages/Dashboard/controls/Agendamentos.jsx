// controls/Agendamentos.js

import { useState } from 'react';

const Agendamentos = () => {
  // Estado para controle dos agendamentos
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      titulo: 'Reunião sobre novos projetos',
      descricao: 'Discussão sobre os novos projetos da empresa.',
      data: '2024-12-01',
      hora: '10:00 AM',
      notificacoes: true,
    },
    {
      id: 2,
      titulo: 'Consultoria sobre geração de provas',
      descricao: 'Sessão de consultoria com o time de pedagogia.',
      data: '2024-12-05',
      hora: '02:00 PM',
      notificacoes: false,
    },
    {
      id: 3,
      titulo: 'Sessão de planejamento de mapas mentais',
      descricao: 'Planejamento sobre a criação de mapas mentais para ensino.',
      data: '2024-12-10',
      hora: '09:00 AM',
      notificacoes: true,
    },
  ]);

  // Estado para controle do modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // "create", "edit", "delete"
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
    notificacoes: false,
  });

  // Abrir modal de criação
  const openCreateModal = () => {
    setModalType('create');
    setFormData({
      titulo: '',
      descricao: '',
      data: '',
      hora: '',
      notificacoes: false,
    });
    setShowModal(true);
  };

  // Abrir modal de edição
  const openEditModal = (agendamento) => {
    setModalType('edit');
    setSelectedAgendamento(agendamento);
    setFormData({
      titulo: agendamento.titulo,
      descricao: agendamento.descricao,
      data: agendamento.data,
      hora: agendamento.hora,
      notificacoes: agendamento.notificacoes,
    });
    setShowModal(true);
  };

  // Abrir modal de exclusão
  const openDeleteModal = (agendamento) => {
    setModalType('delete');
    setSelectedAgendamento(agendamento);
    setShowModal(true);
  };

  // Fechar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAgendamento(null);
  };

  // Salvar novo agendamento
  const saveAgendamento = () => {
    if (modalType === 'create') {
      setAgendamentos([
        ...agendamentos,
        {
          id: agendamentos.length + 1,
          ...formData,
        },
      ]);
    } else if (modalType === 'edit' && selectedAgendamento) {
      setAgendamentos(
        agendamentos.map((agendamento) =>
          agendamento.id === selectedAgendamento.id
            ? { ...agendamento, ...formData }
            : agendamento
        )
      );
    }

    closeModal();
  };

  // Deletar agendamento
  const deleteAgendamento = () => {
    setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== selectedAgendamento.id));
    closeModal();
  };

  // Atualizar dados do formulário
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Seus Agendamentos</h1>
        <p className="text-lg text-gray-600 mt-2">Aqui estão os seus agendamentos realizados.</p>
      </div>

      <div className="space-y-6">
        {agendamentos.map((agendamento) => (
          <div
            key={agendamento.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 hover:shadow-lg transition-all duration-200"
          >
            <div className="text-lg font-semibold text-gray-800">
              {agendamento.data} - {agendamento.hora}
            </div>
            <p className="text-gray-600">{agendamento.descricao}</p>

            <div className="flex justify-between">
              <button
                onClick={() => openEditModal(agendamento)}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Editar
              </button>
              <button
                onClick={() => openDeleteModal(agendamento)}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Adicionar Novo Agendamento
        </button>
      </div>

      {/* Modal de Criação e Edição */}
      {showModal && (modalType === 'create' || modalType === 'edit') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{modalType === 'create' ? 'Novo Agendamento' : 'Editar Agendamento'}</h2>
            <form>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block font-medium text-gray-700">Data</label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block font-medium text-gray-700">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="notificacoes"
                    checked={formData.notificacoes}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Receber Notificações</span>
                </label>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={saveAgendamento}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {modalType === 'create' ? 'Salvar' : 'Atualizar'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {showModal && modalType === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir o agendamento "{selectedAgendamento?.titulo}"?</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={deleteAgendamento}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Sim, Excluir
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendamentos;