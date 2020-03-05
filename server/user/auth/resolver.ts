import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { User } from '../entity';
import { LoginResponse, RegisterInput, LoginInput } from './input';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class AuthResolver {
    @InjectRepository(User)
    private userRepo: Repository<User>;

    @Authorized('PUBLIC')
    @Mutation(() => User)
    public async register(@Arg('input') input: RegisterInput) {
        const hashedPassword = await hash(input.password, 10);
        return this.userRepo.save(
            this.userRepo.create({
                ...input,
                password: hashedPassword,
                isOperator: false,
            }),
        );
    }

    @Authorized('PUBLIC')
    @Mutation(() => LoginResponse)
    public async login(@Arg('input') input: LoginInput) {
        const userPass = await this.userRepo.findOne({
            where: {
                handle: input.handle,
            },
            select: ['password', 'id'],
        });

        if (!userPass) throw new AuthenticationError('Invalid Login');

        const isPasswordMatch = await compare(
            input.password,
            userPass.password,
        );

        if (!isPasswordMatch) throw new AuthenticationError('Invalid Login');

        const user = await this.userRepo.findOne(userPass.id);

        const token = sign(
            {
                sub: user?.id,
            },
            process.env.TOKEN_SECRET ?? '', // TODO Improve config handling
        );

        return {
            token,
            user,
        };
    }
}
