import React from 'react';
import FormLoginCadastro from '../components/formFields_component';

import Tabs from '@material-ui/core/Tabs';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import Header from '../components/header_component';
import firebase from '../firebase/firebase';

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
    //minWidth: 72,
    // maxWidth: '45%',
    width: '50%',
    fontSize: 16,
    fontWeight: theme.typography.fontWeightRegular,
    // marginRight: theme.spacing(4),
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

  if(firebase.auth.currentUser){
    props.history.push('/grafico');
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <React.Fragment>
       <Header props={props}/>
      </React.Fragment>
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
    </div>
  );
}

export default LoginCadastro;
