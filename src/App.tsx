import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Arquitetura from "./pages/Arquitetura";
import Persona from "./pages/Persona";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/layout" component={Layout} />
      <Route path="/arquitetura" component={Arquitetura} />
      <Route path="/persona" component={Persona} />
      <Route>
        <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
          <h1>404 - Página não encontrada</h1>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
