import { useState } from "react";
import Bubbles from "./ChatBubble";  // Componente de chat bubbles
import axios from "axios"; // Para fazer as requisições à API do backend

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");  // Estado para armazenar a mensagem do usuário
  const [messages, setMessages] = useState([]); // Estado para armazenar todas as mensagens
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar a animação de carregamento

  // Função para enviar a mensagem
  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      // Adiciona a mensagem do usuário à lista de mensagens
      setMessages([...messages, { sender: "user", text: message }]);
      setMessage(""); // Limpa o campo de entrada após o envio

      // Inicia o carregamento
      setIsLoading(true);

      try {
        // Envia a mensagem do usuário para a API do backend
        const response = await axios.post("http://localhost:5501/api/chat", { message });

        // Após a resposta da API, adiciona a mensagem de resposta da IA
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "receiver", text: response.data.reply }, // Resposta da IA
        ]);
      } catch (error) {
        console.error("Erro ao se comunicar com a API", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "receiver", text: "Desculpe, ocorreu um erro ao processar sua mensagem." }
        ]);
      } finally {
        // Finaliza o carregamento
        setIsLoading(false);
      }
    }
  };

  // Função para enviar ao pressionar "Enter"
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão de Chat */}
      <button
        className={`w-14 h-14 bg-primary flex items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "var(--dashboard-bg-color, #1E293B)", // Cor do Dashboard
        }}
      >
        <img
          src="/src/assets/chat.png"
          alt="Chat Icon"
          className="w-6 h-6"
        />
      </button>

      {/* Caixa de Chat */}
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } origin-bottom-right`}
        style={{
          backgroundColor: "var(--dashboard-bg-color, #1E293B)", // Cor de fundo do Dashboard
          borderRadius: "12px",
        }}
      >
        {isOpen && (
          <div className="shadow-xl rounded-lg p-4 w-80 h-96">
            <div className="flex justify-between items-center border-b pb-2 border-gray-600">
              <h2 className="text-sm font-semibold text-gray-200">
                Chat de Suporte
              </h2>
              <button
                className="text-gray-400 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Área de mensagens com chatbubbles */}
            <div className="mt-4 space-y-2 h-64 overflow-y-auto">
              {/* Mensagem inicial de boas-vindas */}
              <Bubbles receiverText="Olá, sou o Fácil AI! Como posso te ajudar?" />
              {/* Mensagens do chat */}
              {messages.map((message, index) => (
                <Bubbles
                  key={index}
                  senderText={message.sender === "user" ? message.text : ""}
                  receiverText={message.sender !== "user" ? message.text : ""}
                />
              ))}

              {/* Animação de carregamento enquanto a IA processa a resposta */}
              {isLoading && (
                <div className="chat chat-start">
                  <div className="chat-bubble bg-gray-700 text-gray-200">
                    <span className="loading loading-dots loading-xs"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Campo de entrada de mensagem */}
            <div className="mt-2 flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}  // Atualiza o estado conforme o usuário digita
                onKeyPress={handleKeyPress}  // Detecta o pressionamento da tecla "Enter"
                placeholder="Digite sua mensagem..."
                className="input input-bordered w-full text-gray-900"
                disabled={isLoading} // Desabilita o campo de entrada enquanto está carregando
              />
              <button
                onClick={sendMessage}  // Envia a mensagem ao clicar no botão
                className="ml-2 text-blue-500"
                disabled={isLoading}  // Desabilita o botão de enviar enquanto está carregando
              >
                <img src="/src/assets/send.png" alt="Send" className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;