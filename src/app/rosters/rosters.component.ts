import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../shared/team';

@Component({
  selector: 'app-rosters',
  templateUrl: './rosters.component.html',
  styleUrls: ['./rosters.component.scss']
})
export class RostersComponent implements OnInit {
  @Input() public teams: Team[] = [];
  public sortedTeams: Team[];
  constructor() { }

  ngOnInit() {
    this.sortedTeams = Object.create(this.teams);
    this.sortedTeams.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        } else if (b.name > a.name) {
            return 1;
        } else {
            return 0;
        }
    });
  }

}
