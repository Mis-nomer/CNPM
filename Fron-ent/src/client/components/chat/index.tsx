import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendMessageToOpenAI } from '@/api/chatbot';

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleChat = (): void => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            const userMessage: Message = {
                text: message.trim(),
                sender: 'user'
            };
            setMessages(prev => [...prev, userMessage]);
            setMessage('');
            setIsLoading(true);

            try {
                const response = await sendMessageToOpenAI(message);

                if (response.success && response.message) {
                    const botMessage: Message = {
                        text: response.message,
                        sender: 'bot'
                    };
                    setMessages(prev => [...prev, botMessage]);
                } else {
                    const errorMessage: Message = {
                        text: response.error || 'Sorry, something went wrong. Please try again.',
                        sender: 'bot'
                    };
                    setMessages(prev => [...prev, errorMessage]);
                }
            } catch (error) {
                const errorMessage: Message = {
                    text: 'An error occurred while sending the message. Please try again.',
                    sender: 'bot'
                };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleChat}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
                    <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                        <h3 className="font-medium">Chat Bot</h3>
                    </div>

                    <div className="h-96 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'
                                    }`}
                            >
                                <div
                                    className={`inline-block p-2 rounded-lg ${msg.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                        } max-w-[80%] break-words`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-center text-gray-500">
                                <div className="animate-pulse">Bot is typing...</div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                disabled={isLoading}
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatButton;
