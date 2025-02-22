import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collection from '@/models/collection';

export async function POST(request, { params }) {
    try {
        await dbConnect();
        
        const { id } = params;
        const { action, newName } = await request.json();

        const collection = await Collection.findOne({ id: id });
        
        if (!collection) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        // Handle different actions
        switch (action) {
            case 'rename':
                if (!newName) {
                    return NextResponse.json(
                        { error: 'New name is required for rename action' },
                        { status: 400 }
                    );
                }
                collection.name = newName;
                await collection.save();
                return NextResponse.json(
                    { message: 'Collection renamed successfully', collection },
                    { status: 200 }
                );

            case 'delete':
                await Collection.deleteOne({ id: id });
                return NextResponse.json(
                    { message: 'Collection deleted successfully' },
                    { status: 200 }
                );

            default:
                return NextResponse.json(
                    { error: 'Invalid action specified' },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error('Error modifying collection:', error);
        return NextResponse.json(
            { error: 'Failed to modify collection' },
            { status: 500 }
        );
    }
}
