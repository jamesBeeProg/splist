import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entity';
import { Repository } from 'typeorm';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { verify } from 'jsonwebtoken';
import { ResolverData } from 'type-graphql';

export interface Context {
    user: User;
}

export interface PublicContext {
    user: null;
}

@Service()
export class AuthService {
    @InjectRepository(User)
    private userRepo: Repository<User>;

    public async getContext({ req, connection }: ExpressContext) {
        // Get the second part of a Bearer token
        const token = (
            req?.headers?.authorization ??
            connection?.context?.authToken ??
            ''
        ).split(' ')[1];

        // Get user, if undef then return null
        const user = (await this.getUserFromToken(token)) ?? null;

        return {
            user,
        };
    }

    private async getUserFromToken(token: string) {
        try {
            if (!token) return;

            // Get subject from token
            const { sub } = (verify(
                token,
                process.env.TOKEN_SECRET ?? '',
            ) as unknown) as TokenPayload;

            // Find a user with a matching id
            return this.userRepo.findOne({ where: { id: sub } });
        } catch {
            // verify() will throw if it's invalid
            return;
        }
    }

    public checkAuthorisation(
        { context: { user } }: ResolverData<Context | PublicContext>,
        perms: string[],
    ) {
        // Ops have all permissions
        if (user?.isOperator) return true;

        // If they were op it would trigger the above so they're not op if they reach this
        if (perms.includes('OPERATOR')) return false;

        // Non logged in users can only acsess things expliscitly marked public
        if (user == null && !perms.includes('PUBLIC')) return false;

        return true;
    }
}

interface TokenPayload {
    sub: number;
}
