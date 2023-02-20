export interface UserType {
    name: string;
    about: string;
    image: string;
    likes?: LikeType[];
    comments?: string[];
}

interface LikeType {
    blogId: string;
    totalLikes: number;
    isLiked: boolean;
}
