import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from '../user/entity';
import { Lazy } from '../util';

@Entity()
@ObjectType()
export class Message {
    @PrimaryGeneratedColumn()
    @Field()
    public id: number;

    @Column()
    @Field()
    public content: string;

    @ManyToOne(
        () => User,
        user => user.messages,
        { lazy: true },
    )
    @Field(() => User)
    public author: Lazy<User>;
}
