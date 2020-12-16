import React from 'react';
import logo from '../images/wit_logo.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    height:'85%',
    margin: theme.spacing(0,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width:theme.spacing(30),
    height:theme.spacing(30),
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  async function  login(event){
    event.preventDefault();
    let login = document.getElementById('login').value.trim().toLocaleLowerCase();
    let password = document.getElementById('password').value.trim().toLocaleLowerCase();
    const errors = {
      login:document.getElementById('loginError'),
      password:document.getElementById('passwordError'),
      clearErrors(){
          this.login.innerText = "";    
          this.password.innerText = "";
      }
    }
    if(login && password && login.length > 3 && password.length > 3){
      errors.clearErrors();
      const data = await fetch('/api/auth/login',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          login:login,
          password:password,
        })
      })
    }else{
      if(!login || login.length <= 3){
        errors.login.innerText = "login is incorrect*"
      }else{
        errors.login.innerText = ""
      }
      if(!password || password.length <= 3){
        errors.password.innerText = "password is incorrect*"
      }else{
        errors.password.innerText = ""
      }
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Box display="flex" justifyContent="center">
              <img src={logo} alt="" className={classes.logo}/>
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <Typography color="error" id="loginError">
            
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Typography color="error" id="passwordError">
            
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign in
            </Button>
            <Box display="flex" justifyContent="center">
                <Link href="/register">
                  {"Don't have an account? Sign up"}
                </Link>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}