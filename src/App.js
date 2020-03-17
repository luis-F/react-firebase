import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

import LoginCadastro from './pages/login_cadastro';
import Pesquisa from './pages/pesquisa';
import Grafico from './pages/graficos';
import firebase from "./firebase/firebase";

import {CircularProgress} from '@material-ui/core';
//https://www.youtube.com/watch?v=K_wZCW6wXIo -> ajuda

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = React.useState(false);

  React.useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })

  return firebaseInitialized !== false ? (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginCadastro}/>
        <Route exact path='/pesquisa' component={Pesquisa}/>
        <Route exact path='/grafico' component={Grafico}/>
      </Switch>
    </BrowserRouter>
  ) : <div id='loader'><CircularProgress/></div>
}

export default App;
