interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface ChatResponse {
    success: boolean;
    message?: string;
    error?: string;
}
