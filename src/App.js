import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import LoginCadastro from './pages/login_cadastro';
import Pesquisa from './pages/pesquisa';
import Grafico from './pages/graficos';

import firebase from "./firebase/firebase";

import {CircularProgress} from '@material-ui/core';

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = React.useState(false);

  React.useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })

 const PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (!firebase.auth.currentUser) {
        return <Redirect to="/" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  return firebaseInitialized !== false ? (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginCadastro}/>
        <PrivateRoute exact path='/pesquisa' component={Pesquisa}/>
        <PrivateRoute exact path='/grafico' component={Grafico}/>
      </Switch>
    </BrowserRouter>
  ) : <div id='loader'><CircularProgress/></div>
}

export default App;
