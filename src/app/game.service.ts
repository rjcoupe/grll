import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Game } from './shared/game';

import { environment } from '../environments/environment';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class GameService {
  private _gameDataUrl: string = environment['dataFiles']['games'];

  constructor(private http: Http) { }

  getGames() {
    return this.http.get(this._gameDataUrl)
        .map(this._mapResponse)
        .catch(this._handleErrors)
  }

  private _mapResponse(response) {
    let body = response.json();
    let games: Game[] = [];
    for (let index in body['games']) {
        let g = new Game();
        g.result = body['games'][index]['result'];
        g.wentToOvertime = body['games'][index]['wentToOvertime'];
        games.push(g);
    }
    return games;
  }

  private _handleErrors(error: any) {
      return Observable.throw(error.message);
  }

}
