export interface User {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    password: string;
}
  
export interface InsertUserPayload {
    id: string; 
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
}