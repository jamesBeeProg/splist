import { Resolver } from 'type-graphql';
import { User } from './entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Resolver(User)
export class UserResolver {
    @InjectRepository(User)
    private userRepo: Repository<User>;
}
