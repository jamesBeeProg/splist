import React, { FC, useState } from 'react';
import { useSendMessageMutation } from '../generated/graphql';

export const MessageInput: FC = () => {
    const [content, setContent] = useState('');
    const [sendMessage] = useSendMessageMutation();

    return (
        <input
            type="text"
            value={content}
            onChange={event => setContent(event.currentTarget.value)}
            onKeyPress={async event => {
                if (event.key != 'Enter' || !content) return;
                await sendMessage({
                    variables: { content },
                });
                setContent('');
            }}
        />
    );
};
