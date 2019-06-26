import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/panel/Login';
import Create from './components/panel/Create';
import Header from './components/panel/Header';
function App() {
  return (
    <BrowserRouter>
        <div className="slideshow">
        <Header/>
          <div className="page-content">
            <Switch>
              <Route path='/' exact component={Login}/>
              <Route path='/create' exact component={Create}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
