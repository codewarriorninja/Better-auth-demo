import {betterAuth} from 'better-auth'
import {prismaAdapter} from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';

import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from './argon2';
import { createAuthMiddleware,APIError, } from 'better-auth/api';
import { normalizeName, VALID_DOMAIN } from './utils';
import { UserRole } from '@/generated/prisma';
import { roles,ac } from '@/lib/permission'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider:'postgresql'
    }),
    socialProviders:{
        google:{
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_SECRET_GOOGLE_CLIENT_SECRET as string,
        },
        github:{
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.NEXT_SECRET_GITHUB_CLIENT_SECRET as string
        }
    },
    emailAndPassword:{
        enabled:true,
        minPasswordLength:6,
        autoSignIn:false,
        password:{
            hash:hashPassword,
            verify:verifyPassword
        }
    },
    hooks:{
        before:createAuthMiddleware(async (ctx) => {
            if(ctx.path === '/sign-up/email'){
                const email = String(ctx.body.email);
                const domain = email.split("@")[1];

                if(!VALID_DOMAIN().includes(domain)){
                    throw new APIError("BAD_REQUEST", {
                        message:'Invalid domain, Please use a valid email.'
                    });
                }
                
                const name = normalizeName(ctx.body.name);

                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name,
                        }
                    }
                }
            }
        })
    },
    databaseHooks:{
        user:{
            create:{
                before:async (user) => {
                  const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(';') || [];
                   
                  if(ADMIN_EMAILS.includes(user.email)){
                    return {data: {...user, role:UserRole.ADMIN}}
                  }
                  return {data:user}
                }
            }
        }
    },
    user:{
        additionalFields:{
            role:{
                type:['USER','ADMIN'] as Array<UserRole>,
                input:false
            }
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60, //30 days,
    },
    account:{
        accountLinking:{
            enabled:false,
        }
    },
    advanced: {
        database: {
            generateId:false,
        },
    },
    plugins:[
        nextCookies(),
        admin ({
            defaultRole:UserRole.USER, //User
            adminRoles:[UserRole.ADMIN], //admin
            ac,
            roles,
        })
    ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'unknown'