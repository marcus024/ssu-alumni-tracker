import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChatMessage, PageProps } from '@/types';
import { FormEventHandler, useEffect, useRef } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

interface ChatProps extends PageProps {
    messages: ChatMessage[];
}

export default function Chat({ messages, auth }: ChatProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { data, setData, post, reset, processing } = useForm({
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/chat', {
            onSuccess: () => reset('message'),
        });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout header="Public Chat">
            <Head title="Public Chat" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg flex flex-col h-[calc(100vh-16rem)]">
                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.user_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                            msg.user_id === auth.user.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold">
                                                {msg.user?.name || 'Unknown User'}
                                            </span>
                                            <span
                                                className={`text-xs ${
                                                    msg.user_id === auth.user.id
                                                        ? 'text-blue-200'
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}
                                            >
                                                {formatTime(msg.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 dark:text-gray-400">
                                    No messages yet. Start the conversation!
                                </p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <form onSubmit={submit} className="flex gap-2">
                            <input
                                type="text"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                disabled={processing}
                            />
                            <PrimaryButton type="submit" disabled={processing || !data.message.trim()}>
                                Send
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
