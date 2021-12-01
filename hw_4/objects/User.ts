import PlayRecord from "./PlayRecord";

export default interface User {
    id: number;
    username: string;
    games: Array<PlayRecord>;
}