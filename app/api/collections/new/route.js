import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collection from '@/models/collection';

export async function POST(request) {
    try {
        await dbConnect();
        
        const body = await request.json();
        
        // Validate required fields
        if (!body.id || !body.name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create new collection
        const collection = await Collection.create({
            id: body.id,
            name: body.name,
            sessions: body.sessions || []
        });

        return NextResponse.json(collection, { status: 201 });
        
    } catch (error) {
        // Handle duplicate ID error
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Collection ID already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
