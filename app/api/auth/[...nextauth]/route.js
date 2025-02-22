import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/db';
import User from '@/models/user';
import Account from '@/models/account';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await dbConnect();
            if (account.provider === "google") {
                try {
                    let dbUser = await User.findOne({ email: user.email });
                    
                    if (!dbUser) {
                        dbUser = await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            isEmailVerified: true
                        });
                    }
                    console.log(account);
                    console.log('Profile:', profile);

                    // Store or update the account information
                    await Account.findOneAndUpdate(
                        { provider: account.provider, providerAccountId: account.providerAccountId },
                        {
                            userId: dbUser._id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                        },
                        { upsert: true }
                    );

                    return true;
                } catch (error) {
                    console.error('Error during sign in:', error);
                    return false;
                }
            }
            return false;
        },
        async session({ session, token }) {
            try {
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.id = dbUser._id.toString();
                }
                session.user.accessToken = token.accessToken;
                return session;
            } catch (error) {
                console.error('Error getting session:', error);
                return session;
            }
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,  // Ensure that the session uses JWT
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
});

export { handler as GET, handler as POST };
