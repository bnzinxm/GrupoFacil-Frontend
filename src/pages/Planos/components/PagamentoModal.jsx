import { useState } from 'react';
import { IoClose } from 'react-icons/io5'; // Ícone de fechar do react-icons

const PagamentoModal = ({ isModalOpen, closeModal, selectedPlan }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simula a conclusão do carregamento
    }, 3000); // Simula 3 segundos de carregamento
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
        <div className="bg-white rounded-2xl p-8 w-96 max-w-full relative shadow-xl transform transition-transform duration-300 ease-in-out">
          {/* Botão de Fechar */}
          <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
            <IoClose size={24} />
          </button>

          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-6">Escolha seu Método de Pagamento</h3>
          <p className="mt-2 text-lg text-gray-600 text-center mb-6">Selecione um dos métodos abaixo para efetuar o pagamento do seu plano.</p>

          {/* Métodos de Pagamento */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {['PicPay', 'Pix', 'GooglePay', 'CreditCard', 'Boleto'].map((method) => (
              <div
                key={method}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out 
                  ${paymentMethod === method ? 'bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-white' : 'hover:bg-gray-100'} 
                  ${paymentMethod === method ? 'shadow-2xl border-l-4 border-blue-500' : ''}`}
                onClick={() => handlePaymentMethodSelect(method)}
              >
                <img
                  src={`/images/${method.toLowerCase()}.png`} 
                  alt={method} 
                  className="h-10 mr-4 transition-transform duration-300 transform hover:scale-105"
                />
                <span className="text-lg font-semibold">{method}</span>
              </div>
            ))}
          </div>

          {/* Modal de Carregamento */}
          {isLoading && (
            <div className="flex flex-col items-center mt-6">
              <h4 className="text-lg text-gray-800">Processando Pagamento...</h4>
              <svg className="w-16 h-16 animate-spin mt-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="currentColor">
                <circle className="text-gray-300" strokeWidth="4" strokeLinecap="round" cx="25" cy="25" r="20" />
                <circle className="text-blue-500" strokeWidth="4" strokeLinecap="round" cx="25" cy="25" r="20" strokeDasharray="125" strokeDashoffset="75" />
              </svg>
            </div>
          )}

          {/* Formulário Dinâmico baseado no Método de Pagamento Selecionado */}
          {!isLoading && paymentMethod && (
            <div className="mt-6 space-y-6">
              {paymentMethod === 'CreditCard' && (
                <>
                  <h4 className="text-xl font-semibold text-gray-900">Informações do Cartão</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700">Número do Cartão</label>
                      <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Número do cartão" />
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <label className="block text-gray-700">Validade</label>
                        <input type="text" className="mt-2 p-4 w-28 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/AA" />
                      </div>
                      <div>
                        <label className="block text-gray-700">CVV</label>
                        <input type="text" className="mt-2 p-4 w-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="CVV" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">Nome no Cartão</label>
                      <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nome completo" />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'Pix' && (
                <>
                  <h4 className="text-xl font-semibold text-gray-900">Informações do Pix</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700">Chave Pix</label>
                      <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite sua chave Pix" />
                    </div>
                    <div>
                      <label className="block text-gray-700">CPF</label>
                      <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="CPF do pagador" />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'Boleto' && (
                <>
                  <h4 className="text-xl font-semibold text-gray-900">Informações do Boleto</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700">CPF</label>
                      <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="CPF do pagador" />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Botão Final de Pagamento */}
          {!isLoading && paymentMethod && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition duration-200 ease-in-out"
              >
                Confirmar Pagamento
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PagamentoModal;