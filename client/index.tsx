import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from './createClient';

const client = createClient(
    'http://localhost:8081/graphql',
    'ws://localhost:8081/graphql',
);

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('app'),
);
