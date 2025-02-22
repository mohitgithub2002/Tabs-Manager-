import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongooseAdapter } from '@next-auth/mongoose-adapter';
import dbConnect from '../../../lib/db';
import User from '../../../models/user';

// Ensure database connection before handling auth
dbConnect();

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongooseAdapter(mongoose.connection),
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        const newUser = new User({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            isEmailVerified: true
                        });
                        await newUser.save();
                    }
                    return true;
                } catch (error) {
                    console.error('Error during sign in:', error);
                    return false;
                }
            }
            return false;
        },
        async session({ session, user }) {
            try {
                const dbUser = await User.findOne({ email: user.email });
                if (dbUser) {
                    session.user.id = dbUser._id.toString();
                }
                return session;
            } catch (error) {
                console.error('Error getting session:', error);
                return session;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
