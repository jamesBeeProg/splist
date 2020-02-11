import React, { FC, useEffect } from 'react';
import {
    useFetchMessagesQuery,
    MessageSentDocument,
    MessageSentSubscriptionResult,
    MessageSentSubscription,
} from '../generated/graphql';

export const MessageView: FC = () => {
    const { loading, error, data, subscribeToMore } = useFetchMessagesQuery({
        variables: {
            input: {
                skip: 0,
                take: 30,
            },
        },
    });

    useEffect(() =>
        subscribeToMore({
            document: MessageSentDocument,
            updateQuery(prev, { subscriptionData: { data } }) {
                if (!data) return prev;

                return {
                    ...prev,
                    messages: [
                        // Types for subscribeToMore are still wack
                        ((data as unknown) as MessageSentSubscription)
                            .messageSent,
                        ...prev.messages,
                    ],
                };
            },
        }),
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.toString()}</p>;
    if (!data) return <p>No data?</p>;

    return (
        <ul>
            {data.messages.map(msg => (
                <li key={msg.id}>{msg.content}</li>
            ))}
        </ul>
    );
};
