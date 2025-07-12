export type Notification = {
    id: string;
    user_id: string;
    type: "friend_request" | "match_invite" | "match_result" | "general";
    message: string;
    read: boolean;
    created_at: string;
    metadata?: Record<string, any>;
}