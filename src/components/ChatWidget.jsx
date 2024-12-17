import { useState } from "react";
import Bubbles from "./ChatBubble";  // Componente de bolhas de chat
import axios from "axios"; // Para enviar mensagens para o backend

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");  // Armazena a mensagem
  const [messages, setMessages] = useState([]); // Armazena a lista de mensagens
  const [isLoading, setIsLoading] = useState(false); // Controla o estado de carregamento

  // Função para enviar mensagem para o backend
  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: message }]);
      setMessage(""); // Limpa o campo de input

      setIsLoading(true); // Inicia o carregamento da resposta da IA

      try {
        const response = await axios.post("http://localhost:5501/api/chat", {
          message: message,
        });

        if (response.data && response.data.reply) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "receiver", text: response.data.reply },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "receiver", text: "Desculpe, não consegui entender sua solicitação." },
          ]);
        }
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "receiver", text: "Desculpe, ocorreu um erro. Tente novamente mais tarde." },
        ]);
      }

      setIsLoading(false); // Finaliza o carregamento
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão de abrir chat */}
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
              <h2 className="text-sm font-semibold text-gray-200">Chat de Suporte</h2>

              {/* Botão "Mais..." para abrir o modal gigante */}
              <button
                className="text-gray-400 hover:text-gray-300"
              >
                Saiba Mais...
              </button>

              {/* Botão de fechar o chat */}
              <button
                className="text-gray-400 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Área de mensagens com chatbubbles */}
            <div className="mt-4 space-y-2 h-64 overflow-y-auto">
              {/* Adiciona a primeira mensagem de boas-vindas */}
              <Bubbles receiverText="Olá, sou o Fácil AI! Como posso te ajudar?" />
              
              {/* Exibe as mensagens trocadas */}
              {messages.map((message, index) => (
                <Bubbles
                  key={index}
                  senderText={message.sender === "user" ? message.text : ""}
                  receiverText={message.sender !== "user" ? message.text : ""}
                />
              ))}

              {/* Exibe o carregamento enquanto a IA responde */}
              {isLoading && (
                <div className="chat chat-start">
                  <div className="chat-bubble bg-gray-700 text-gray-200">
                    <span className="loading loading-dots loading-xs"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Campo de entrada de texto e botão de envio */}
            <div className="mt-2 flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}  // Atualiza o texto conforme o usuário digita
                onKeyPress={handleKeyPress}  // Detecta o pressionamento da tecla Enter
                placeholder="Digite sua mensagem..."
                className="input input-bordered w-full text-gray-900"
                disabled={isLoading} // Desabilita o campo de entrada enquanto a IA responde
              />
              <button
                onClick={sendMessage}  // Envia a mensagem ao clicar
                className="ml-2 text-blue-500"
                disabled={isLoading}  // Desabilita o botão enquanto a IA responde
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