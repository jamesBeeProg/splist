import { createParamDecorator } from 'type-graphql';
import { Context } from './user/auth/service';

export const CurrentUser = () =>
    createParamDecorator<Context>(data => data.context.user);

export type Lazy<T> = T | Promise<T>;
