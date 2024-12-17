import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'; // Importando o Header
import Login from './pages/Login/Login'; // Importando a página de login
import Register from './pages/Register/Register';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import QuestionsAndComments from './components/QuestionsAndComments';
import Dashboard from './pages/Dashboard/Dashboard'; // Importando a página do Dashboard
import Error from './pages/Error/Error'; // Importando a página de erro
import Planos from './pages/Planos/Planos';
import ChatWidget from './components/ChatWidget'; // Importando o componente de Chat
import Download from './pages/Download/Download'; // Importando a página de download
import PoliticaDePrivacidade from './pages/PdP/PoliticaDePrivacidade'; // Importando a página de PdP
import TermosDeUso from './pages/TermosDeUso/TermosDeUso'; // Importando a página de termos de uso
import Chat from './pages/Chat/Chat'; // Importar a página de chat

const App = () => {
  const location = useLocation(); // Pega a rota atual

  return (
    <>
      {/* O Header será exibido em todas as páginas, exceto no Dashboard */}
      {location.pathname !== '/dashboard' && <Header />}

      <Routes>
        {/* Página inicial ou Landing Page */}
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <About />
              <Services />
              <QuestionsAndComments />
              <Footer />
            </div>
          }
        />

        {/* Página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Página de Registro */}
        <Route path="/registrar" element={<Register />} />

        {/* Página de Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Página de Assinaturas */}
        <Route path="/planos" element={<Planos />} />

        {/* Página de Download*/}
        <Route path="/download" element={<Download />}/>

        {/* Página de Política de Privacidade*/}
        <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />}/>

        {/* Página de Termos de Uso*/}
        <Route path="/termos-de-uso" element={<TermosDeUso />}/>

        {/* Página de Chat com comunidade */}
        <Route path="/chat" element={<Chat />}/>

        {/* Página de erro para rotas inexistentes */}
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Exibe o botão de chat apenas na rota /dashboard */}
      {location.pathname === '/dashboard' && <ChatWidget />}
    </>
  );
};

export default App;