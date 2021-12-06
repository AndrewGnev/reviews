import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

import { routes } from '../routes';
import { queryClient } from '../queryClient';

import 'bootstrap/dist/css/bootstrap.min.css';
import { TokenProvider } from '../token';


export const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TokenProvider>
                    <BrowserRouter>
                        {routes}
                    </BrowserRouter>
            </TokenProvider>
        </QueryClientProvider>
    );
};
