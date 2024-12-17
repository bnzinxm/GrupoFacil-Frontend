import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Modal from 'react-modal';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { FaSearch } from 'react-icons/fa'; // Importando ícone de pesquisa do FontAwesome
import 'tailwindcss/tailwind.css';

// Registrar todos os elementos necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Desempenho dos Alunos',
      data: [85, 90, 75, 80, 95, 92],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Desempenho dos Alunos (2024)',
      font: { size: 18, weight: 'bold' },
      color: '#1F2937',
    },
    legend: {
      labels: { color: '#1F2937' },
    },
  },
  scales: {
    x: { grid: { color: '#E5E7EB' }, ticks: { color: '#1F2937' } },
    y: { grid: { color: '#E5E7EB' }, ticks: { color: '#1F2937' } },
  },
};

const Principal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Destaques');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false); // Controle para evitar tela branca

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Carregando...</div>;
  }

  // Alunos para exibição
  const alunos = [
    { nome: 'João Silva', media: 9.5, notas: [10, 9, 9, 9, 10] },
    { nome: 'Maria Oliveira', media: 8.9, notas: [9, 8, 8, 9, 9] },
    { nome: 'Pedro Santos', media: 8.2, notas: [8, 8, 7, 8, 9] },
    { nome: 'Ana Costa', media: 9.0, notas: [9, 9, 9, 9, 9] },
    { nome: 'Lucas Pereira', media: 7.8, notas: [7, 8, 7, 8, 8] },
  ];

  // Filtra os alunos com base na pesquisa
  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-500 text-white py-6 px-8 rounded-b-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bem-vindo, Professor João!</h1>
          <button
            onClick={openModal}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100"
          >
            Abrir Modal
          </button>
        </div>
      </header>

      <main className="flex-grow p-8">
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-[80%] h-[80%] bg-white rounded-2xl shadow-xl overflow-hidden mx-auto my-auto flex"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-6 border-r flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6">Navegar</h2>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setSelectedOption('Destaques')}
                  className={`block w-full text-left py-2 px-4 rounded-lg font-medium ${selectedOption === 'Destaques' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Destaques
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedOption('Filtrar')}
                  className={`block w-full text-left py-2 px-4 rounded-lg font-medium ${selectedOption === 'Filtrar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Filtrar
                </button>
              </li>
            </ul>
          </div>

          {/* Botão para fechar o modal */}
          <button
            onClick={closeModal}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:bg-red-600"
          >
            Fechar Modal
          </button>
        </div>

        {/* Conteúdo principal do modal */}
        <div className="w-3/4 p-6 overflow-auto">
          {selectedOption === 'Destaques' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Destaques</h3>
                {/* Input de pesquisa */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar aluno..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  />
                  <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              <div className="space-y-4">
                {/* Exibe os alunos filtrados */}
                {filteredAlunos.length === 0 ? (
                  <p className="text-gray-500">Nenhum aluno encontrado.</p>
                ) : (
                  filteredAlunos.map((aluno) => (
                    <div key={aluno.nome} className="bg-gray-100 p-4 rounded-lg shadow-md">
                      <h4 className="text-xl font-semibold">{aluno.nome}</h4>
                      <p className="text-gray-700">Média: {aluno.media}</p>
                      <p className="text-gray-600">Notas: {aluno.notas.join(', ')}</p>
                      {/* Botões de "Ver Mais" e "Editar Perfil" */}
                      <div className="mt-4 flex gap-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600">
                          Ver Mais
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600">
                          Editar Perfil
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {selectedOption === 'Filtrar' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Filtrar</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium">Mês</label>
                  <select className="w-full mt-2 p-3 border rounded">
                    <option>Janeiro</option>
                    <option>Fevereiro</option>
                    <option>Março</option>
                    <option>Maio</option>
                    <option>Abril</option>
                    <option>Junho</option>
                    <option>Julho</option>
                    <option>Agosto</option>
                    <option>Setembro</option>
                    <option>Outubro</option>
                    <option>Novembro</option>
                    <option>Dezembro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Classe</label>
                  <select className="w-full mt-2 p-3 border rounded">
                    <optgroup label="Ensino Fundamental I">
                      <option>1º Ano</option>
                      <option>2º Ano</option>
                      <option>3º Ano</option>
                    </optgroup>
                    <optgroup label="Ensino Fundamental II">
                      <option>4º Ano</option>
                      <option>5º Ano</option>
                      <option>6º Ano</option>
                      <option>7º Ano</option>
                      <option>8º Ano</option>
                      <option>9º Ano</option>
                    </optgroup>
                    <optgroup label="Ensino Médio">
                      <option>1º Ano</option>
                      <option>2º Ano</option>
                      <option>3º Ano</option>
                    </optgroup>
                  </select>
                </div>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Aplicar
                </button>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Principal;