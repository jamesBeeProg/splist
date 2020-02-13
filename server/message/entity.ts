import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from '../user/entity';

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
    public author: Promise<User>;
}
