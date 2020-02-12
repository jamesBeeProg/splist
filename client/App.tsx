import React, { useRef } from 'react';
import { MessageView } from './message/MessageView';
import { MessageInput } from './message/MessageInput';
import styled, { createGlobalStyle } from 'styled-components';

const Theme = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: Arial;

        /* Customise theme here */
        --main-background: #d9b382;
        --aside-background: #363333;
        --toolbar-background: #272121;
        --navbar-background: #b55121;
    }
`;

const Grid = styled.div`
    /* Force clamp to window size */
    width: 100vw;
    height: 100vh;

    display: grid;
    grid:
        ' navbar branch-header general-header general-header' 1fr
        ' navbar channel-list  main           member-list   ' 10fr
        ' navbar toolbar       footer         member-list   ' 1fr
        / 1fr 3fr 8fr 3fr;
`;

const LodgeHeader = styled.header`
    grid-area: branch-header;
    background-color: var(--aside-background);
    box-shadow: 0 5px 50px -10px rgba(0, 0, 0, 1);
    z-index: 2;
`;

const ChannelHeader = styled.header`
    grid-area: general-header;
    background-color: var(--main-background);
    box-shadow: 0 5px 50px -10px rgba(0, 0, 0, 1);
    z-index: 1;
`;

const Navbar = styled.nav`
    grid-area: navbar;
    background-color: var(--navbar-background);
    z-index: 3;
`;

const ChannelList = styled.aside`
    grid-area: channel-list;
    background-color: var(--aside-background);
`;

const Main = styled.main`
    grid-area: main;
    background-color: var(--main-background);
    overflow-y: scroll;
`;

const MemberList = styled.aside`
    grid-area: member-list;
    background-color: var(--aside-background);
`;

const Toolbar = styled.footer`
    grid-area: toolbar;
    background-color: var(--toolbar-background);
`;

const Footer = styled.footer`
    grid-area: footer;
    background-color: var(--main-background);
`;

export const App = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    return (
        <Grid>
            <Theme />
            <LodgeHeader></LodgeHeader>
            <ChannelHeader></ChannelHeader>
            <Navbar></Navbar>
            <ChannelList></ChannelList>
            <Main ref={mainRef}>
                <MessageView scrollRef={mainRef} />
            </Main>
            <MemberList></MemberList>
            <Toolbar></Toolbar>
            <Footer>
                <MessageInput />
            </Footer>
        </Grid>
    );
};
