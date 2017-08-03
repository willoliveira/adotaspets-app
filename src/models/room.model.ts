import { User } from './user.model.ts';

export const RoomType = {
    SINGLE: "single",
	GROUP: "group"
};

export interface Room {
    _id: string;
    participants: Array<string>;
    type: string
};
