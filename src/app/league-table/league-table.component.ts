import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Game } from '../shared/game';
import { Player } from '../shared/player';
import { Team } from '../shared/team';

import { GameService } from '../game.service';

@Component({
    selector: 'app-league-table',
    templateUrl: './league-table.component.html',
    styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit, OnChanges {
    @Input() games: Game[] = [];
    @Input() teams: Team[] = [];

    constructor() { }

    ngOnInit() {
        if (this.teams.length && this.games.length) {
            this._constructLeagueTable();
        }
    }

    ngOnChanges() {
        if (this.teams.length && this.games.length) {
            this._constructLeagueTable();
        }
    }

    private _constructLeagueTable() {
        this.teams.forEach((team) => {
            team.determineLeagueStatistics(this.games);
        });
        this.teams.sort(this._sortTeams);
    }


    private _sortTeams(a, b) {
        if (a.points > b.points) {
            return -1;
        } else if (b.points > a.points) {
            return 1;
        } else {
            // Equal points - separate on goals scored
            if (a.goalsScored > b.goalsScored) {
                return -1;
            } else if (b.goalsScored > a.goalsScored) {
                return 1;
            } else {
                // Equal goals scored too - separate on goal difference
                if (a.goalDifference > b.goalDifference) {
                    return -1;
                } else if (b.goalDifference > a.goalDifference) {
                    return 1;
                } else {
                    // Give up ..
                    return 0;
                }
            }
        }
    }
}
