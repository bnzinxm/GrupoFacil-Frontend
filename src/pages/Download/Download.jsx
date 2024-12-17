import { useState } from 'react';

const Download = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Controle do carregamento do modal

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setIsLoading(true); // Inicia o modal de carregamento

    setTimeout(() => {
      setIsDownloading(false);
      setTimeout(() => {
        setIsLoading(false); // Fim do carregamento
        setIsModalOpen(true); // Abre o modal gigante
      }, 1000); // Simula o tempo de carregamento do conteúdo
    }, 3000); // Simula o download com delay de 3 segundos
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl max-w-lg w-full p-8 flex flex-col items-center space-y-6">
        
        {/* Card de download */}
        <div className="bg-gray-50 p-6 rounded-lg w-full flex flex-col space-y-4">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">
            Faça o Download do Grupo Fácil
          </h1>

          <p className="text-lg text-gray-600 text-center mb-8">
            Baixe a versão mais recente do Grupo Fácil para o seu dispositivo.
          </p>

          {/* Cards de Download */}
          <div className="flex flex-col space-y-4 w-full">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center transition-all hover:bg-teal-50 hover:shadow-lg">
              <span className="text-gray-700 font-medium">Windows</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleDownloadClick}
                  className="bg-teal-600 text-white px-6 py-2 rounded-md shadow hover:bg-teal-700 transition duration-200"
                >
                  {isDownloading ? (
                    <span>Baixando...</span>
                  ) : (
                    <span>Baixar</span>
                  )}
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-teal-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l-3-3m3 3l3-3" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center transition-all hover:bg-teal-50 hover:shadow-lg">
              <span className="text-gray-700 font-medium">Mac</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleDownloadClick}
                  className="bg-cyan-600 text-white px-6 py-2 rounded-md shadow hover:bg-cyan-700 transition duration-200"
                >
                  {isDownloading ? (
                    <span>Baixando...</span>
                  ) : (
                    <span>Baixar</span>
                  )}
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-cyan-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l-3-3m3 3l3-3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Aviso de instalação */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="mb-4">
              Se você receber algum aviso na hora de instalar, isso é porque nosso app ainda não foi instalado por muitas pessoas, mas pode confiar na gente!
            </p>
          </div>

          {/* Links de Política de Privacidade e Termos de Uso */}
          <div className="flex justify-center space-x-6 mt-6">
            <a 
              href="/politica-de-privacidade" 
              className="text-teal-600 hover:underline text-sm"
            >
              Política de Privacidade
            </a>
            <a 
              href="/termos-de-uso" 
              className="text-teal-600 hover:underline text-sm"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>

      {/* Modal de carregamento */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-10 max-w-xs w-full flex flex-col items-center justify-center">
            <div className="spinner-border animate-spin border-t-4 border-teal-600 border-solid w-16 h-16 rounded-full mb-4"></div>
            <p className="text-gray-800 font-semibold">Carregando...</p>
          </div>
        </div>
      )}

      {/* Modal gigante com as versões */}
      {isModalOpen && !isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-10 max-w-2xl w-full shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Versões Disponíveis
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-700 font-medium">grupofacil-release-v1.0.0</span>
                <button className="bg-teal-600 text-white px-6 py-2 rounded-md shadow hover:bg-teal-700 transition duration-200">
                  Instalar
                </button>
              </div>
            </div>

            <p className="mt-4 text-gray-600 text-center">Mais atualizações virão em breve.</p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCloseModal}
                className="bg-teal-600 text-white px-6 py-2 rounded-md shadow hover:bg-teal-700 transition duration-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Download;