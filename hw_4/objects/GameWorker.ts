import InfoObject from "./InfoOject";
import Worker from "./CurrentWorkers";
import Game from "./Game";

export default class UserWorker extends Worker {
    get worker(): InfoObject['games'] {
        return this.database.games;
    }

    public findIndex(id: Game['id']): number {
        return this.worker.findIndex((val) => val.id === id);
    }

    public findOne(id: Game['id']) {
        return this.worker[this.findIndex(id)];
    }

    public getAll() {
        return this.worker;
    }

    public create(game: Omit<Game, 'id'>) {
        const id = this.worker.length === 0 ? 1 : this.worker[this.worker.length - 1].id + 1;
        this.worker.push({ id, ...game });
        return { id };
    }

    public update(game: Game) {
        const idx = this.findIndex(game.id);
        if (idx === -1) {
            throw new Error("MISSING GAME WITH ID");
        }
        this.worker.splice(idx, 1, game);
        return idx !== -1;
    }

    public delete(id: Game['id']) {
        const idx = this.findIndex(id);
        if (idx === -1) {
            throw new Error("MISSING GAME WITH ID");
        }
        this.worker.splice(idx, 1);
        return idx !== -1;
    }
}