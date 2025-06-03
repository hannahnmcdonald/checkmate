export interface User {
    id: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    first_name: string;
    last_name: string;
    username: string;
    avatar?: string;
    friends?: number[];
    games?: number[];
    wins?: object;
    losses?: object;
    ties?: object;
  }