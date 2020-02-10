import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Subscription,
    Root,
    PubSub,
    Publisher,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message } from './entity';
import { Repository } from 'typeorm';
import { SendMessageInput, MessagesInput, MessageInput } from './input';

const MESSAGE_SENT_TOPIC = 'MESSAGE_SENT';

@Resolver()
export class MessageResolver {
    @InjectRepository(Message)
    private messageRepo: Repository<Message>;

    @Query(() => [Message])
    public messages(@Arg('input') { skip, take }: MessagesInput) {
        return this.messageRepo.find({
            skip,
            take,
            order: {
                id: 'DESC',
            },
        });
    }

    @Query(() => Message, { nullable: true })
    public message(@Arg('input') { id }: MessageInput) {
        return this.messageRepo.findOne(id);
    }

    @Mutation(() => Message)
    public async sendMessage(
        @Arg('input') input: SendMessageInput,
        @PubSub(MESSAGE_SENT_TOPIC) publish: Publisher<Message>,
    ) {
        const message = await this.messageRepo.save(
            this.messageRepo.create({
                ...input,
            }),
        );
        await publish(message);
        return message;
    }

    @Subscription(() => Message, {
        topics: MESSAGE_SENT_TOPIC,
    })
    public messageSent(@Root() message: Message) {
        return message;
    }
}
