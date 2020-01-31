import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message } from './entity';
import { Repository } from 'typeorm';
import { SendMessageInput, MessagesInput, MessageInput } from './input';

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
    public sendMessage(@Arg('input') input: SendMessageInput) {
        return this.messageRepo.save(
            this.messageRepo.create({
                ...input,
            }),
        );
    }
}
