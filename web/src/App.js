import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

/* Paginas */
import Login from "./view/login/login";
import Home from "./view/home";
import RecuperarSenha from "./view/recuperar-senha/";
import Clientes from "./view/clientes";
import Usuarios from "./view/usuarios";

import AlterarSenha from "./view/alterar-Senha";
import ListaProdutos from "./components/listaProdutos";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/minha-conta" component={AlterarSenha}/>
          <Route exact path="/teste" component={ListaProdutos}/>

        </Switch>
    </Router>
  );
}

export default App;
