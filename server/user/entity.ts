import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Message } from '../message/entity';
import { Lazy } from '../util';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field()
    public id: number;

    @Column()
    @Field()
    public handle: string;

    @Column({ select: false })
    public password: string;

    @Column()
    @Field()
    public isOperator: boolean;

    @OneToMany(
        () => Message,
        msg => msg.author,
        { lazy: true },
    )
    @Field(() => [Message])
    public messages: Lazy<Message[]>;
}
