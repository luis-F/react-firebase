import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../firebase/firebase';

const useStyle = makeStyles(() => ({
  button: {
    width: '100%'
  },
  textfield: {
    paddingBottom: '10px',
    paddingTop: '10px'
  },
  formfield: {
    backgroundColor: '#f2f0f0'
  }
}));

//mode se refere a apresentação de tela de login=1 ou cadastro=0
function FormLoginCadastro({props, mode=0}){
  const [nome,setNome] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const classes = useStyle();

  async function cadastro(e){
    e.preventDefault();
    try {
      await firebase.register(nome, email, senha);
      props.history.push('/pesquisa');
    } catch (error) {
      alert(error.message)
    }
  }
  async function login(e) {
    e.preventDefault();
    try {
      await firebase.login(email, senha);
      props.history.push('/pesquisa');
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={mode === 1 ? login : cadastro}>
      {mode===0 ?
      <div>
      <FormControl>
        <TextField
          className={classes.textfield}
          placeholder="Nome"
          type='text'
          id="nome_id"
          value={nome}
          onChange={e => setNome(e.target.value)}
          />
      </FormControl>
      </div>
      : ''
      }
      <div>
      <FormControl>
        <TextField
          className={classes.textfield}
          placeholder="Email"
          type='text'
          id="email_id"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
      </FormControl>
      </div>
      <div>
      <FormControl>
        <TextField
          className={classes.textfield}
          placeholder="Senha"
          type='password'
          id="senha_id"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          />
      </FormControl>
      </div>
      <div>
        <Button type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          size="small">
        {mode===0 ? "Cadastrar" : "Logar"}</Button>
      </div>
    </form>
  )
}

export default FormLoginCadastro;
