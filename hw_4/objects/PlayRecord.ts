export default interface PlayRecord {
    game: {
        id: number;
        title: string;
    };
    playTime: number;
    installed: boolean;
}