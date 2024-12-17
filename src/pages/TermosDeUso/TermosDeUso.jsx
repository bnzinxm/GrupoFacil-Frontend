import React from 'react';

const TermosDeUso = () => {
  return (
    <div className="bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl max-w-2xl w-full p-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Termos de Uso</h1>

        <p className="text-lg text-gray-600 mb-4">
          Ao usar o Grupo Fácil, você concorda com nossos Termos de Uso. Estamos comprometidos em oferecer uma plataforma segura e eficiente, mas você é responsável por usar o serviço de maneira legal e ética.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Não somos responsáveis por danos resultantes do uso da plataforma e, ao utilizar nossos serviços, você concorda que não poderá processar o Grupo Fácil por qualquer motivo.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Podemos atualizar esses Termos de Uso a qualquer momento. Fique atento às mudanças publicadas aqui. Se tiver dúvidas, entre em contato pelo e-mail <a href="mailto:support@grupofacil.com" className="text-teal-600">support@grupofacil.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermosDeUso;