'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function CollectionSidebar({ collections, selectedCollection, onCollectionSelect, session }) {
    const [isCreating, setIsCreating] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    const handleCreateCollection = async (e) => {
        e.preventDefault();
        if (!newCollectionName.trim()) return;

        try {
            const response = await fetch('/api/collections/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: Date.now().toString(),
                    name: newCollectionName,
                    userId: session.user.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create collection');
            }

            setIsCreating(false);
            setNewCollectionName('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    const handleEditCollection = async (collection) => {
        if (!editName.trim() || editName === collection.name) {
            setEditingId(null);
            return;
        }

        try {
            const response = await fetch(`/api/collections/${collection.id}/edit`, {
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

            setEditingId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error editing collection:', error);
        }
    };

    const handleDeleteCollection = async (collection) => {
        if (!confirm('Are you sure you want to delete this collection?')) {
            return;
        }

        try {
            const response = await fetch(`/api/collections/${collection.id}/edit`, {
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

    const startEditing = (collection) => {
        setEditingId(collection.id);
        setEditName(collection.name);
    };

    return (
        <aside className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Collections</h2>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {isCreating && (
                        <form onSubmit={handleCreateCollection} className="mb-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCollectionName}
                                    onChange={(e) => setNewCollectionName(e.target.value)}
                                    placeholder="Collection name"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-1">
                        {collections.map((collection) => (
                            <div
                                key={collection.id}
                                className={`group rounded-lg transition-colors ${
                                    selectedCollection?.id === collection.id
                                        ? 'bg-blue-50'
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                {editingId === collection.id ? (
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onBlur={() => handleEditCollection(collection)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleEditCollection(collection)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <button
                                            onClick={() => onCollectionSelect(collection)}
                                            className="flex items-center flex-1 text-left"
                                        >
                                            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            <span className={`font-medium truncate ${
                                                selectedCollection?.id === collection.id ? 'text-blue-700' : 'text-gray-700'
                                            }`}>
                                                {collection.name}
                                            </span>
                                        </button>
                                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEditing(collection)}
                                                className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCollection(collection)}
                                                className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="border-t border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center space-x-3">
                    {session?.user?.image ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={session.user.image}
                                alt={session.user.name || 'Profile'}
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                                {session?.user?.name?.[0] || session?.user?.email?.[0] || '?'}
                            </span>
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {session?.user?.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {session?.user?.email || ''}
                        </p>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                        title="Sign out"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
} 