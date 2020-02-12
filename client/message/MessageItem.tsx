import React, { FC } from 'react';
import { Message } from '../generated/graphql';
import styled from 'styled-components';

const Padded = styled.p`
    padding-left: 4%;
`;

export const MessageItem: FC<Message> = ({ content }) => (
    <Padded>» {content}</Padded>
);
