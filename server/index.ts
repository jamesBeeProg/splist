import 'reflect-metadata';
import 'dotenv/config';
import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import { AuthService } from './user/auth/service';

// Can be removed when topLevelAwait is added to typescript
(async () => {
    const app = express();

    useContainer(Container);
    await createConnection({
        type: 'sqlite',
        database: __dirname + '/../.data/splist.sqlite',
        entities: [__dirname + '/**/{*.ent,entity}.ts'],
        synchronize: true,
    });

    const schema = await buildSchema({
        resolvers: [__dirname + '/**/{*.res,resolver}.ts'],
        emitSchemaFile: __dirname + '/generated/schema.gql',
        container: Container,
        authChecker(data, perms) {
            return Container.get(AuthService).checkAuthorisation(data, perms);
        },
    });

    const server = new ApolloServer({
        schema,
        subscriptions: {
            path: '/graphql',
        },
        context(ctx) {
            return Container.get(AuthService).getContext(ctx);
        },
    });

    server.applyMiddleware({ app });
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(8081, () => {
        console.log('----- Server started -----');
    });
})();
