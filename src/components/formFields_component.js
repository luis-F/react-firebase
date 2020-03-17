import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../firebase/firebase';

//mode se refere a apresentação de tela de login=1 ou cadastro=0
function FormLoginCadastro({props, mode=0}){
  const [nome,setNome] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

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
    <form noValidate
          autoComplete="off"
          onSubmit={mode === 1 ? login : cadastro}>
          {mode===0 ?
      <div>
      <FormControl>
        <InputLabel shrink htmlFor="nome_id">
          <Typography variant="h6" gutterBottom sytle={{fontFamily: 'Roboto'}}>
            Nome
          </Typography>
        </InputLabel>
        <TextField
          variant="filled"
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
        <InputLabel shrink htmlFor="email_id">
          <Typography variant="h6" gutterBottom sytle={{fontFamily: 'Roboto'}}>
            Email
          </Typography>
        </InputLabel>
        <TextField
          variant="filled"
          type='text'
          id="email_id"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
      </FormControl>
      </div>
      <div>
      <FormControl>
        <InputLabel shrink htmlFor="senha_id">
          <Typography variant="h6" gutterBottom sytle={{fontFamily: 'Roboto'}}>
            Senha
          </Typography>
        </InputLabel>
        <TextField
          variant="filled"
          type='password'
          id="senha_id"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          />
      </FormControl>
      </div>
      <div>
        <Button type="submit"
          variant="contained"
          color="primary"
          size="small">
        {mode===0 ? "Cadastrar" : "Logar"}</Button>
      </div>
    </form>
  )
}

export default FormLoginCadastro;
