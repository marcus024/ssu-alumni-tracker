import { Head, router } from '@inertiajs/react';
import GraduateLayout from '@/Layouts/GraduateLayout';
import { PageProps } from '@/types';
import { useState, useEffect, useRef } from 'react';

interface Conversation {
    sender_email: string;
    sender_name: string;
    last_message_at: string;
    unread_count: number;
}

interface Message {
    id: number;
    sender_name: string;
    sender_email: string;
    message: string;
    is_from_graduate: boolean;
    created_at: string;
}

interface Graduate {
    id: number;
    name: string;
    email: string;
}

interface ChatProps extends PageProps {
    conversations: Conversation[];
    graduate: Graduate;
}

export default function Chat({ conversations: initialConversations, graduate }: ChatProps) {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [replyMessage, setReplyMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadConversation = async (senderEmail: string) => {
        try {
            const response = await fetch(`/graduate/chat/${encodeURIComponent(senderEmail)}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            const data = await response.json();
            setMessages(data.messages);
            setSelectedConversation(senderEmail);

            // Update unread count
            setConversations(prev =>
                prev.map(conv =>
                    conv.sender_email === senderEmail
                        ? { ...conv, unread_count: 0 }
                        : conv
                )
            );
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    };

    const sendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMessage.trim() || !selectedConversation || isSending) return;

        const messageToSend = replyMessage;
        const conversationEmail = selectedConversation;

        // Optimistically add message to UI immediately
        const optimisticMessage: Message = {
            id: Date.now(), // Temporary ID
            sender_name: graduate.name,
            sender_email: graduate.email,
            message: messageToSend,
            is_from_graduate: true,
            created_at: new Date().toISOString(),
        };

        setMessages(prev => [...prev, optimisticMessage]);
        setReplyMessage('');
        setIsSending(true);

        router.post('/graduate/chat/reply', {
            sender_email: conversationEmail,
            message: messageToSend,
        }, {
            preserveScroll: true,
            preserveState: true,
            only: [], // Don't reload any props
            onSuccess: () => {
                // Silently reload conversation in background
                loadConversation(conversationEmail);
            },
            onError: (errors) => {
                console.error('Error sending reply:', errors);
                // Remove optimistic message on error
                setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
                setReplyMessage(messageToSend);
                alert('Failed to send message. Please try again.');
            },
            onFinish: () => {
                setIsSending(false);
            },
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const selectedConv = conversations.find(c => c.sender_email === selectedConversation);

    return (
        <GraduateLayout header="Messages">
            <Head title="Messages" />

            <div className="flex h-[calc(100vh-180px)] bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h2>
                    </div>

                    {conversations.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {conversations.map((conv) => (
                                <button
                                    key={conv.sender_email}
                                    onClick={() => loadConversation(conv.sender_email)}
                                    className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                        selectedConversation === conv.sender_email
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {conv.sender_name}
                                        </h3>
                                        {conv.unread_count > 0 && (
                                            <span className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
                                                {conv.unread_count}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {conv.sender_email}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {formatDate(conv.last_message_at)}
                                    </p>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p>No messages yet</p>
                        </div>
                    )}
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {selectedConversation && selectedConv ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {selectedConv.sender_name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedConv.sender_email}
                                </p>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.is_from_graduate ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] rounded-lg p-3 ${
                                                message.is_from_graduate
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                            }`}
                                        >
                                            {!message.is_from_graduate && (
                                                <p className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
                                                    {message.sender_name}
                                                </p>
                                            )}
                                            <p className="whitespace-pre-wrap">{message.message}</p>
                                            <p
                                                className={`text-xs mt-1 ${
                                                    message.is_from_graduate
                                                        ? 'text-blue-200'
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}
                                            >
                                                {formatDate(message.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Reply Form */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <form onSubmit={sendReply} className="flex space-x-2">
                                    <textarea
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                sendReply(e);
                                            }
                                        }}
                                        placeholder="Type your reply... (Press Enter to send, Shift+Enter for new line)"
                                        rows={2}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSending || !replyMessage.trim()}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSending ? 'Sending...' : 'Send'}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-lg">Select a conversation to view messages</p>
                        </div>
                    )}
                </div>
            </div>
        </GraduateLayout>
    );
}
