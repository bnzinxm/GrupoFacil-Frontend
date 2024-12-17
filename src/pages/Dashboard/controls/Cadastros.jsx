import { useState } from 'react';

const Cadastro = () => {
  // Inicializando o estado dos alunos com os dados do localStorage ou com um array vazio
  const [alunos, setAlunos] = useState(() => {
    const savedAlunos = localStorage.getItem('alunos');
    return savedAlunos ? JSON.parse(savedAlunos) : []; // Se houver dados no localStorage, carrega, caso contrário, inicializa com um array vazio.
  });

  const [newAluno, setNewAluno] = useState({ nome: '', idade: '', serie: '', turno: '' });
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para filtrar alunos com base no termo de pesquisa
  const filteredAlunos = alunos.filter((aluno) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      aluno.nome.toLowerCase().includes(searchValue) ||
      aluno.serie.toLowerCase().includes(searchValue) ||
      aluno.turno.toLowerCase().includes(searchValue) ||
      aluno.idade.toString().includes(searchValue)
    );
  });

  // Função para salvar a lista de alunos no localStorage sempre que ela for alterada
  const saveAlunosToLocalStorage = (newAlunos) => {
    localStorage.setItem('alunos', JSON.stringify(newAlunos));
  };

  // Adicionar ou Editar aluno
  const addOrEditAluno = () => {
    if (newAluno.nome && newAluno.idade && newAluno.serie && newAluno.turno) {
      let updatedAlunos;
      if (selectedAluno) {
        // Editar aluno
        updatedAlunos = alunos.map((aluno) =>
          aluno._id === selectedAluno._id ? { ...selectedAluno, ...newAluno } : aluno
        );
      } else {
        // Adicionar aluno
        updatedAlunos = [...alunos, { ...newAluno, _id: alunos.length + 1 }];
      }
      setAlunos(updatedAlunos);
      saveAlunosToLocalStorage(updatedAlunos); // Salvar no localStorage
      closeModals();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  // Excluir aluno
  const deleteAluno = () => {
    const updatedAlunos = alunos.filter((aluno) => aluno._id !== selectedAluno._id);
    setAlunos(updatedAlunos);
    saveAlunosToLocalStorage(updatedAlunos); // Salvar no localStorage
    closeModals();
  };

  // Abrir modais
  const openAddAlunoModal = () => {
    setNewAluno({ nome: '', idade: '', serie: '', turno: '' });
    setSelectedAluno(null);
    setShowModal(true);
    setShowDeleteModal(false);
  };

  const openEditModal = (aluno) => {
    setSelectedAluno(aluno);
    setNewAluno(aluno);
    setShowModal(true);
    setShowDeleteModal(false);
  };

  const openDeleteModal = (aluno) => {
    setSelectedAluno(aluno);
    setShowDeleteModal(true);
    setShowModal(false);
  };

  const closeModals = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Cadastro de Alunos</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualizar o termo de pesquisa
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Tabela de alunos */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border-collapse bg-white rounded-md shadow-md">
          <thead className="bg-gray-300"> {/* Alterado para bg-gray-300 */}
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Idade</th>
              <th className="px-4 py-2 text-left">Série</th>
              <th className="px-4 py-2 text-left">Turno</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.map((aluno) => (
              <tr key={aluno._id}>
                <td className="px-4 py-2">{aluno.nome}</td>
                <td className="px-4 py-2">{aluno.idade}</td>
                <td className="px-4 py-2">{aluno.serie}</td>
                <td className="px-4 py-2">{aluno.turno}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => openEditModal(aluno)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openDeleteModal(aluno)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão para abrir o modal de adicionar aluno */}
      <div className="text-right mb-6">
        <button
          onClick={openAddAlunoModal}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Adicionar Aluno
        </button>
      </div>

      {/* Modal de Adicionar ou Editar Aluno */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {selectedAluno ? 'Editar Aluno' : 'Adicionar Aluno'}
            </h2>
            <div>
              <div>
                <label className="block font-semibold">Nome</label>
                <input
                  type="text"
                  value={newAluno.nome}
                  onChange={(e) => setNewAluno({ ...newAluno, nome: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block font-semibold">Idade</label>
                <input
                  type="number"
                  value={newAluno.idade}
                  onChange={(e) => setNewAluno({ ...newAluno, idade: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block font-semibold">Série</label>
                <input
                  type="text"
                  value={newAluno.serie}
                  onChange={(e) => setNewAluno({ ...newAluno, serie: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block font-semibold">Turno</label>
                <input
                  type="text"
                  value={newAluno.turno}
                  onChange={(e) => setNewAluno({ ...newAluno, turno: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={addOrEditAluno}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Salvar
                </button>
                <button
                  onClick={closeModals}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

            {/* Modal de confirmação de exclusão */}
            {showDeleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Tem certeza que deseja excluir este aluno?</h2>
            <div className="flex justify-between">
              <button
                onClick={deleteAluno}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Deletar
              </button>
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
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

export default Cadastro;