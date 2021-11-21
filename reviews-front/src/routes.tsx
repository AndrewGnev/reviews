import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { MainPage } from './pages/MainPage/MainPage';
import { RedirectingPage } from './pages/RedirectingPage/RedirectingPage';

export const routes: React.ReactNode = (
    <Switch>
        <Route path="/signIn" exact>
            <SignInPage/>
        </Route>

        <Route path="/" exact>
            <MainPage/>
        </Route>

        <Route path="/redirect" exact>
            <RedirectingPage/>
        </Route>
    </Switch>
)