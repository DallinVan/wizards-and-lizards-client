import { Component, OnInit } from '@angular/core';
import { GameStateService } from './services/game-state/game-state.service';
import { HttpClient } from '@angular/common/http';
// import * as cardsJS from 'cardsJS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  yourTurn = false;
  playerId = '';
  gameId = '';

  constructor(private gameStateService: GameStateService, private httpClient: HttpClient) {}

  ngOnInit() {
    // this.gameStateService.gameState$.subscribe(gameState => {
    //   this.yourTurn = this.playerId === gameState.whosTurn;
    // });
  }

  joinGame(gameId: string, playerId: string) {
    this.playerId = playerId;
    this.gameId = gameId;
    this.gameStateService.joinGame(gameId, playerId);
  }

  takeTurn() {
    this.httpClient.post(
      `http://localhost:8080/games/${this.gameId}/players/${this.playerId}/turn`,
      this.playerId
    ).subscribe();
  }
}
