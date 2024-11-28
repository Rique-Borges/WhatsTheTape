
export type User= {
    id: string;
    name: string;
    username: string;
    image?: string;
}
export type  TrackType = {
    id:string;
    content: string;
    user: User;
    createdAt:string;
    image?: string;
    numberOfComments?: number,
    numberOfReplays?: number,
    numberOfLikes?: number,
    impressions?: number,
 }