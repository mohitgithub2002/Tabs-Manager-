'use client';

import { useState } from 'react';

export default function SessionView({ collection, session }) {
    const [expandedSession, setExpandedSession] = useState(null);

    const handleDeleteSession = async (timestamp) => {
        if (!confirm('Are you sure you want to delete this session?')) {
            return;
        }

        try {
            const response = await fetch(`/api/collections/${collection.id}/sessions/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': session.user.id
                },
                body: JSON.stringify({ timestamp })
            });

            if (!response.ok) {
                throw new Error('Failed to delete session');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    const getSessionDisplayName = (sessionItem) => {
        if (sessionItem.name && sessionItem.name.trim()) {
            return sessionItem.name;
        }
        return formatDate(sessionItem.timestamp);
    };

    const handleRestoreSession = (tabs) => {
        // This function would be called from the extension to restore tabs
        console.log('Restore session:', tabs);
    };

    if (!collection.sessions || collection.sessions.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by saving your first session.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {collection.sessions.map((sessionItem) => (
                <div
                    key={sessionItem.timestamp}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                    <div 
                        className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedSession(expandedSession === sessionItem.timestamp ? null : sessionItem.timestamp)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {getSessionDisplayName(sessionItem)}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {sessionItem.name ? formatDate(sessionItem.timestamp) : `${sessionItem.tabs.length} tabs`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRestoreSession(sessionItem.tabs);
                                    }}
                                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSession(sessionItem.timestamp);
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {expandedSession === sessionItem.timestamp && (
                        <div className="border-t border-gray-200 bg-gray-50">
                            <div className="px-6 py-4 space-y-2">
                                {sessionItem.tabs.map((tab, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <img 
                                            src={`https://www.google.com/s2/favicons?domain=${new URL(tab.url).hostname}`}
                                            alt="favicon"
                                            className="w-4 h-4"
                                        />
                                        <a 
                                            href={tab.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-sm text-gray-700 hover:text-blue-600 truncate"
                                        >
                                            {tab.title || tab.url}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
} 