export interface BlogType {
    _id: string;
    id: string;
    img: string;
    title: string;
    author: string;
    descr: string;
    excerpt: string;
    featured: boolean;
    comments: CommentType[];
    totalLikes: number;
    usersLikes: { email: string }[];
    date: string;
}

export interface CommentType {
    email: string;
    name: string;
    comment: string;
    id: string;
}

export interface BlogListState {
    blogs: BlogType[];
    chosenBlog: BlogType | {};
}
