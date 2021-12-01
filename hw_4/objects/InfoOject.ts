import User from './User';
import Game from './Game';

export default interface InfoObject {
    users: Array<User>;
    games: Array<Game>;
}