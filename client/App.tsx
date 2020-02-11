import React from 'react';
import { MessageView } from './message/MessageView';
import { MessageInput } from './message/MessageInput';

export const App = () => (
    <div>
        <MessageInput />
        <MessageView />
    </div>
);
