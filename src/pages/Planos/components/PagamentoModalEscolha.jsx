import { IoClose } from 'react-icons/io5'; // Ícone de fechar

const PagamentoModalEscolha = ({ isModalOpen, closeModal, openInfoModal }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl p-8 w-96 max-w-full relative shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Botão de Fechar */}
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
          <IoClose size={24} />
        </button>

        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-6">Escolha seu Método de Pagamento</h3>
        <div className="mt-6 space-y-4">
          {['PicPay', 'Pix', 'GooglePay', 'CreditCard', 'Boleto'].map((method) => (
            <div
              key={method}
              className="flex items-center p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
              onClick={() => openInfoModal(method)}
            >
              <img
                src={`/src/pages/Planos/assets/${method.toLowerCase()}.png`}
                alt={method}
                className="h-10 mr-4"
              />
              <span className="text-lg font-semibold">{method}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PagamentoModalEscolha;