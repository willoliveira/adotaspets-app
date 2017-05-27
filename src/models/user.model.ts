import { Pet } from './pet.model';

export interface User {
    id: string;
    email: string;
    description: string;
    name: string;
    picture: string;
    pets: Pet;
}
