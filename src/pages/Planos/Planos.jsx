import { useState } from 'react';
import PagamentoModalEscolha from './components/PagamentoModalEscolha'; // Modal de escolha de pagamento
import PagamentoModalInfo from './components/PagamentoModalInfo'; // Modal com as informações do pagamento

const Planos = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpenEscolha, setIsModalOpenEscolha] = useState(false);
  const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Função para abrir o modal de escolha de plano
  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    if (plan === 'Professor') {
      alert('Você escolheu o plano gratuito! Não é necessário pagamento.');
    } else {
      setIsModalOpenEscolha(true); // Abre o modal para planos pagos
    }
  };

  // Função para abrir o modal com informações do pagamento
  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
    setIsModalOpenEscolha(false); // Fecha o modal de escolha de pagamento
    setIsModalOpenInfo(true); // Abre o modal com informações específicas do pagamento
  };

  // Função para fechar os modais
  const closeModalEscolha = () => setIsModalOpenEscolha(false);
  const closeModalInfo = () => setIsModalOpenInfo(false);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
      
      {/* Header já existente */}
      {/* O Header é assumido que já está importado e existe na pasta components */}

      {/* Card Gigante contendo todos os planos */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 relative mt-16">
        <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-8 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Escolha o Plano que Mais Atende às Suas Necessidades</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
              Confira as opções de planos e escolha o que melhor se adapta às suas necessidades. Cada plano tem benefícios exclusivos e diferentes preços.
            </p>
          </div>

          {/* Cards dos Planos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Plano Professor */}
            <div
              className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform duration-300 relative"
            >
              <h3 className="text-3xl font-semibold">Plano Professor</h3>
              <p className="mt-2 text-lg">Plano Grátis</p>
              <p className="h-4 mt-4 text-gray-200">Acesso completo sem custos mensais.</p>
              <button
                className="mt-6 bg-blue-400 text-white py-3 px-8 rounded-full text-xl font-semibold transform hover:scale-105 transition-transform duration-200 ease-in-out"
                onClick={() => handlePlanSelection('Professor')}
              >
                Começar agora
              </button>
            </div>

            {/* Plano Coordenador */}
            <div
              className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform duration-300 relative"
            >
              <h3 className="text-3xl font-semibold">Plano Coordenador</h3>
              <p className="mt-2 text-lg">R$ 19,99 / Mês</p>
              <p className="h-4 mt-4 text-gray-200">Acesso permitido a maioria</p>
              <button
                className="mt-6 bg-blue-400 text-white py-3 px-8 rounded-full text-xl font-semibold transform hover:scale-105 transition-transform duration-200 ease-in-out"
                onClick={() => handlePlanSelection('Coordenador')}
              >
                Assinar agora
              </button>
            </div>

            {/* Plano Diretor */}
            <div
              className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform duration-300 relative"
            >
              <h3 className="text-3xl font-semibold">Plano Diretor</h3>
              <p className="mt-2 text-lg">R$ 29,99 / Mês</p>
              <p className="h-4 mt-4 text-gray-200">Acesso total com suporte premium.</p>
              <button
                className="mt-6 bg-blue-400 text-white py-3 px-8 rounded-full text-xl font-semibold transform hover:scale-105 transition-transform duration-200 ease-in-out"
                onClick={() => handlePlanSelection('Diretor')}
              >
                Assinar agora
              </button>
            </div>
          </div>
        </div>

        {/* Texto abaixo das cards */}
        <div className="absolute inset-x-0 bottom-16 text-center">
          <p className="text-lg text-gray-600 font-semibold">
            Para prosseguir será necessário que você selecione um desses planos.
          </p>
        </div>
      </div>

      {/* Modals para Escolha de Pagamento e Preenchimento de Informações */}
      <PagamentoModalEscolha
        isModalOpen={isModalOpenEscolha}
        closeModal={closeModalEscolha}
        openInfoModal={handlePaymentMethodSelection}
      />
      
      <PagamentoModalInfo
        isModalOpen={isModalOpenInfo}
        closeModal={closeModalInfo}
        paymentMethod={paymentMethod}
      />
    </div>
  );
};

export default Planos;