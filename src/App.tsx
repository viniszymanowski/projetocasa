import { Route, Switch } from "wouter";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Persona from "./pages/Persona";
import Preferencias from "./pages/Preferencias";
import Terreno from "./pages/Terreno";
import Arquitetura from "./pages/Arquitetura";
import Layout from "./pages/Layout";
import Normas from "./pages/Normas";
import Galeria from "./pages/Galeria";
import Questionario from "./pages/Questionario";
import MeuProjeto from "./pages/MeuProjeto";
import Moodboard from "./pages/Moodboard";
import Contrato from "./pages/Contrato";
import Financeiro from "./pages/Financeiro";
import Fornecedores from "./pages/Fornecedores";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', flex: 1 }}>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/persona" component={Persona} />
          <Route path="/preferencias" component={Preferencias} />
          <Route path="/terreno" component={Terreno} />
          <Route path="/arquitetura" component={Arquitetura} />
          <Route path="/layout" component={Layout} />
          <Route path="/normas" component={Normas} />
          <Route path="/galeria" component={Galeria} />
          <Route path="/questionario" component={Questionario} />
          <Route path="/meu-projeto" component={MeuProjeto} />
          <Route path="/moodboard" component={Moodboard} />
          <Route path="/contrato" component={Contrato} />
          <Route path="/financeiro" component={Financeiro} />
          <Route path="/fornecedores" component={Fornecedores} />
          <Route path="/configuracoes" component={Configuracoes} />
          <Route>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>404 - Página não encontrada</h1>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
