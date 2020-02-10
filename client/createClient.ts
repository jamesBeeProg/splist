import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

// Create a apollo client with custom link stack
export const createClient = (httpUrl: string, wsUrl: string) => {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const httpLink = new HttpLink({
        uri: httpUrl,
    });

    const wsLink = new WebSocketLink({
        uri: wsUrl,
        options: {
            reconnect: true,
        },
    });

    const splitLink = split(
        // Split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    const link = ApolloLink.from([errorLink, splitLink]);

    return new ApolloClient({
        cache: new InMemoryCache(),
        link,
    });
};
