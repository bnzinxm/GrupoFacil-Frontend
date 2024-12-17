import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Professor A', content: 'Oi, como você está?' },
    { sender: 'Você', content: 'Tudo ótimo, e você?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newConversation, setNewConversation] = useState('');
  const [conversations, setConversations] = useState([
    { id: 1, name: 'Professor A', initials: 'A', color: 'bg-blue-600' },
    { id: 2, name: 'Professor B', initials: 'B', color: 'bg-gray-600' },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Você', content: newMessage }]);
      setNewMessage('');
    }
  };

  const handleNewConversation = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewConversation('');
  };

  const handleCreateConversation = () => {
    if (newConversation.trim()) {
      const newId = conversations.length + 1;
      setConversations([
        ...conversations,
        {
          id: newId,
          name: newConversation,
          initials: newConversation.charAt(0).toUpperCase(),
          color: 'bg-green-600',
        },
      ]);
      handleCloseModal();
    }
  };

  const ConversationItem = ({ name, initials, color }) => (
    <div className="flex items-center space-x-3 hover:bg-green-100 rounded-xl p-3 cursor-pointer transition-all">
      <div
        className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center font-semibold`}
      >
        {initials}
      </div>
      <span className="text-lg font-medium">{name}</span>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-white text-green-600 p-6 space-y-4 shadow-lg rounded-xl">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold flex justify-center items-center">
            P
          </div>
          <span className="text-2xl font-semibold tracking-wide">Professores</span>
        </div>

        <div className="mt-6 space-y-2">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              name={conversation.name}
              initials={conversation.initials}
              color={conversation.color}
            />
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 relative">
        {/* Header */}
        <header className="bg-white text-green-600 p-4 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              P
            </div>
            <h1 className="text-xl font-semibold tracking-wide">Grupo dos Professores</h1>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Opções
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 space-y-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'Você' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-4 max-w-xs rounded-xl text-white shadow-lg ${
                    message.sender === 'Você' ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                >
                  <p className="font-semibold text-sm">{message.sender}</p>
                  <p className="text-lg">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center space-x-4 p-4 bg-white border-t border-gray-300 rounded-lg shadow-lg">
            <input
              type="text"
              className="flex-1 p-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <button
              onClick={handleSendMessage}
              className="p-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
            >
              📨
            </button>
          </div>
        </div>

        {/* Floating Button */}
        <button
          onClick={handleNewConversation}
          className="fixed bottom-6 right-6 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all"
        >
          ➕
        </button>
      </div>

      {/* Modal - Nova Conversa */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Nova Conversa</h2>
            <input
              type="text"
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Digite o nome do professor..."
              value={newConversation}
              onChange={(e) => setNewConversation(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="w-32 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateConversation}
                className="w-32 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;