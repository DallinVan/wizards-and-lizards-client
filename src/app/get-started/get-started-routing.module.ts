import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { SelectTeamComponent } from './select-team/select-team.component';
import { GameCreatedComponent } from './game-created/game-created.component';
import { SelectColorComponent } from './select-color/select-color.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'new-game',
    component: NewGameComponent
  },
  {
    path: 'join-game',
    component: JoinGameComponent
  },
  {
    path: 'select-team',
    component: SelectTeamComponent
  },
  {
    path: 'game-created',
    component: GameCreatedComponent
  },
  {
    path: 'select-color',
    component: SelectColorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetStartedRoutingModule { }
