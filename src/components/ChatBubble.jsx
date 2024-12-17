
const Bubbles = ({ senderText, receiverText }) => {
  return (
    <div>
      {senderText && (
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-400 text-gray-900">
            {senderText}
          </div>
        </div>
      )}

      {receiverText && (
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-700 text-gray-200">
            {receiverText}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bubbles;