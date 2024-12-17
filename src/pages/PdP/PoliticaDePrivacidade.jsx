import React from 'react';

const PoliticaDePrivacidade = () => {
  return (
    <div className="bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl max-w-2xl w-full p-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Política de Privacidade</h1>

        <p className="text-lg text-gray-600 mb-4">
          No Grupo Fácil, sua privacidade é nossa prioridade. Coletamos informações como nome e e-mail apenas para fornecer nossos serviços de forma eficiente. Seus dados são usados exclusivamente para melhorar sua experiência e não são compartilhados com terceiros sem seu consentimento.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Implementamos medidas de segurança para proteger suas informações, mas nenhum sistema é 100% seguro. Se tiver dúvidas, entre em contato conosco pelo e-mail <a href="mailto:support@grupofacil.com" className="text-teal-600">support@grupofacil.com</a>.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Podemos atualizar esta política periodicamente, e as alterações serão publicadas nesta página. Recomendamos que você verifique regularmente.
        </p>
      </div>
    </div>
  );
};

export default PoliticaDePrivacidade;