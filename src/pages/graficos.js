import React from 'react';
import firebase from '../firebase/firebase';
import Header from '../components/header_component';
import GraficoBarChart from '../components/barchart_component';
import Box from '@material-ui/core/Box';

//Não consigo entender muito bem como que funciona o Promise,
//então fiz essa gambiarra com o useEffect
function Grafico(props){
  const [value, setValue] = React.useState([]);
  const [total, setTotal] = React.useState(0);
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
    data_pesquisa = tratarDados(value, total);
  }

  if(!firebase.auth.currentUser){
    alert('É necessário estar logado no sistema');
    props.history.push('/')
  }
  return (
    <div>
      <React.Fragment>
       <Header pagina={pagina}/>
      </React.Fragment>
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
        <FuncionariosGrafico data={data_pesquisa['data_funcionarios']}/>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
        <EquipeGrafico data={data_pesquisa['data_equipe']}/>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
        <SatisfacaoGrafico data={data_pesquisa['data_satisfacao']}/>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
        <AvaliacaoGrafico data={data_pesquisa['data_avaliacao']}/>
      </Box>
    </div>
  )
}

function FuncionariosGrafico({data}){
  const graficoValue = "Funcionários"
  return(
    <GraficoBarChart data={data} graficoValue={graficoValue}/>
  )
}
function EquipeGrafico({data}){
  const graficoValue = "Equipes"
  return(
    <GraficoBarChart data={data} graficoValue={graficoValue}/>
  )
}
function SatisfacaoGrafico({data}){
  const graficoValue = "Satisfação"
  return(
    <GraficoBarChart data={data} graficoValue={graficoValue}/>
  )
}
function AvaliacaoGrafico({data}){
  const graficoValue = "Avaliação"
  return(
    <GraficoBarChart data={data} graficoValue={graficoValue}/>
  )
}

function tratarDados(value, total){
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
   let data_funcionarios = formataDados(result, total);
   let data_equipe = formataDados(result2, total);
   let data_satisfacao = formataDados(result3, total);
   let data_avaliacao = formataDados(result4, total);

   obj['data_funcionarios'] = data_funcionarios;
   obj['data_equipe'] = data_equipe;
   obj['data_satisfacao'] = data_satisfacao;
   obj['data_avaliacao'] = data_avaliacao;
   return obj;
}

function formataDados(value, total){
  let data = [];
  for (let [key] of Object.entries(value)) {
      let obj = {};
      obj['name'] = key
      obj['val'] = value[key]/total;
      obj['val'] = isNaN(obj['val']) ? 0 : obj['val'];
      data.push(obj)
    }
    return data;
}


export default Grafico;
