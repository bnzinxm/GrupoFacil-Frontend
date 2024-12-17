import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAluno, setNewAluno] = useState({
    nome: "",
    idade: "",
    serie: "",
    turno: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false); // Novo estado para verificar se estamos editando um aluno
  const [alunoEditando, setAlunoEditando] = useState(null); // Estado para armazenar o aluno que está sendo editado

  // Carregar alunos do backend
  useEffect(() => {
    const getAlunos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token ausente!");
          return;
        }

        const response = await axios.get("http://localhost:5501/api/alunos", {
          headers: {
            Authorization: token,
          },
        });

        setAlunos(response.data);
        setLoading(false);
      } catch (err) {
        toast.error("Erro ao tentar carregar os alunos. Verifique sua conexão ou backend.");
        console.error("Erro ao carregar alunos: ", err);
        setLoading(false);
      }
    };

    getAlunos();
  }, []);

  // Adicionar ou editar aluno
  const handleSaveAluno = async () => {
    if (!newAluno.nome || !newAluno.idade || !newAluno.serie || !newAluno.turno) {
      toast.warning("Preencha todos os campos antes de continuar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token ausente. Faça login novamente.");
        return;
      }

      let response;

      if (editando) {
        // Edição
        response = await axios.put(
          `http://localhost:5501/api/alunos/${alunoEditando.id}`,
          newAluno,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const updatedAlunos = alunos.map((aluno) =>
          aluno.id === alunoEditando.id ? response.data : aluno
        );
        setAlunos(updatedAlunos);
        toast.success("Aluno editado com sucesso!");
      } else {
        // Criação
        response = await axios.post("http://localhost:5501/api/alunos", newAluno, {
          headers: {
            Authorization: token,
          },
        });
        setAlunos([...alunos, response.data]);
        toast.success("Aluno criado com sucesso!");
      }

      setNewAluno({ nome: "", idade: "", serie: "", turno: "" });
      setShowModal(false);
      setEditando(false); // Resetar modo de edição
      setAlunoEditando(null); // Limpar aluno sendo editado
    } catch (err) {
      toast.error("Erro ao salvar aluno. Verifique os dados ou tente novamente.");
      console.error("Erro ao salvar aluno: ", err);
    }
  };

  // Abrir modal para editar aluno
  const handleEditAluno = (aluno) => {
    setNewAluno({
      nome: aluno.nome,
      idade: aluno.idade,
      serie: aluno.serie,
      turno: aluno.turno,
    });
    setAlunoEditando(aluno);
    setEditando(true);
    setShowModal(true);
  };

  // Abrir modal para adicionar aluno
  const handleOpenModal = () => {
    setNewAluno({ nome: "", idade: "", serie: "", turno: "" });
    setShowModal(true);
    setEditando(false);
    setAlunoEditando(null);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Alunos</h1>

      {/* Tabela de alunos */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Idade</th>
              <th className="px-4 py-2 text-left">Série</th>
              <th className="px-4 py-2 text-left">Turno</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{aluno.nome}</td>
                <td className="px-4 py-2">{aluno.idade}</td>
                <td className="px-4 py-2">{aluno.serie}</td>
                <td className="px-4 py-2">{aluno.turno}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditAluno(aluno)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para adicionar ou editar aluno */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">{editando ? "Editar Aluno" : "Adicionar Aluno"}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                value={newAluno.nome}
                onChange={(e) => setNewAluno({ ...newAluno, nome: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Idade</label>
              <input
                type="number"
                value={newAluno.idade}
                onChange={(e) => setNewAluno({ ...newAluno, idade: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Série</label>
              <input
                type="text"
                value={newAluno.serie}
                onChange={(e) => setNewAluno({ ...newAluno, serie: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Turno</label>
              <input
                type="text"
                value={newAluno.turno}
                onChange={(e) => setNewAluno({ ...newAluno, turno: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveAluno}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                {editando ? "Salvar Alterações" : "Adicionar"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-4 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700"
      >
        Adicionar Aluno
      </button>
    </div>
  );
};

export default Alunos;