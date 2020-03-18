import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {ResultContext} from '../pages/pesquisa';
import firebase from '../firebase/firebase';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

function RadioButtonsGroup({pergunta, aria_label_radioGroup, name, labels_array,
   values_array, position=false, finaliza=false, validado=false, resultado=null, props}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([]);
  const {onChangeContext} = React.useContext(ResultContext)

  const handleChange = event => {
    setValue(event.target.value);
    onChangeContext(event.target.value, name);
  };
  const handleSubmit = event => {
    event.preventDefault();
     if(validado){
       firebase.add_result(resultado);
       props.history.push('/grafico')
     } else {
       alert('É necessário responder todas as perguntas');
     }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl} required={true}>
        <FormLabel component="label">{pergunta}</FormLabel>
        <RadioGroup aria-label={aria_label_radioGroup} name={name} value={value} onChange={handleChange} row={position}>
          {labels_array.map((label, index) =>
          <FormControlLabel value={values_array[index]} key={`${name}_${index}`} control={<Radio/>} label={label} />
          )}
        </RadioGroup>
      </FormControl>
      {finaliza ?
        <div>
          <Divider/>
          <Button type="submit"
            variant="contained"
            color="primary"
            size="small">
          Enviar</Button>
        </div> : ''
      }
    </form>
  );
}

export default RadioButtonsGroup;
