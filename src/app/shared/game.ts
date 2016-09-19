export class Game {
    public result?: Object;
    public wentToOvertime?: boolean;
    public date?: Date;
    public hasBeenPlayed: boolean;
    public teams: string[];

    constructor(rawData: Object) {
        for (let field in rawData) {
            this[field] = rawData[field];
        }
        this.hasBeenPlayed = (typeof this.date != 'undefined' && typeof this.result != 'undefined');
    }
}
