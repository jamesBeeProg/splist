import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Message } from '../message/entity';

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

    @OneToMany(
        () => Message,
        msg => msg.author,
        { lazy: true },
    )
    public messages: Promise<Message[]>;
}
