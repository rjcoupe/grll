import { Game } from './game';
import { Player } from './player';

import { environment } from '../../environments/environment';

export class Team {
    public name: string;
    public players: Player[];
    public games: Array<Game> = [];

    public wins: number = 0;
    public suddenDeathLosses: number = 0; // Sudden death losses
    public normalTimeLosses: number = 0;  // Normal time losses
    public penalties: number = 0;
    public goalsScored: number = 0;
    public goalsConceded: number = 0;
    public goalDifference: number = 0;

    public gamesPlayed: number = 0;
    public points: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    determineGameResults(games: Game[]) {
        this.games = games;
        games.forEach((game) => {
            if (!game.hasBeenPlayed) {
                return;
            }
            let teamFoundInGame: boolean = false;
            let thisTeamScored: number;
            let thisTeamConceded: number;
            for (let index in game.result) {
                let teamName: string = game.result[index]['team'];
                let goals: number = game.result[index]['goals'];
                if (teamName == this.name) {
                    teamFoundInGame = true;
                    thisTeamScored = goals;
                } else {
                    thisTeamConceded = goals;
                }
            }
            if (teamFoundInGame == false) {
                return;
            }

            this.goalsScored += thisTeamScored;
            this.goalsConceded = thisTeamConceded;

            if (thisTeamScored > thisTeamConceded) {
                // Win!
                this.wins += 1;
            } else {
                if (thisTeamScored < thisTeamConceded) {
                    console.log(game);
                    if (game.wentToOvertime) {
                        // Sudden death loss
                        this.suddenDeathLosses += 1;
                    } else {
                        // Normal time loss
                        this.normalTimeLosses += 1;
                    }
                }
            }
        });
        this.goalDifference = this.goalsScored - this.goalsConceded;
        this.points = this._calculatePoints();
    }


    private _calculatePoints(): number {
        let points = 0;
        points += environment['points']['win'] * this.wins
        points += environment['points']['overtimeLoss'] * this.suddenDeathLosses;
        points += environment['points']['loss'] * this.normalTimeLosses;
        points += environment['points']['penalty'] * this.penalties;
        this.gamesPlayed = this.wins + this.suddenDeathLosses + this.normalTimeLosses + this.penalties;
        return points;
    }
}
