import React from 'react';

import firebase from '../firebase/firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function Header({pagina}) {
  const classes = useStyles();

  const handleLogout = () => {
    firebase.logout();
    window.location.reload();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {pagina}
          </Typography>
          {firebase.auth.currentUser ?
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          : ''}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
