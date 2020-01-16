import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gameJoined = false;
  subs: Subscription[] = [];
  gameState$: Subject<any> = new Subject<any>();

  constructor(private socket: Socket, private httpClient: HttpClient) {
    this.subs.push(

      this.socket.fromEvent<boolean>('join_game_result').subscribe(result => {
        this.gameJoined = result;
        console.log('Game joined: ' + this.gameJoined);
      }),

      this.socket.fromEvent<any>('game_state').subscribe(gameState => {
        console.log(gameState);
        this.gameState$.next(gameState);
      })

    );
    
  }

  joinGame(gameId, playerId) {
    this.httpClient.post(`http://localhost:8080/games/${gameId}/players/${playerId}`, null)
      .toPromise()
      .then((gameState) => {
        this.socket.emit('join_game', gameId);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
