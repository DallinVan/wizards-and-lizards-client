import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  game: any = null;
  message = 'The game will begin shortly, waiting for all players to join...';

  constructor(
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameStateService.gameState$.subscribe(game => {
      this.game = game;
      if (this.game.status === 'in-progress') {
        this.message = 'Starting game...';
        setTimeout(() => {
          this.router.navigate(['/game']);
        }, 3000);
      }
    });
  }

}
