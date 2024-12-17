import { useState, useEffect } from 'react';
import axios from 'axios';
import ForgotPassword from './components/ForgotPasssword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  // Login social
  const handleGoogleLogin = () => {
    console.log('Login com Google iniciado');
  };

  const handleFacebookLogin = () => {
    console.log('Login com Facebook iniciado');
  };

  const handleMicrosoftLogin = () => {
    console.log('Login com Microsoft iniciado');
  };

  // Validação de email
  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const HandleLogin = async (e) => {
    e.preventDefault();
    setError({ email: '', password: '' });

    let errorsInForm = false;

    if (!email) {
      setError((prev) => ({ ...prev, email: "Por favor insira um e-mail válido!"}));
      errorsInForm = true;
    }

    if (password.length < 4) {
      setError((prev) => ({ ...prev, password: "A senha precisa ter no mínimo 4 caractéres!"}));
      errorsInForm = true;
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: "Por favor insira uma senha!" }));
    }

    if (errorsInForm) {
      setShowAlert(true);
    }
    else {
      try {
        const response = await axios.post("http://localhost:5501/api/login", {
          email_or_username: email || username,
          password: password,
        });

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/dashboard";
        }
      }
      catch (err) {
        console.error(err)
        setError({ email: 'Erro ao fazer login, tente novamente.'})
      }
    }
  }

  // const closeAlert = () => {
  //   setShowAlert(false);
  // };

  useEffect(() => {
    if (error.email || error.password) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /*
  const car = {
    name: "Ferrari F80",
    price: 
  };
  */

  // const inputBorderClass = (field) => {
  //   if (error[field]) {
  //     return 'border-red-500';
  //   } else if (field === 'email' && email.length > 0) {
  //     return 'border-yellow-400';
  //   } else if (field === 'password' && password.length > 0) {
  //     return 'border-yellow-400';
  //   }
  //   return 'border-gray-300';
  // };

  const inputBorderClasses = {
    email: (email) => (email && email.length > 0 ? 'border-yellow-400' : 'border-gray-300'),
    password: (password) => (password && password.length > 0 ? 'border-yellow-400' : 'border-gray-300'),
    default: () => 'border-gray-300',
  };
  
  const getInputBorderClass = (field, email, password, error) => {
    // Verifica se existe um erro para o campo e retorna a classe de erro, caso exista.
    if (error && error[field]) {
      return 'border-red-500';
    }
  
    // Verifica se o campo é 'email' ou 'password' e aplica a classe correspondente
    if (inputBorderClasses[field]) {
      if (field === 'email') {
        return inputBorderClasses.email(email);
      } else if (field === 'password') {
        return inputBorderClasses.password(password);
      }
    }
    
    // Se o campo não for 'email' ou 'password', retorna a classe default
    return inputBorderClasses.default();
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-gray-800 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(/src/pages/login/assets/fundo.jpg)' }}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <div
          className={`w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg space-y-6 flex flex-col justify-center mt-12 transition-all duration-1000 ${
            isLoaded ? 'fade-in-up' : ''
          }`}
        >
          <h2 className="text-3xl font-semibold text-center text-gray-900">Faça login na sua conta</h2>

          <form>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email ou nome de usuário
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value) || setUsername(e.target.value)}
                className={`w-full mt-2 p-3 ${getInputBorderClass('email')} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Digite seu e-mail"
              />
              {error.email && <p className="text-red-500 text-sm mt-2">{error.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mt-2 p-3 ${getInputBorderClass('password')} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Digite sua senha"
              />
              {error.password && <p className="text-red-500 text-sm mt-2">{error.password}</p>}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-blue-500" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Lembrar-me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-700"
                onClick={() => setShowForgotPassword(true)}
              >
                Esqueceu a senha?
              </button>
            </div>
            <button
              type="button"
              className="w-full mt-6 py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              onClick={HandleLogin}
            >
              Entrar
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Não tem uma conta? </span>
            <a href="/registrar" className="text-sm text-blue-500 hover:text-blue-700">
              Crie uma agora
            </a>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-center">
              <button
                onClick={handleGoogleLogin}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
              >
                <img src="/src/pages/Login/assets/logo-google.png" alt="Google" className="w-5 h-5 inline-block mr-3" />
                Login com Google
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleFacebookLogin}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
              >
                <img src="/src/pages/Login/assets/logo-facebook.png" alt="Facebook" className="w-5 h-5 inline-block mr-3" />
                Login com Facebook
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleMicrosoftLogin}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
              >
                <img src="/src/pages/Login/assets/logo-microsoft.png" alt="Microsoft" className="w-5 h-5 inline-block mr-3" />
                Login com Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
};

export default Login;