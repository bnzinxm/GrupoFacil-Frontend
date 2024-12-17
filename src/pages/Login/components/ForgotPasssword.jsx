import { useState } from 'react';
import { IoClose } from 'react-icons/io5'; // Importando o ícone de fechar do Ionicons

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [code, setCode] = useState(['', '', '', '']); // Array para armazenar os 4 dígitos
  const [sendingEmail, setSendingEmail] = useState(false); // Controla o envio do e-mail
  const [verificationStep, setVerificationStep] = useState(false); // Controla a troca de modais
  const [error, setError] = useState('');
  const [emailResent, setEmailResent] = useState(false); // Controla se o e-mail foi reenviado
  const [showResendLink, setShowResendLink] = useState(false); // Controla a visibilidade do link de reenvio
  const [resending, setResending] = useState(false); // Controla o estado de reenvio do código
  const [alertMessage, setAlertMessage] = useState(''); // Mensagem de alerta

  // Função de validação de e-mail
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Função para simular o envio do e-mail
  const sendEmail = () => {
    if (validateEmail(email)) {
      setEmailValid(true);
      setError('');
      setSendingEmail(true); // Começa o processo de envio

      setTimeout(() => {
        console.log('E-mail enviado com código de 4 dígitos');
        setSendingEmail(false); // Finaliza o envio
        setVerificationStep(true); // Troca para o modal de verificação de código
        setShowResendLink(true); // Exibe o link de reenvio após o envio do código
      }, 3000); // Simula um atraso de 3 segundos para enviar o e-mail
    } else {
      setEmailValid(false);
      setError('Por favor, insira um e-mail válido.');
    }
  };

  // Função para reenviar o código de validação
  const resendEmail = () => {
    setResending(true); // Inicia o reenvio
    setTimeout(() => {
      console.log('Código reenviado!');
      setResending(false); // Finaliza o reenvio
      setAlertMessage('O código foi reenviado com sucesso!'); // Define a mensagem de sucesso
      setEmailResent(true); // Indica que o código foi reenviado
    }, 3000); // Simula um atraso de 3 segundos para reenviar o e-mail
  };

  // Função para verificar o código de 4 dígitos
  const verifyCode = () => {
    const sentCode = '1234'; // Simulando o código enviado
    if (code.join('') === sentCode) {
      setError('');
      setTimeout(() => {
        alert('Código verificado com sucesso!');
        // Aqui você pode redirecionar o usuário ou fechar o modal.
      }, 1000);
    } else {
      setError('Código inválido. Tente novamente.');
    }
  };

  // Função para lidar com a mudança de valor nos inputs
  const handleCodeChange = (e, index) => {
    const value = e.target.value;

    // Garantir que só números sejam digitados
    if (/[^0-9]/.test(value)) return;

    // Atualizar o código
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Se o valor for um número e não for o último campo, vai para o próximo campo
    if (value && index < 3) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  // Função para lidar com o backspace
  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !code[index]) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  // Função para lidar com o paste (colar texto longo e cortar cada letra)
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').split('');
    if (paste.length === 4) {
      setCode(paste);
    } else {
      // Se o código copiado for maior que 4 caracteres, só cola os primeiros 4
      const newCode = [...paste.slice(0, 4)];
      setCode(newCode);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg relative">
        {/* Fechar Modal com ícone */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        <h2 className={`text-center text-2xl font-semibold mb-4 ${sendingEmail || verificationStep ? 'hidden' : ''}`}>Esqueci a Senha</h2>

        {/* Etapa de envio de e-mail */}
        {!verificationStep ? (
          <>
            <div className={`mb-4 ${sendingEmail || verificationStep ? 'hidden' : ''}`}>
              <label htmlFor="email" className="block text-sm font-medium">Digite seu e-mail:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="exemplo@dominio.com"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {sendingEmail && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">Por favor, aguarde enquanto validamos seu e-mail...</p>
              </>
            )}

            {!sendingEmail && (
              <button
                onClick={sendEmail}
                className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Enviar código
              </button>
            )}
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-semibold mb-4">Digite o Código de 4 Dígitos</h2>
            <div className="flex justify-center gap-2 mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-input-${index}`}
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  onPaste={handlePaste}  // Adicionando o suporte ao paste
                  maxLength={1}
                  className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="-"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={verifyCode}
              className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Verificar Código
            </button>

            {showResendLink && !resending && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Não recebeu um código?</p>
                <button
                  onClick={resendEmail}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Clique aqui para re-enviar!
                </button>
              </div>
            )}

            {resending && (
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}

            {emailResent && (
              <div id="sucess" className="alert alert-success mt-4">
                <div className="flex">
                  <span>O código foi reenviado com sucesso!</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;