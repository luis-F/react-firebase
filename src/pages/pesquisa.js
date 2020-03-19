import React from 'react';

import Header from '../components/header_component';

import firebase from '../firebase/firebase';

import RadioButtonsGroup from '../components/formRadio_component';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    paddingTop: '1%',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#bfbcbb',
    maxWidth: '76%',
    marginLeft: '10%'
  },
}));

export const ResultContext = React.createContext([]);

function Pesquisa(props){
  const classes = useStyles();
  const [valueContext, setValueContext] = React.useState({});
  let valida_questoes = Object.keys(valueContext).length
  const pagina = "Pesquisa";

  if(!firebase.auth.currentUser){
    alert('É necessário estar logado no sistema');
    props.history.push('/')
  }

  const SetResultadoContext = (param, id) => {
     setValueContext({...valueContext, [id]: param});
   }

  return (
    <div>
      <React.Fragment>
       <Header pagina={pagina}/>
      </React.Fragment>
      <ResultContext.Provider value={{valueContext, onChangeContext: SetResultadoContext}}>
      <Card
        className={classes.card}>
        <Paper>
          <Funcionarios/>
        </Paper>
      </Card>
      <Card className={classes.card}>
        <Paper>
          <Equipe/>
        </Paper>
      </Card>
      <Card className={classes.card}>
        <Paper>
          <Satisfacao/>
        </Paper>
      </Card>
      <Card className={classes.card}>
        <Paper>
          <Avaliacao validacao={valida_questoes} resultado={valueContext} props={props}/>
        </Paper>
      </Card>
      </ResultContext.Provider>
    </div>
  )
}

function Funcionarios(){
  const pergunta = "Quantos funcionários tem a sua empresa?";
  const aria_label_radioGroup = "funcionarios";
  const nome = "questao1_funcionarios";
  const labels_array = [
    "1 até 50",
    "51 até 100",
    "101 até 200",
    "201 até 500",
    "mais de 500"
  ];
  const values_array = ["1-50","51-100","101-200","201-500","+500"]

  return (
    <RadioButtonsGroup pergunta={pergunta}
      aria_label_radioGroup={aria_label_radioGroup}
      name={nome}
      labels_array={labels_array}
      values_array={values_array}
    />
  )
}

function Equipe(){
  const pergunta = "Quantas pessoas tem a sua esquipe?";
  const aria_label_radioGroup = "equippe";
  const nome = "questao2_equipe";
  const labels_array = ["1 até 3", "4 até 6", "7 até 9", "mais de 10"];
  const values_array = ["1-3", "4-6", "7-9", "+10"];

  return (
    <RadioButtonsGroup pergunta={pergunta}
      aria_label_radioGroup={aria_label_radioGroup}
      name={nome}
      labels_array={labels_array}
      values_array={values_array}
    />
  )
}

function Satisfacao(){
  const pergunta = "Qual a sua satisfação com a empresa? (1 para pouco satisfeito e 10 para muito satisfeito)";
  const aria_label_radioGroup = "satisfacao";
  const nome = "questao3_satisfacao";
  const labels_array = ["1", "2", "3","4","5","6","7","8","9","10"];
  const values_array = labels_array;

  return (
    <RadioButtonsGroup pergunta={pergunta}
      aria_label_radioGroup={aria_label_radioGroup}
      name={nome}
      labels_array={labels_array}
      values_array={values_array}
      position={true}
    />
  )
}

function Avaliacao({validacao, resultado, props}){
  const pergunta = "Como você avalia o seu chefe?";
  const aria_label_radioGroup = "avaliacao";
  const nome = "questao4_avaliacao";
  const labels_array = ["Excelente", "Muito bom", "Bom", "Regular", "Ruim", "Muito ruim", "Pessimo"];
  const values_array = labels_array;
  const validado = validacao === 4 ? true : false;

  return (
      <RadioButtonsGroup pergunta={pergunta}
        aria_label_radioGroup={aria_label_radioGroup}
        name={nome}
        labels_array={labels_array}
        values_array={values_array}
        position={true}
        finaliza={true}
        validado={validado}
        resultado={resultado}
        props={props}
      />
  )
}

export default Pesquisa;
