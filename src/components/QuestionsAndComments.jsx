import { useState } from "react";

const QuestionsAndComments = () => {
  const [comment, setComment] = useState(""); // Estado para o comentário
//   const [setShowNotification] = useState(false); // Exibição da notificação

  // Função para atualizar o comentário
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Função para enviar o comentário (simulando o envio)
//   const handleSubmit = () => {
//     if (comment.trim()) {
//       setShowNotification(true); // Exibe notificação de sucesso
//       console.log("Comentário enviado:", comment); // Aqui você pode enviar o comentário para a API, por exemplo
//       setComment(""); // Reseta o comentário após o envio
//       document.getElementById("my_modal_4").close(); // Fecha o modal
//     } else {
//       alert("Por favor, insira um comentário antes de enviar.");
//     }
//   };

  return (
    <section className="bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-white mb-8">Perguntas e Comentários</h2>

        {/* Área do comentário */}
        <div className="bg-gray-700 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
            placeholder="Digite seu comentário ou pergunta..."
            value={comment}
            onChange={handleCommentChange}
            rows={4}
            style={{
              minHeight: "100px",
              backgroundColor: "#ffffff",
            }}
            onInput={(e) => {
              e.target.style.height = "auto"; // Resetando a altura
              e.target.style.height = `${e.target.scrollHeight}px`; // Ajustando para o tamanho do conteúdo
            }}
          />

          {/* Botão de Enviar Comentário */}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full transition duration-300">
            Enviar Comentário
          </button>

        </div>
      </div>
    </section>
  );
};

export default QuestionsAndComments;
