import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GameService } from './game.service';
import { TeamService } from './team.service';

import { AppComponent } from './app.component';
import { LeagueTableComponent } from './league-table/league-table.component';
import { RostersComponent } from './rosters/rosters.component';

@NgModule({
  declarations: [
    AppComponent,
    LeagueTableComponent,
    RostersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameService, TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
