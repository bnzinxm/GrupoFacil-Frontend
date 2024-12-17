// controls/Servicos.js

import React from 'react';

const Servicos = () => {
  const servicos = [
    {
      id: 1,
      nome: 'Geração de Provas com Gabarito',
      descricao:
        'Crie provas de múltipla escolha com gabarito de maneira automática. Personalize as perguntas e opções.',
      preco: 'Gratuito (até 10 questões)',
    },
    {
      id: 2,
      nome: 'Geração de Mapeamento de Conteúdo',
      descricao:
        'Organize seus tópicos de conteúdo em mapas mentais visuais para facilitar o aprendizado e revisão.',
      preco: 'Gratuito (básico), Pago (versão avançada)',
    },
    {
      id: 3,
      nome: 'Gerenciamento de Notas Automatizado',
      descricao:
        'Calcule automaticamente as médias das notas de seus alunos. Ideal para professores gerenciarem turmas pequenas.',
      preco: 'Gratuito (até 50 alunos)',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-8">
      {/* Cabeçalho */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-800">Descubra Nossos Serviços</h1>
        <p className="text-gray-600 text-lg mt-4">
          Explore nossas ferramentas e torne sua rotina mais produtiva.
        </p>
      </header>

      {/* Serviços */}
      <main className="max-w-4xl mx-auto flex flex-col gap-12">
        {servicos.map((servico) => (
          <div
            key={servico.id}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          >
            <div className="w-full md:w-2/5 bg-gray-100 flex items-center justify-center p-6">
              <span className="text-6xl text-blue-500 font-bold">
                {servico.id}
              </span>
            </div>
            <div className="w-full md:w-3/5 p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{servico.nome}</h3>
              <p className="text-gray-600 mb-4 text-base">{servico.descricao}</p>
              <div className="text-lg font-medium text-gray-700 mb-6">{servico.preco}</div>
              <button
                onClick={() => alert(`Iniciar serviço: ${servico.nome}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors"
              >
                Iniciar Serviço
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Botão adicional */}
      <footer className="mt-20 text-center">
        <button
          onClick={() => alert('Redirecionar para adquirir mais serviços')}
          className="bg-blue-500 text-white px-10 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-md"
        >
          Adquirir Mais Serviços
        </button>
      </footer>
    </div>
  );
};

export default Servicos;