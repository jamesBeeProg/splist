import { Resolver, Query } from 'type-graphql';

@Resolver()
export class TestResolver {
    @Query(() => String)
    public ping() {
        return 'pong';
    }
}
