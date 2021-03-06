import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import './App.css';

import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'

import axios from 'axios';

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken

if(token) {
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
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
            <AuthRoute exact path='/login' component={login}/>
            <AuthRoute exact path='/signup' component={signup}/>
            <Route exact path='/users/:handle' component={user}/>
            <Route exact path='/users/:handle/scream/:screamId' component={user}/>
          </Switch>
        </div>
      </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
