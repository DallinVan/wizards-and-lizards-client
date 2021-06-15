import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription, Subject, Observable, throwError, ReplaySubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gameJoined = false;
  playerId = null;
  player: any = {};
  subs: Subscription[] = [];

  gameStateSubject: Subject<any> = new ReplaySubject<any>(1);
  gameState$: Observable<any> = this.gameStateSubject.asObservable();

  constructor(private socket: Socket, private httpClient: HttpClient) {
    this.subs.push(

      this.socket.fromEvent<boolean>('join_game_result').subscribe(result => {
        this.gameJoined = result;
        console.log('Game joined: ' + this.gameJoined);
      }),

      this.socket.fromEvent<any>('game_state').subscribe(gameState => {
        console.log('Received game state from socket channel: ' + gameState);
        this.gameStateSubject.next(gameState);
      })

    );

    this.gameState$.subscribe(game => {
      if (game && this.playerId) {
        this.player = game.players.find(p => p.id === this.playerId);
      }
    });
    
  }

  createGame(payload: any) {
    return this.httpClient.post(
      `${BASE_URL}/games`,
      payload
    ).pipe(
      tap((game: any) => {
        if (game && game.id) {
          this.gameStateSubject.next(game);
        }
      })
    );
  }

  getGame(gameId) {
    return this.httpClient.get(`${BASE_URL}/games/${gameId}`)
      .pipe(
        tap((game: any) => {
          if (game && game.id) {
            this.gameStateSubject.next(game);
          }
        })
      );
  }

  getJoinableGames(): Observable<any> { 
    return this.httpClient.get(`${BASE_URL}/games?status=created`)
      .pipe(
        tap(console.log)
      );
  }

  joinGame(gameId, playerId) {
    return this.httpClient.post(`${BASE_URL}/games/${gameId}/players/${playerId}`, null)
      .pipe(
        tap((game: any) => {
          console.log('Telling socket to join game');
          this.socket.emit('join_game', game.id);
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  takeTurn(gameId, playerId, cardToPlay) {
    this.httpClient.post(
      `${BASE_URL}/games/${gameId}/players/${playerId}/turn`,
      {
        cardToPlay: cardToPlay
      }
    ).subscribe();
  }

  addTeam(gameId, teamId) {
    return this.httpClient.post(
      `${BASE_URL}/games/${gameId}/teams/${teamId}`,
      teamId
    );
  }

  getTeams(gameId) {
    return this.httpClient.get(
      `${BASE_URL}/games/${gameId}/teams`
    );
  }

  updatePlayer(gameId, playerObj) {
    return this.httpClient.put(
      `${BASE_URL}/games/${gameId}/players/${playerObj.id}`,
      playerObj
    );
  }
}
