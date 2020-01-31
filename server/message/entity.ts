import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class Message {
    @PrimaryGeneratedColumn()
    @Field()
    public id: number;

    @Column()
    @Field()
    public content: string;
}
