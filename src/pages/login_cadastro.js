import React from 'react';

import Header from '../components/header_component';
import FormLoginCadastro from '../components/formFields_component';

import firebase from '../firebase/firebase';

import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {withStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardbox: {
    border: '1px solid #ced4da',
    display: 'flex',
    flexDirection: 'column',
    width: '380px',
    maxWidth: '80%',
    minWidth: '100px',
    minHeight: '200px',
    borderRadius: '6px',
    boxShadow: '0px 8px 36px #222',
    backgroundColor: '#fefefe',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center'
  },
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    width: '50%',
    fontSize: 16,
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function LoginCadastro(props) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const pagina = "Login";

  if(firebase.auth.currentUser){
    props.history.push('/grafico');
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <React.Fragment>
       <Header pagina={pagina}/>
      </React.Fragment>
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1} className={classes.cardbox}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Cadastro" {...a11yProps(0)}/>
          <AntTab label="Login" {...a11yProps(1)}/>
        </AntTabs>
        <TabPanel value={value} index={0}>
          <FormLoginCadastro props={props}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormLoginCadastro props={props} mode={1}/>
        </TabPanel>
      </Box>
    </div>
  );
}

export default LoginCadastro;
