import { Resolver, Authorized, Query } from 'type-graphql';
import { User } from './entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { CurrentUser } from '../util';

@Resolver(User)
export class UserResolver {
    @InjectRepository(User)
    private userRepo: Repository<User>;

    @Authorized()
    @Query(() => User)
    public self(@CurrentUser() user: User) {
        return user;
    }
}
