
export type CommentType =  {
    username: string;
    text: string;
    commentAt:Date;
    id:string;
    meUser?:string;
    likeByUserId?:string[];
    meUserId?:string;
    postId?:string;
}

