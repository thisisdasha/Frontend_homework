import InfoObject from "./InfoOject";
import Worker from "./CurrentWorkers";
import User from "./User";
import PlayRecord from "./PlayRecord";
import Game from "./Game";

export default class UserWorker extends Worker {
    get worker(): InfoObject['users'] {
        return this.database.users;
    }

    public findIndex(id: User['id']): number {
        return this.worker.findIndex((val) => val.id === id);
    }

    public find(id: User['id']): User {
        return this.worker[this.findIndex(id)];        
    }

    public getAll() {
        return this.worker;
    }

    public create(username: User['username']) {
        const id = this.worker.length === 0 ? 1 : this.worker[this.worker.length - 1].id + 1;
        const user: User = {username, id, games: []};
        this.worker.push(user);
        return { id };
    }

    public updateUsername(id: User['id'], username: User['username']) {
        const idx = this.findIndex(id)
        if (idx === -1) {
            throw new Error("MISSING USER WITH ID");
        }
        this.worker[idx].username = username;
        return { id };
    }

    public delete(id: User['id']) {
        const idx = this.findIndex(id)
        if (idx === -1) {
            throw new Error("MISSING USER WITH ID");
        }
        const user = this.worker.splice(idx, 1)[0];
        user.id = 0;

        this.worker.unshift(user);
    }

    public findUserGames(id: User['id']) {
        const user = this.find(id);
        if (!user) {
            throw new Error("MISSING USER WITH ID");
        }
        return user.games;
    }

    public findUserGame (
        id: User['id'],
        gameId: PlayRecord['game']['id']) {
        const games = this.findUserGames(id);
        return games.find(game => game.game.id === gameId);
    }

    public addGame(id: User['id'], game: PlayRecord['game'] ) {
        const games = this.findUserGames(id);
        const installedGame = games.find(g => g.game.id === game.id);
        if (installedGame) {
            installedGame.installed = true;
        } else {
            games.push({
                game,
                playTime: 0,
                installed: true
            });
        }
    }

    public addGamePlayTime(id: User['id'], gameId: Game['id'], playTime: number) {
        const game = this.findUserGame(id, gameId);
        if (!game || !game.installed) {
            throw new Error("MISSING USER WITH ID");
        }

        game.playTime += playTime;
    }

    public deleteGameFromAllUsers(id: Game['id']) {
        this.worker.forEach(user => {
            user.games = user.games.filter(game => game.game.id !== id);
        })
    }

    public deleteGame(id: User['id'], gameId: Game['id']) {
        const game = this.findUserGame(id, gameId);
        if (!game) {
            throw new Error("MISSING USER WITH ID");
        }
        game.installed = false;
    }
}