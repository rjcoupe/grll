import { Component, OnInit } from '@angular/core';
import { Game } from './shared/game';
import { Team } from './shared/team';
import { GameService } from './game.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public teams: Team[];
    public games: Game[] = [];

    constructor(private gameService: GameService, private teamService: TeamService) {}

    ngOnInit() {
        // MUST be done in this order!
        this._getTeams();
        this._getGames();
    }

    private _getGames() {
        this.gameService.getGames()
            .subscribe(
                (games) => {
                    this.games = games;
                    console.log(games);
                }
            );
    }

    private _getTeams() {
        this.teamService.getTeams()
            .subscribe(
            (teams) => {
                this.teams = teams;
            },
            (error) => {
                console.log(error);
            });
    }

}
