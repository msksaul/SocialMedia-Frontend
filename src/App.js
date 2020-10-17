import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import './App.css';

import { Provider } from 'react-redux'
import store from './redux/store'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken
let authenticated

if(token) {
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  }
  else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={home}/>
            <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
            <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
          </Switch>
        </div>
      </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
