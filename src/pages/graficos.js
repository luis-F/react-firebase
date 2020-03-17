import React from 'react';
import firebase from '../firebase/firebase';
import Header from '../components/header_component';

function Grafico(props){
  if(!firebase.auth.currentUser){
    alert('É necessário estar logado no sistema');
    props.history.push('/')
  }
  return (
    <div>
      <React.Fragment>
       <Header props={props}/>
      </React.Fragment>
      <p>Pagina que vai ficar com o grafico...que nao faço ideia ainda de como que faz...</p>
    </div>
  )
}

export default Grafico;
