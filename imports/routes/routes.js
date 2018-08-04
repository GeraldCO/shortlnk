import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import Signup from '../ui/Signup';
import Links from '../ui/Links';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import history from '../ui/history';

const unautenticatedPages = ['/','/signup'];
const autenticatedPages = ['/links',];

const onEnterPublicPages = ()=>{
  if(Meteor.userId()){
    history.replace('/links');
  }
}

const onEnterPrivatePage = ()=>{
  if(!Meteor.userId()){
    history.replace('/');
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Login} onEnter={onEnterPublicPages}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPages}/>
      <Route exact path="/links" component={Links} onEnter={()=>console.log("entraste aqui")}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);

export const onAuthChange = (isAutenticated)=>{
    const pathname = location.pathname;
  const isUnantenticatedPage = unautenticatedPages.includes(pathname);
  const isAutehticatedPage = autenticatedPages.includes(pathname);

  if(unautenticatedPages && isAutenticated){
    history.replace("/links");
  }else
  if(isAutehticatedPage && !isAutenticated){
    history.replace("/"); 
  }
}
