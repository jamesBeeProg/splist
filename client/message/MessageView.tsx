import React, { FC } from 'react';
import { useFetchMessagesQuery } from '../generated/graphql';

export const MessageView: FC = () => {
    const { loading, error, data } = useFetchMessagesQuery({
        variables: {
            input: {
                skip: 0,
                take: 30,
            },
        },
    });

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
