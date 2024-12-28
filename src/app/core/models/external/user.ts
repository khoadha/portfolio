export interface UserApiResponse {
    results: User[];
    info: ApiInfo;
}

export interface User {
    gender: string;
    name: UserName;
    location: UserLocation;
    email: string;
    login: UserLogin;
    dob: UserDate;
    registered: UserDate;
    phone: string;
    cell: string;
    id: UserId;
    picture: UserPicture;
    nat: string;
}

export interface UserName {
    title: string;
    first: string;
    last: string;
}

export interface UserLocation {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: Coordinates;
    timezone: Timezone;
}

export interface Street {
    number: number;
    name: string;
}

export interface Coordinates {
    latitude: string;
    longitude: string;
}

export interface Timezone {
    offset: string;
    description: string;
}

export interface UserLogin {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

export interface UserDate {
    date: string;
    age: number;
}

export interface UserId {
    name: string;
    value: string | null;
}

export interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface ApiInfo {
    seed: string;
    results: number;
    page: number;
    version: string;
}
