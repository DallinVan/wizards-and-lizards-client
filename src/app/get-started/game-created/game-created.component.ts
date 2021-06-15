import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/services/game-state/game-state.service';

@Component({
  selector: 'app-game-created',
  templateUrl: './game-created.component.html',
  styleUrls: ['./game-created.component.scss']
})
export class GameCreatedComponent implements OnInit {

  constructor(private router: Router, private gameStateService: GameStateService) { }

  ngOnInit() {
    // this.gameStateService.gameState$
  }

  joinGame() {
    this.router.navigate(['/join-game']);
  }

}
