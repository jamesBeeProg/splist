import React, { FC } from 'react';
import { Message } from '../generated/graphql';
import styled from 'styled-components';
import { DeepPartial } from 'typeorm';

const Padded = styled.p`
    padding-left: 4%;
`;

export const MessageItem: FC<DeepPartial<Message>> = ({ author, content }) => (
    <Padded>
        {author?.handle} » {content}
    </Padded>
);
