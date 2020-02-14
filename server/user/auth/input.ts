import { ObjectType, Field, InputType } from 'type-graphql';
import { User } from '../entity';

@InputType()
export class RegisterInput {
    @Field()
    public handle: string;

    @Field()
    public password: string;
}

@InputType()
export class LoginInput {
    @Field()
    public handle: string;

    @Field()
    public password: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    public token: string;

    @Field(() => User)
    public user: User;
}
