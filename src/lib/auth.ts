import {betterAuth} from 'better-auth'
import {prismaAdapter} from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js';

import {prisma} from '@/lib/prisma';
import { hashPassword, verifyPassword } from './argon2';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider:'postgresql'
    }),
    emailAndPassword:{
        enabled:true,
        minPasswordLength:6,
        autoSignIn:false,
        password:{
            hash:hashPassword,
            verify:verifyPassword
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60, //30 days,
    },
    advanced: {
        database: {
            generateId:false,
        },
    },
    plugins:[nextCookies()],
});