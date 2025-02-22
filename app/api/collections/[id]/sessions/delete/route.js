import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collection from '@/models/collection';

export async function POST(request, { params }) {
    try {
        await dbConnect();
        
        const { id } = params;
        const { timestamp } = await request.json();

        if (!timestamp) {
            return NextResponse.json(
                { error: 'Session timestamp is required' },
                { status: 400 }
            );
        }

        const collection = await Collection.findOne({ id: id });
        
        if (!collection) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        // Find and remove the session with matching timestamp
        const sessionIndex = collection.sessions.findIndex(
            session => session.timestamp === timestamp
        );

        if (sessionIndex === -1) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            );
        }

        collection.sessions.splice(sessionIndex, 1);
        await collection.save();

        return NextResponse.json(
            { message: 'Session deleted successfully', collection },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting session:', error);
        return NextResponse.json(
            { error: 'Failed to delete session' },
            { status: 500 }
        );
    }
}
