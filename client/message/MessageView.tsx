import React, { FC, useEffect, useLayoutEffect, RefObject } from 'react';
import {
    useFetchMessagesQuery,
    MessageSentDocument,
    MessageSentSubscription,
} from '../generated/graphql';
import { MessageItem } from './MessageItem';
import styled from 'styled-components';

const TAKE_AMOUNT = 10;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
`;

interface Props {
    scrollRef: RefObject<HTMLDivElement>;
}

export const MessageView: FC<Props> = ({ scrollRef }) => {
    const {
        loading,
        error,
        data,
        subscribeToMore,
        fetchMore,
    } = useFetchMessagesQuery({
        variables: {
            input: {
                skip: 0,
                take: TAKE_AMOUNT,
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

    useLayoutEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.toString()}</p>;
    if (!data) return <p>No data?</p>;

    const loadMore = () =>
        fetchMore({
            variables: {
                input: {
                    skip: data.messages.length,
                    take: TAKE_AMOUNT,
                },
            },
            updateQuery(prev, { fetchMoreResult: data }) {
                if (!data) return prev;

                return {
                    ...prev,
                    messages: [...prev.messages, ...data.messages],
                };
            },
        });

    return (
        <MessageContainer>
            {data.messages.map(msg => (
                <MessageItem key={msg.id} {...msg} />
            ))}
            <button onClick={loadMore}>Load More</button>
        </MessageContainer>
    );
};
