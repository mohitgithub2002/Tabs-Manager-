import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collection from '@/models/collection';

export async function GET( { params }) {
    try {
        await dbConnect();
        
        const { id } = params;
        const collection = await Collection.findOne({ id: id });
        
        if (!collection) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { data: collection },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching sessions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sessions' },
            { status: 500 }
        );
    }
}

export async function POST(request, { params }) {
    try {
        await dbConnect();
        
        const { id } = params;
        const sessionData = await request.json();

        // Find collection and update with new session
        const collection = await Collection.findOne({ id: id });
        
        if (!collection) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        collection.sessions.push({
            isSingleTab: sessionData.isSingleTab || false,
            name: sessionData.name,
            tabs: sessionData.tabs,
            timestamp: sessionData.timestamp || new Date().toISOString()
        });

        await collection.save();

        return NextResponse.json(
            { message: 'Session added successfully', collection },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error adding session:', error);
        return NextResponse.json(
            { error: 'Failed to add session' },
            { status: 500 }
        );
    }
}
