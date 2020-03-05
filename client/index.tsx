import React, { FC } from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from './createClient';
import { LoginPage } from './login/LoginPage';

const client = createClient(
    'http://localhost:8081/graphql',
    'ws://localhost:8081/graphql',
);

const Root: FC = () => {
    const token = localStorage.getItem('auth:token');
    return (
        <ApolloProvider client={client}>
            {token ? <App /> : <LoginPage />}
        </ApolloProvider>
    );
};

render(<Root />, document.getElementById('app'));
