import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Função para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isOnlyNumbers = (name) => /^\d+$/.test(name); // Verifica se o nome contém apenas números

  const createAccount = async (userData) => {
     try {
         const response = await fetch('http://localhost:5501/api/register', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(userData),
         });

         if (!response.ok) {
             const errorData = await response.json();
             throw new Error(errorData.message || 'Erro desconhecido no servidor');
         }

         const data = await response.json();
         console.log('Sucesso:', data);
         alert("Conta criada com sucesso!");
     } catch (error) {
         console.error('Erro:', error.message);
         alert(`Erro: ${error.message}`);
     }
   };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o envio do formulário para validação manual
    setError({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setSuccessMessage('');

    let formHasErrors = false;

    // Validação de nome
    if (!name) {
      setError((prev) => ({ ...prev, name: 'Nome é obrigatório!' }));
      formHasErrors = true;
    } else if (isOnlyNumbers(name)) {
      setError((prev) => ({ ...prev, name: 'Nome não pode ser apenas números!' }));
      formHasErrors = true;
    }

    // Validação de email
    if (!email || !validateEmail(email)) {
      setError((prev) => ({ ...prev, email: 'Por favor, insira um e-mail válido!' }));
      formHasErrors = true;
    }

    // Validação de senha
    if (password.length < 4) {
      setError((prev) => ({ ...prev, password: 'A senha deve ter pelo menos 4 caracteres!' }));
      formHasErrors = true;
    }

    // Validação de confirmação de senha
    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: 'As senhas não coincidem!' }));
      formHasErrors = true;
    }

    if (!formHasErrors) {
      const userData = {
        username: name,
        email: email,
        password: password,
      };
      
      createAccount(userData);
    }
  };

  const inputBorderClass = (field) => {
    if (error[field]) {
      return 'border-red-500'; // Borda vermelha quando há erro
    }
    return 'border-gray-300'; // Borda padrão se não houver erro
  };

  return (
    <div className="min-h-screen bg-gray-800 bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-lg space-y-6 flex flex-col justify-center mt-12">
          <h2 className="text-3xl font-semibold text-center text-gray-900">Crie sua conta</h2>

          {successMessage && (
            <div className="text-center text-green-600 bg-green-100 p-4 rounded-lg">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full mt-2 p-3 ${inputBorderClass('name')} rounded-lg shadow-sm`}
                placeholder="Digite seu nome"
              />
              {error.name && <p className="text-red-500 text-sm mt-2">{error.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-2 p-3 ${inputBorderClass('email')} rounded-lg shadow-sm`}
                placeholder="Digite seu e-mail"
              />
              {error.email && <p className="text-red-500 text-sm mt-2">{error.email}</p>}
            </div>

            <div className="flex space-x-4">
              {/* Senha */}
              <div className="w-1/2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full mt-2 p-3 ${inputBorderClass('password')} rounded-lg shadow-sm`}
                  placeholder="Digite sua senha"
                />
                {error.password && <p className="text-red-500 text-sm mt-2">{error.password}</p>}
              </div>

              {/* Confirmar Senha */}
              <div className="w-1/2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full mt-2 p-3 ${inputBorderClass('confirmPassword')} rounded-lg shadow-sm`}
                  placeholder="Confirme sua senha"
                />
                {error.confirmPassword && <p className="text-red-500 text-sm mt-2">{error.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Criar Conta
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Já tem uma conta? </span>
            <a href="/login" className="text-sm text-blue-500 hover:text-blue-700">
              Faça login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;