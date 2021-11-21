import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';


import { StompProvider } from '../stomp';
import { routes } from '../routes';
import { queryClient } from '../queryClient';

import 'bootstrap/dist/css/bootstrap.min.css';
import { TokenProvider } from '../token';


export const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TokenProvider>
                <StompProvider>
                    <BrowserRouter>
                        {routes}
                    </BrowserRouter>
                </StompProvider>
            </TokenProvider>
        </QueryClientProvider>
    );
};
