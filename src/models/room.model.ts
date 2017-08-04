import { User } from './user.model';

export const RoomType = {
    SINGLE: "single",
	GROUP: "group"
};

export interface Room {
    _id: string;
    participants: Array<User>;
    type: string
};
