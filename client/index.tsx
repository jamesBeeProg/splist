import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from './createClient';

const client = createClient('http://localhost:8081', 'ws://localhost:8081');

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('app'),
);
