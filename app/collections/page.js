'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CollectionSidebar from '../../components/CollectionSidebar';
import SessionView from '../../components/SessionView';

export default function CollectionsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/api/auth/signin');
            return;
        }

        if (status === "authenticated") {
            const fetchCollections = async () => {
                try {
                    const response = await fetch('/api/collections', {
                        headers: {
                            'user-id': session.user.id
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch collections');
                    }

                    const { data } = await response.json();
                    setCollections(data);
                    if (data.length > 0 && !selectedCollection) {
                        setSelectedCollection(data[0]);
                        setEditName(data[0].name);
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchCollections();
        }
    }, [status, session, router, selectedCollection]);

    const handleEditCollection = async () => {
        if (!editName.trim() || editName === selectedCollection.name) {
            setIsEditing(false);
            return;
        }

        try {
            const response = await fetch(`/api/collections/${selectedCollection.id}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': session.user.id
                },
                body: JSON.stringify({
                    action: 'rename',
                    newName: editName
                })
            });

            if (!response.ok) {
                throw new Error('Failed to rename collection');
            }

            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error editing collection:', error);
        }
    };

    const handleDeleteCollection = async () => {
        if (!confirm('Are you sure you want to delete this collection?')) {
            return;
        }

        try {
            const response = await fetch(`/api/collections/${selectedCollection.id}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': session.user.id
                },
                body: JSON.stringify({
                    action: 'delete'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to delete collection');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <CollectionSidebar 
                collections={collections}
                selectedCollection={selectedCollection}
                onCollectionSelect={setSelectedCollection}
                session={session}
            />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                        {isEditing ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onBlur={handleEditCollection}
                                    onKeyPress={(e) => e.key === 'Enter' && handleEditCollection()}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-semibold"
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {selectedCollection ? selectedCollection.name : 'Select a Collection'}
                            </h1>
                        )}
                        {selectedCollection && !isEditing && (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setEditName(selectedCollection.name);
                                    }}
                                    className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-white transition-colors"
                                    title="Edit collection"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleDeleteCollection}
                                    className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-white transition-colors"
                                    title="Delete collection"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {selectedCollection && (
                        <SessionView 
                            collection={selectedCollection}
                            session={session}
                        />
                    )}
                </div>
            </main>
        </div>
    );
} 