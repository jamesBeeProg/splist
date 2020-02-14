import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Subscription,
    Root,
    PubSub,
    Publisher,
    Authorized,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message } from './entity';
import { Repository } from 'typeorm';
import { SendMessageInput, MessagesInput, MessageInput } from './input';
import { User } from '../user/entity';
import { CurrentUser } from '../util';

const MESSAGE_SENT_TOPIC = 'MESSAGE_SENT';

@Resolver()
export class MessageResolver {
    @InjectRepository(Message)
    private messageRepo: Repository<Message>;

    @Authorized()
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

    @Authorized()
    @Query(() => Message, { nullable: true })
    public message(@Arg('input') { id }: MessageInput) {
        return this.messageRepo.findOne(id);
    }

    @Authorized()
    @Mutation(() => Message)
    public async sendMessage(
        @Arg('input') input: SendMessageInput,
        @PubSub(MESSAGE_SENT_TOPIC) publish: Publisher<Message>,
        @CurrentUser() user: User,
    ) {
        const message = await this.messageRepo.save(
            this.messageRepo.create({
                ...input,
                author: user,
            }),
        );
        await publish(message);
        return message;
    }

    @Authorized()
    @Subscription(() => Message, {
        topics: MESSAGE_SENT_TOPIC,
    })
    public messageSent(@Root() message: Message) {
        return message;
    }
}
