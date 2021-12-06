import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { MainPage } from './pages/MainPage/MainPage';
import { RedirectingPage } from './pages/RedirectingPage/RedirectingPage';
import { ReviewPageRead } from './pages/ReviewPageRead/ReviewPageRead';
import { MePage } from './pages/MePage/MePage';
import { ReviewPageEdit } from './pages/ReviewPageEdit/ReviewPageEdit';
import { ReviewPageCreate } from './pages/ReviewPageCreate/ReviewPageCreate';
import { SearchResult } from './pages/SearchResult/SearchResult';

export const routes: React.ReactNode = (
    <Switch>
        <Route path="/signIn" exact>
            <SignInPage/>
        </Route>

        <Route path="/" exact>
            <MainPage/>
        </Route>

        <Route path="/me" exact>
            <MePage/>
        </Route>

        <Route path="/redirect" exact>
            <RedirectingPage/>
        </Route>

        <Route path="/reviews/:reviewId/read" exact>
            <ReviewPageRead/>
        </Route>

        <Route path="/reviews/:reviewId/edit" exact>
            <ReviewPageEdit/>
        </Route>

        <Route path="/me/reviews/create" exact>
            <ReviewPageCreate/>
        </Route>

        <Route path={['/reviews/search/result/:text', '/reviews/search/result']}>
            <SearchResult/>
        </Route>
    </Switch>
)