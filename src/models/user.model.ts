export interface User {
    _id: string;
    email: string;
    description: string;
    name: string;
    picture: string;
    loc: {
        type: string,
        coordinates: Array<number>
    }
}
