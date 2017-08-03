
export const SizePet = {
	SMALL: "small",
	MEDIUM: "medium",
	LARGE: "large"
};

export const KindPet = {
	DOG: "dog",
	CATE: "cat",
	OTHERS: "others"
};

export const GenrePet = {
	MALE: "male",
	FEMALE: "female"
};

export interface Pet {
    _id: string;
    _userId: string;
    name: string;
    kind: string;
    breed: string;
    about: string;
    size: string;
    genre: string,
    ageYears: number,
    ageMonths: number,
    pictures: Array<{
        position: Number,
        picture: String
    }>;
};
