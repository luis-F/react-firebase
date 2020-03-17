import React from 'react';

import RadioButtonsGroup from '../components/formRadio_component';
import firebase from '../firebase/firebase';
import Header from '../components/header_component';

function Pesquisa(props){
  if(!firebase.auth.currentUser){
    alert('É necessário estar logado no sistema');
    props.history.push('/')
  }
  return (
    <div>
      <React.Fragment>
       <Header props={props}/>
      </React.Fragment>
      <Funcionarios/>
    </div>
  )
}

function Funcionarios(){
  const pergunta = "Quantos funcionário tem a sua empresa";
  const aria_label_radioGroup = "funcionarios";
  const nome = "questao1_funcionarios";
  const num_itens = 5;
  const labels_array = [
    "1 até 50",
    "51 até 100",
    "101 até 200",
    "201 até 500",
    "mais de 500"
  ];
  const values_array = ["<50","<100","<200","<500","+500"]
  return (
    <RadioButtonsGroup pergunta={pergunta}
      aria_label_radioGroup={aria_label_radioGroup}
      name={nome}
      num_itens={num_itens}
      labels_array={labels_array}
      values_array={values_array}
    />
  )
}

export default Pesquisa;
