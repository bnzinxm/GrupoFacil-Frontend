const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="hero h-screen flex items-center justify-center bg-gradient-to-r from-black to-blue-400 text-white text-center px-6"
      >
        {/* Conteúdo centralizado */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-300">
            Transforme sua sala com a Grupo Fácil
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Aqui você encontra soluções simples e objetivas para seus problemas em sala de aula!
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full transition duration-300 transform hover:scale-110">
            Saiba Mais
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;