import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  joinableGames: any[];
  joinGameFormGroup: FormGroup;

  constructor(
    private gameStateService: GameStateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.joinGameFormGroup = this.formBuilder.group({
      playerName: ['', [Validators.required]],
      gameId: ['', [Validators.required]]
    })

    this.gameStateService.getJoinableGames().subscribe(games => {
      if (games.length === 0) {
        this.router.navigate(['/new-game']);
        return;
      }
      this.joinableGames = games;
    });
  }

  joinGame() {
    if (this.joinGameFormGroup.valid) {
      // this.gameStateService.gameState$.subscribe(game => {
      //   console.log('Got game state');
      //   this.router.navigate(['/select-team']);
      // });

      this.gameStateService.joinGame(
        this.joinGameFormGroup.controls.gameId.value,
        this.joinGameFormGroup.controls.playerName.value
      ).subscribe(game => {
        this.gameStateService.playerId = this.joinGameFormGroup.controls.playerName.value;
        this.router.navigate(['/select-team']);
      });
    }
  }

}
