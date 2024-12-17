import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "./styles/PainelUsuario.css";

const PainelUsuario = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeModal, setActiveModal] = useState(""); // Controla o modal ativo
  const [profileColor, setProfileColor] = useState("");

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const userName = user?.name || "Usuário Teste";
  const userPhoto = user?.photoUrl;

  useEffect(() => {
    if (!userPhoto) {
      setProfileColor(generateRandomColor());
    }
  }, [userPhoto]);

  const closeModal = () => setActiveModal("");

  return (
    <div className="painel-usuario">
      {/* Foto de perfil */}
      <div
        className="foto-perfil"
        style={{
          backgroundColor: userPhoto ? "transparent" : profileColor,
        }}
      >
        {userPhoto ? (
          <img
            src={userPhoto}
            alt="Foto de Perfil"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{userName && userName[0]}</span>
        )}
      </div>

      {/* Nome do usuário */}
      <div className="nome-usuario">{userName}</div>

      {/* Menu hamburguer */}
      <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <FaBars />
      </div>

      {/* Menu suspenso */}
      {showMenu && (
        <div className="menu-dropdown">
          <div className="menu-item" onClick={() => setActiveModal("perfil")}>
            Perfil
          </div>
          <div className="menu-item" onClick={() => setActiveModal("config")}>
            Configurações
          </div>
          <div className="menu-item" onClick={() => setActiveModal("ajuda")}>
            Ajuda
          </div>
        </div>
      )}

      {/* Modais */}
      {activeModal && (
        <div className={`painel-modal painel-modal-open`}>
          <div className="painel-modal-box">
            {/* Conteúdo do Modal */}
            {activeModal === "perfil" && (
              <>
                <h3 className="font-bold text-lg">Perfil do Usuário</h3>
                <p className="py-4">
                  Nome: <strong>{userName}</strong>
                </p>
                <p>
                  Email:{" "}
                  <strong>{user?.email || "usuarioteste@email.com"}</strong>
                </p>
                <p>
                  Foto de Perfil:{" "}
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt="Foto de Perfil"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <span>Não disponível</span>
                  )}
                </p>
              </>
            )}

            {activeModal === "config" && (
              <>
                <h3 className="font-bold text-lg">Configurações</h3>
                <p className="py-4">
                  Personalize suas preferências e gerencie sua conta aqui.
                </p>
                <div>
                  <label className="label">
                    <span className="label-text">Notificações</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </label>
                  <label className="label">
                    <span className="label-text">Modo Escuro</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-secondary"
                    />
                  </label>
                </div>
              </>
            )}

            {activeModal === "ajuda" && (
              <>
                <h3 className="font-bold text-lg">Ajuda</h3>
                <p className="py-4">
                  Precisa de assistência? Entre em contato com nosso suporte ou
                  leia os tutoriais disponíveis.
                </p>
                <ul className="list-disc list-inside">
                  <li>
                    <a href="#" className="link link-primary">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link link-primary">
                      Contato
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link link-primary">
                      Tutoriais
                    </a>
                  </li>
                </ul>
              </>
            )}

            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelUsuario;