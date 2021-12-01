import InfoObject from "./InfoOject";

export default abstract class Worker {
    protected database: InfoObject;

    constructor(database: InfoObject) {
        this.database = database
    }

    abstract get worker(): InfoObject[keyof InfoObject]
    
}
