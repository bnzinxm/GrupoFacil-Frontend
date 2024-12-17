import Header from '../../components/Header';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col justify-center items-center">
      {/* Header (Se necessário) */}
      <Header />

      {/* Conteúdo principal */}
      <div className="flex flex-col justify-center items-center text-center space-y-6">
        {/* Ícone de erro */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-24 h-24 text-red-600" // Cor vermelha para erro
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12" // Forma de X, representando erro
          />
        </svg>

        {/* Título de erro */}
        <h1 className="text-5xl font-extrabold text-gray-800">
          Essa página não existe!
        </h1>

        {/* Descrição opcional */}
        <p className="text-lg text-gray-600">
          Desculpe, mas a página que você está procurando não foi encontrada.
        </p>

        {/* Botão de retorno (opcional) */}
        <div className="mt-4">
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 text-lg font-semibold transition-all duration-200"
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;