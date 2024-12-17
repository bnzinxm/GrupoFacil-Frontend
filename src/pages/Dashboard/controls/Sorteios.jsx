import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sorteios = () => {
    const [alunos, setAlunos] = useState([]);
    const [modalConfig, setModalConfig] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalGroups, setModalGroups] = useState(false);
    const [modalLoading, setModalLoading] = useState(false); // Estado para o modal de espera
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        // Fetch alunos from API
        axios.get('http://localhost:5501/api/alunos')
            .then(response => setAlunos(response.data))
            .catch(error => console.error('Erro ao buscar alunos:', error));
    }, []);

    const sortearGrupos = (config) => {
        setModalLoading(true); // Ativa o modal de espera
        const { tamanhoGrupo, excessoes } = config;
        const alunosPresentes = alunos.filter(aluno => !excessoes.includes(aluno.nome));

        const shuffled = [...alunosPresentes].sort(() => Math.random() - 0.5);
        const gruposCriados = [];

        for (let i = 0; i < shuffled.length; i += tamanhoGrupo) {
            gruposCriados.push(shuffled.slice(i, i + tamanhoGrupo));
        }

        setTimeout(() => { // Simula um tempo de espera antes de exibir o sucesso
            setGrupos(gruposCriados);
            setModalLoading(false); // Desativa o modal de espera
            setModalConfig(false);
            setModalSuccess(true);
        }, 2000); // 2 segundos de "espera"
    };

    const handleConfigSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tamanhoGrupo = parseInt(formData.get('tamanhoGrupo'));
        const excessoes = formData.get('excessoes')?.split(',') || [];
        sortearGrupos({ tamanhoGrupo, excessoes });
    };

    return (
        <div className="p-8 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Sorteios de Grupos</h1>
            <div className="flex justify-center mb-8">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-xl text-lg font-medium"
                    onClick={() => setModalConfig(true)}
                >
                    Sortear Grupos
                </button>
            </div>

            {/* Modal de Configuração */}
            {modalConfig && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-xl w-96">
                        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Configurações do Sorteio</h2>
                        <form onSubmit={handleConfigSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Tamanho do Grupo</label>
                                <input
                                    type="number"
                                    name="tamanhoGrupo"
                                    className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Excessões (nomes separados por vírgula)</label>
                                <input
                                    type="text"
                                    name="excessoes"
                                    className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg font-medium"
                                    onClick={() => setModalConfig(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium"
                                >
                                    Sortear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Sucesso */}
            {modalSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-xl w-96 text-center">
                        <div className="flex justify-center mb-6">
                            <img src="src/pages/Dashboard/assets/success.png" alt="Success Icon" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Sucesso!</h2>
                        <p className="text-gray-600 mb-6">Todos os grupos foram sorteados com sucesso!</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg text-lg font-medium"
                            onClick={() => { setModalSuccess(false); setModalGroups(true); }}
                        >
                            Visualizar Grupos
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Espera (Loading) */}
            {modalLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-xl w-96 text-center">
                        <div className="flex justify-center mb-6">
                            <img src="src/pages/Dashboard/assets/carregamento.gif" alt="Loading..." />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700">Aguarde, estamos sorteando os grupos...</h2>
                    </div>
                </div>
            )}

            {/* Modal de Grupos */}
            {modalGroups && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-6xl">
                        <h2 className="text-2xl font-bold text-gray-700 mb-6">Grupos Criados</h2>
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-3 text-left text-gray-600 font-medium">Grupo</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left text-gray-600 font-medium">Alunos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grupos.map((grupo, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2 text-gray-700">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-gray-700">{grupo.map(aluno => aluno.nome).join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between mt-8">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg font-medium"
                                onClick={() => setModalGroups(false)}
                            >
                                Fechar
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium"
                                onClick={() => alert('Grupos confirmados!')}
                            >
                                Confirmar Grupos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sorteios;