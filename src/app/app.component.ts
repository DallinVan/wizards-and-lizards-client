import { Component, OnInit } from '@angular/core';
import { GameStateService } from './services/game-state/game-state.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
// import * as cardsJS from 'cardsJS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // yourTurn = false;
  // playerId = '';
  // gameId = '';
  // joinableGames = [];

  constructor(private gameStateService: GameStateService, private httpClient: HttpClient) {}

  ngOnInit() {
    // this.gameStateService.gameState$.subscribe(gameState => {
    //   this.yourTurn = this.playerId === gameState.whosTurn;
    // });
    // this.gameStateService.getJoinableGames$.subscribe(games => {
    //   this.joinableGames = games;
    // });;
  }

  // joinGame(gameId: string, playerId: string) {
  //   this.playerId = playerId;
  //   this.gameId = gameId;
  //   this.gameStateService.joinGame(gameId, playerId);
  // }

  takeTurn() {
    // this.gameStateService.takeTurn(this.gameId, this.playerId);
  }

  // addTeams(gameId, team1, team2) {
  //   forkJoin([
  //     this.gameStateService.addTeam(gameId, team1),
  //     this.gameStateService.addTeam(gameId, team2)
  //   ]).pipe(
  //     tap(console.log)
  //   ).subscribe(() => {
  //     console.log('Teams added!');
  //   });
  // }
}
