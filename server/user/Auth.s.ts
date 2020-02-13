import { Service } from 'typedi';
import { User } from './entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Service()
export class Auth {
    @InjectRepository(User)
    private userRepo: Repository<User>;
}
