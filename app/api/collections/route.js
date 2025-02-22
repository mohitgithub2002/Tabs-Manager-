import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collection from '@/models/collection';

export async function GET(request) {
    try {
        await dbConnect();
        
        const userId = request.headers.get('user-id');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 401 }
            );
        }

        const collections = await Collection.find({ userId }).sort({ updatedAt: -1 });
        
        return NextResponse.json(
            { data: collections },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json(
            { error: 'Failed to fetch collections' },
            { status: 500 }
        );
    }
}
