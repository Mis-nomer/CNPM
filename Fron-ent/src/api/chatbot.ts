import axios from 'axios';


interface OpenAIResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

export const sendMessageToOpenAI = async (message: string): Promise<ChatResponse> => {
    try {
        const response = await axios.post<OpenAIResponse>(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "o1-preview-2024-09-12",
                messages: [{
                    role: "user",
                    content: message
                }],
                temperature: 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                }
            }
        );

        return {
            success: true,
            message: response.data.choices[0].message.content
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data?.error?.message?.includes('quota')) {
                return {
                    success: false,
                    error: 'Xin lỗi, dịch vụ chat hiện đang tạm ngưng. Vui lòng thử lại sau.'
                };
            }
            return {
                success: false,
                error: 'Có lỗi xảy ra, vui lòng thử lại sau.'
            };
        }
        return {
            success: false,
            error: 'Đã có lỗi không xác định xảy ra'
        };
    }
};
