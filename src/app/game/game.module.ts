import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { GameComponent } from './game/game.component';
import { PlayerIdentifierComponent } from './player-identifier/player-identifier.component';
import { PlayingCardComponent } from './playing-card/playing-card.component';


@NgModule({
  declarations: [WaitingRoomComponent, GameComponent, PlayerIdentifierComponent, PlayingCardComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
