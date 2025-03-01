import React, { useState } from 'react';
import { Button, Rate, Input, Avatar, Dropdown, MenuProps } from 'antd';
import { MoreHorizontal, MessageCircle, ThumbsUp, Star } from 'lucide-react';
import moment from 'moment';

// Type definitions
interface Reply {
    id: number;
    userId: number;
    userName: string;
    avatar: string;
    content: string;
    createdAt: string;
    likes: number;
    replies?: Reply[];
}

interface Review {
    id: number;
    userId: number;
    userName: string;
    avatar: string;
    rating: number;
    content: string;
    createdAt: string;
    likes: number;
    replies: Reply[];
}

interface NewReview {
    rating: number;
    content: string;
}

interface UserInfo {
    id: number;
    username: string;
    email: string;
}

interface CommentProps {
    comment: Review | Reply;
    isReply?: boolean;
    parentId?: number;
}

// Mock data
const mockReviews: Review[] = [
    {
        id: 1,
        userId: 1,
        userName: "Nguyễn Văn A",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        rating: 5,
        content: "Sản phẩm rất tốt, đóng gói cẩn thận, ship nhanh!",
        createdAt: "2024-03-25T10:30:00",
        likes: 12,
        replies: [
            {
                id: 101,
                userId: 3,
                userName: "Trần Văn C",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
                content: "Bạn dùng sản phẩm được bao lâu rồi?",
                createdAt: "2024-03-25T11:00:00",
                likes: 2,
                replies: [
                    {
                        id: 1001,
                        userId: 1,
                        userName: "Nguyễn Văn A",
                        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
                        content: "Mình dùng được 2 tuần rồi bạn nhé",
                        createdAt: "2024-03-25T11:15:00",
                        likes: 1
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        userId: 2,
        userName: "Lê Thị B",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        rating: 4,
        content: "Sản phẩm OK, nhưng giá hơi cao",
        createdAt: "2024-03-24T15:45:00",
        likes: 8,
        replies: []
    }
];

const ReviewSection: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
    const [newReview, setNewReview] = useState<NewReview>({ rating: 5, content: '' });
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState<string>('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}') as UserInfo;

    const handleAddReview = (): void => {
        if (!newReview.content.trim()) return;

        const review: Review = {
            id: reviews.length + 1,
            userId: userInfo.id,
            userName: userInfo.username || 'Người dùng',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.id}`,
            rating: newReview.rating,
            content: newReview.content,
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: []
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, content: '' });
        setShowReviewForm(false);
    };

    const handleAddReply = (reviewId: number, parentReplyId?: number): void => {
        if (!replyContent.trim()) return;

        const newReply: Reply = {
            id: Date.now(),
            userId: userInfo.id,
            userName: userInfo.username || 'Người dùng',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.id}`,
            content: replyContent,
            createdAt: new Date().toISOString(),
            likes: 0
        };

        const updatedReviews = reviews.map(review => {
            if (review.id === reviewId) {
                if (parentReplyId) {
                    // Add reply to nested reply
                    return {
                        ...review,
                        replies: review.replies.map(reply =>
                            reply.id === parentReplyId
                                ? { ...reply, replies: [...(reply.replies || []), newReply] }
                                : reply
                        )
                    };
                }
                // Add reply to review
                return {
                    ...review,
                    replies: [...review.replies, newReply]
                };
            }
            return review;
        });

        setReviews(updatedReviews);
        setReplyingTo(null);
        setReplyContent('');
    };

    const dropdownItems: MenuProps['items'] = [
        { key: '1', label: 'Báo cáo' },
        { key: '2', label: 'Chỉnh sửa' },
        { key: '3', label: 'Xóa' }
    ];

    const Comment: React.FC<CommentProps> = ({ comment, isReply = false, parentId }) => {
        const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
        const [liked, setLiked] = useState<boolean>(false);

        return (
            <div className={`flex gap-4 ${isReply ? 'ml-12' : ''}`}>
                <Avatar src={comment.avatar} size={40} />
                <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-medium">{comment.userName}</span>
                                {!isReply && 'rating' in comment && (
                                    <Rate disabled defaultValue={comment.rating} className="ml-2 text-sm" />
                                )}
                            </div>
                            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
                                <Button type="text" icon={<MoreHorizontal size={16} />} />
                            </Dropdown>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.content}</p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                            <button
                                className={`flex items-center gap-1 hover:text-blue-600 ${liked ? 'text-blue-600' : ''}`}
                                onClick={() => setLiked(!liked)}
                            >
                                <ThumbsUp size={14} />
                                <span>{comment.likes + (liked ? 1 : 0)}</span>
                            </button>
                            <button
                                className="flex items-center gap-1 hover:text-blue-600"
                                onClick={() => setShowReplyInput(!showReplyInput)}
                            >
                                <MessageCircle size={14} />
                                <span>Trả lời</span>
                            </button>
                            <span>{moment(comment.createdAt).fromNow()}</span>
                        </div>
                    </div>

                    {showReplyInput && (
                        <div className="mt-3">
                            <Input.TextArea
                                placeholder="Viết câu trả lời..."
                                rows={2}
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <div className="mt-2 space-x-2">
                                <Button
                                    type="primary"
                                    onClick={() => handleAddReply(parentId || comment.id, isReply ? comment.id : undefined)}
                                >
                                    Gửi
                                </Button>
                                <Button onClick={() => setShowReplyInput(false)}>Hủy</Button>
                            </div>
                        </div>
                    )}

                    {'replies' in comment && comment.replies?.map((reply) => (
                        <div key={reply.id} className="mt-3">
                            <Comment comment={reply} isReply parentId={comment.id} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const calculateAverageRating = (): number => {
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return total / reviews.length;
    };

    return (
        <section className="mt-8 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Đánh giá sản phẩm</h2>

            {/* Review Summary */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold text-gray-900">
                        {calculateAverageRating().toFixed(1)}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>
                        <div className="text-sm text-gray-500">{reviews.length} đánh giá</div>
                    </div>
                </div>

                {userInfo && !showReviewForm && (
                    <Button type="primary" onClick={() => setShowReviewForm(true)}>
                        Viết đánh giá
                    </Button>
                )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-4">Đánh giá của bạn</h3>
                    <Rate
                        value={newReview.rating}
                        onChange={value => setNewReview({ ...newReview, rating: value })}
                        className="mb-4"
                    />
                    <Input.TextArea
                        rows={4}
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                        value={newReview.content}
                        onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                        className="mb-4"
                    />
                    <div className="flex justify-end space-x-2">
                        <Button onClick={() => setShowReviewForm(false)}>Hủy</Button>
                        <Button type="primary" onClick={handleAddReview}>
                            Đăng đánh giá
                        </Button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map(review => (
                    <Comment key={review.id} comment={review} parentId={review.id} />
                ))}
            </div>
        </section>
    );
};

export default ReviewSection;
