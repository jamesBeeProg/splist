import React from 'react';
import { MessageView } from './message/MessageView';
import { MessageInput } from './message/MessageInput';
import { bind } from 'classnames/bind';
import styles from './App.css';

const cx = bind(styles);

export const App = () => (
    <div className={cx('app')}>
        <header className={cx('branch-header')}></header>
        <header className={cx('general-header')}></header>
        <nav className={cx('navbar')}></nav>
        <aside className={cx('channel-list')}></aside>
        <main className={cx('main')}>
            <MessageView />
        </main>
        <aside className={cx('member-list')}></aside>
        <footer className={cx('toolbar')}></footer>
        <footer className={cx('footer')}>
            <MessageInput />
        </footer>
    </div>
);
