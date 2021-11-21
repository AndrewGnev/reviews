import React, { useEffect } from 'react';
import { Page } from '../../components/Page';
import { useHistory, useLocation } from 'react-router-dom';
import { useToken } from '../../token';
import { NotAuthenticatedGuard } from '../../components/guards/NotAuthenticatedGuard';

export interface RedirectingPageProps {
    classname?: string;
}

export const RedirectingPage: React.FC<RedirectingPageProps> = ({ classname }) => {
    const { setToken } = useToken();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            setToken(token);
        }
    }, [location.search, setToken]);

    return (
        <NotAuthenticatedGuard redirectUrl="/">
            <Page>
                Redirecting...
            </Page>
        </NotAuthenticatedGuard>
    );
};