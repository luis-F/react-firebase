import React from 'react';

import Header from '../components/header_component';
import GraficoBarChart from '../components/barchart_component';
import GraficoPieChart from '../components/piechart_component';

import firebase from '../firebase/firebase';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#bfbcbb'
  },
  titlegraphic: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    color: '#878383'
  },
  box: {
    backgroundColor: '#f2f0f0',
    maxWidth: '85%',
    marginLeft: '7%'
  }
}));

//Não consigo entender muito bem como que funciona o Promise,
//então fiz essa gambiarra com o useEffect
function Grafico(props){
  const [value, setValue] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const classes = useStyles();
  let data_pesquisa = null;
  let pagina = "Resultados";

  React.useEffect(() => {
    firebase.db.collection("result_table")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      setTotal(querySnapshot.size);
      setValue(data);
    });
  }, [])

  if(value !== undefined){
    data_pesquisa = TratarDados(value, total);
  }

  if(!firebase.auth.currentUser){
    alert('É necessário estar logado no sistema');
    props.history.push('/')
  }
  return (
    <div className={classes.root}>
      <React.Fragment>
       <Header pagina={pagina}/>
      </React.Fragment>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.box}>
        <p className={classes.titlegraphic}>Quantidade de funcionários</p>
        <FuncionariosGrafico data={data_pesquisa['data_funcionarios']}/>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.box}>
        <p className={classes.titlegraphic}>Integrantes de equipe</p>
        <EquipeGrafico data={data_pesquisa['data_equipe']}/>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.box}>
        <p className={classes.titlegraphic}>Grau de satisfação</p>
        <SatisfacaoGrafico data={data_pesquisa['data_satisfacao']}/>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.box}>
        <p className={classes.titlegraphic}>Avaliação do chefe</p>
        <AvaliacaoGrafico data={data_pesquisa['data_avaliacao']}/>
        <p className={classes.titlegraphic}>Percentual das avaliações</p>
        <GraficoPieChart data={data_pesquisa['data_avaliacao']}/>
      </Box>
    </div>
  )
}

function FuncionariosGrafico({data}){
  const valueColor = "#8884d8"
  return(
    <GraficoBarChart data={data} valueColor={valueColor}/>
  )
}
function EquipeGrafico({data}){
  const valueColor = "#e61010"
  return(
    <GraficoBarChart data={data} valueColor={valueColor}/>
  )
}
function SatisfacaoGrafico({data}){
  const valueColor = "#0088FE"
  return(
    <GraficoBarChart data={data} valueColor={valueColor}/>
  )
}
function AvaliacaoGrafico({data}){
  const valueColor = "#13a608"
  return(
    <GraficoBarChart data={data} valueColor={valueColor}/>
  )
}

function TratarDados(value, total){
  let result = {"1-50": 0,"51-100": 0,"101-200": 0,"201-500": 0,"+500": 0};
  let result2 ={"1-3": 0, "4-6": 0, "7-9": 0, "+10": 0}
  let result3 ={"1": 0, "2": 0, "3": 0,"4": 0,"5": 0,"6": 0,"7": 0,"8": 0,"9": 0,"10": 0}
  let result4 ={"Excelente": 0, "Muito bom": 0, "Bom": 0, "Regular": 0, "Ruim": 0, "Muito ruim": 0, "Pessimo": 0}
  value.map((val, index) =>{
    if(val['questao1_funcionarios']) result[val['questao1_funcionarios']] +=  1;
    if(val['questao2_equipe']) result2[val['questao2_equipe']] +=1;
    if(val['questao3_satisfacao']) result3[val['questao3_satisfacao']] +=1;
    if(val['questao4_avaliacao']) result4[val['questao4_avaliacao']] +=1;
    return null;
  })
   let obj = {};
   let data_funcionarios = FormataDados(result, total);
   let data_equipe = FormataDados(result2, total);
   let data_satisfacao = FormataDados(result3, total);
   let data_avaliacao = FormataDados(result4, total);

   obj['data_funcionarios'] = data_funcionarios;
   obj['data_equipe'] = data_equipe;
   obj['data_satisfacao'] = data_satisfacao;
   obj['data_avaliacao'] = data_avaliacao;
   return obj;
}

function FormataDados(value, total){
  let data = [];
  for (let [key] of Object.entries(value)) {
      let obj = {};
      obj['name'] = key
      obj['media de respostas'] = value[key]/total;
      obj['media de respostas'] = isNaN(obj['media de respostas']) ? 0 : obj['media de respostas'];
      data.push(obj)
    }
    return data;
}

export default Grafico;
