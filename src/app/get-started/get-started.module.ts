import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GetStartedRoutingModule } from './get-started-routing.module';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { SelectTeamComponent } from './select-team/select-team.component';
import { GameCreatedComponent } from './game-created/game-created.component';
import { SelectColorComponent } from './select-color/select-color.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewGameComponent,
    JoinGameComponent,
    SelectTeamComponent,
    GameCreatedComponent,
    SelectColorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GetStartedRoutingModule
  ]
})
export class GetStartedModule { }
