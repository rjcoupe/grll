import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Team } from './shared/team';

import { environment } from '../environments/environment';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamService {
    private _teamDataUrl = environment['dataFiles']['teams'];
    public teams: Team[] = [];

    constructor(private http: Http) { }

    getTeams() {
                return this.http.get(this._teamDataUrl)
                    .map(this._mapResponse)
                    .catch(this._handleErrors);

    }

    private _mapResponse(response: Response) {
        let body = response.json();
        let teams: Team[] = [];
        for (let index in body['teams']) {
            let team = body['teams'][index];
            let t: Team = new Team(team['name']);
            t.players = team['players'];
            teams.push(t);
        }
        return teams;
    }

    private _handleErrors(error: any) {
        return Observable.throw(error.message);
    }

}
