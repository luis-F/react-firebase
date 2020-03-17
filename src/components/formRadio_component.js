import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

function RadioButtonsGroup({pergunta, aria_label_radioGroup, nome, num_itens, labels_array, values_array}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="label">{pergunta}</FormLabel>
        <RadioGroup aria-label={aria_label_radioGroup} name={nome} value={value} onChange={handleChange}>
          {labels_array.map((label, index) =>
          <FormControlLabel value={values_array[index]} key={`id_${index}`} control={<Radio />} label={label} />
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioButtonsGroup;
