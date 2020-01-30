import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

(async () => {
    const app = express();

    const schema = await buildSchema({
        resolvers: [__dirname + '/**/*.res.ts'],
        emitSchemaFile: __dirname + '/../schema.gql',
    });

    const server = new ApolloServer({
        playground: true,
        schema,
    });

    server.applyMiddleware({ app });
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(8080, () => {
        console.log('----- Server started -----');
    });
})();
