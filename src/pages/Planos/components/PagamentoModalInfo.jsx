import { IoClose } from 'react-icons/io5'; // Ícone de fechar

const PagamentoModalInfo = ({ isModalOpen, closeModal, paymentMethod }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl p-8 w-96 max-w-full relative shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Botão de Fechar */}
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
          <IoClose size={24} />
        </button>

        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-6">Informações de Pagamento: {paymentMethod}</h3>
        
        {/* Formulário baseado no método de pagamento selecionado */}
        <div className="space-y-4">
          {paymentMethod === 'CreditCard' && (
            <>
              <label className="block text-gray-700">Número do Cartão</label>
              <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg" placeholder="Número do cartão" />

              <div className="flex space-x-4">
                <div>
                  <label className="block text-gray-700">Validade</label>
                  <input type="text" className="mt-2 p-4 w-28 border border-gray-300 rounded-lg" placeholder="MM/AA" />
                </div>
                <div>
                  <label className="block text-gray-700">CVV</label>
                  <input type="text" className="mt-2 p-4 w-20 border border-gray-300 rounded-lg" placeholder="CVV" />
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'Pix' && (
            <>
              <label className="block text-gray-700">Chave Pix</label>
              <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg" placeholder="Digite sua chave Pix" />
            </>
          )}

          {paymentMethod === 'Boleto' && (
            <>
              <label className="block text-gray-700">CPF</label>
              <input type="text" className="mt-2 p-4 w-full border border-gray-300 rounded-lg" placeholder="CPF do pagador" />
            </>
          )}

          {/* Outros métodos de pagamento podem ser adicionados aqui */}
        </div>

        {/* Botão de Confirmação */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl">Confirmar Pagamento</button>
        </div>
      </div>
    </div>
  );
};

export default PagamentoModalInfo;