const Services = () => {
    return (
      <div id="servicos" className="py-20 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold text-white mb-6">Aqui estão alguns exemplos do que somos capazes!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="card bg-black text-white p-6 rounded-lg shadow-xl hover:bg-gray-700 transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Consultoria</h3>
            <p className="text-gray-400">Oferecemos soluções estratégicas para melhorar a performance da sua sala de aula.</p>
          </div>
          <div className="card bg-black text-white p-6 rounded-lg shadow-xl hover:bg-gray-700 transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Serviços de IA</h3>
            <p className="text-gray-400">Implementamos serviços de Inteligência Artificial para facilitar a vida de quem usa isso.</p>
          </div>
          <div className="card bg-black text-white p-6 rounded-lg shadow-xl hover:bg-gray-700 transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Conclusão</h3>
            <p className="text-gray-400">Temos tudo oque você precisa, somos um sistema de gestão educacional super avançado!</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Services;  