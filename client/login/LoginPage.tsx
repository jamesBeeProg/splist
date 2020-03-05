import React, { FC, useState } from 'react';
import { useLoginMutation } from '../generated/graphql';

export const LoginPage: FC = () => {
    const [handle, setHandle] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    return (
        <main>
            <input
                value={handle}
                onChange={e => setHandle(e.currentTarget.value)}
                placeholder="Handle"
            />
            <input
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                placeholder="Password"
                type="password"
            />
            <button
                onClick={async () => {
                    const token = (
                        await login({
                            variables: { input: { handle, password } },
                        })
                    ).data?.login.token;
                    if (!token) return;
                    localStorage.setItem('auth:token', token);
                    location.reload();
                }}
            >
                Sign in
            </button>
        </main>
    );
};
