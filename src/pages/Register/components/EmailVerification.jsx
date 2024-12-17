import React, { useState } from "react";

const EmailVerification = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  const handleResendEmail = () => {
    // Aqui chamaremos o backend para reenviar o e-mail
    console.log("Reenviando e-mail...");
  };

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal modal-open">
            <div className="modal-box max-w-lg">
              <h2 className="text-2xl font-bold text-center text-primary">
                Verificação de E-mail
              </h2>
              <p className="py-4 text-center text-gray-600">
                Por favor, verifique seu e-mail para continuar. Se não encontrar
                o e-mail, confira sua caixa de spam ou reenvie a verificação.
              </p>
              <div className="modal-action justify-center">
                <button
                  className="btn btn-primary"
                  onClick={handleResendEmail}
                >
                  Reenviar E-mail
                </button>
                <button
                  className="btn btn-outline"
                  onClick={handleClose}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;