import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {Security} from '@okta/okta-react';
import { ImplicitCallback } from '@okta/okta-react';


import App from '../App';
import Recipe from './Recipe';

const oktaConfig = {

    issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
    redirect_uri: `${window.location.origin}/implicit/callback`,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
};

const Router = () => {
console.log("Debug", oktaConfig.issuer, oktaConfig.redirect_uri, oktaConfig.client_id)
   return (
   <BrowserRouter>
        <Security {...oktaConfig}>
            <Switch>
                <Route path = "/" component = {App} exact/>
                <Route path = "/recipe/:id" component = {Recipe}/>
                <Route path="/implicit/callback" component={ImplicitCallback} />
            </Switch>
        </Security>
   </BrowserRouter>
   )
   };

export default Router;
