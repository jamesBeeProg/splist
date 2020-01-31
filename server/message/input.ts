import { InputType, Field } from 'type-graphql';
import { Length, Min, Max } from 'class-validator';
import { Message } from './entity';

@InputType()
export class MessagesInput {
    @Field()
    @Min(0)
    public skip: number;

    @Field()
    @Min(0)
    @Max(50)
    public take: number;
}

@InputType()
export class MessageInput implements Partial<Message> {
    @Field()
    @Min(0)
    public id: number;
}

@InputType()
export class SendMessageInput implements Partial<Message> {
    @Field()
    @Length(2, 200)
    public content: string;
}
