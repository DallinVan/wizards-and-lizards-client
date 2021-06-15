import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  newGameFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newGameFormGroup = this.formBuilder.group({
      team1: ['Wizards', [Validators.required]],
      team2: ['Lizards', [Validators.required]],
      numberOfPlayers: [4, [Validators.required]],
      ruleSet: ['default', [Validators.required]],
      numberOfJokers: [3, [Validators.required]]
    });
  }

  createNewGame() {
    if (this.newGameFormGroup.valid) {
      this.gameStateService.createGame({
        ...this.newGameFormGroup.value,
        numberOfJokers: +this.newGameFormGroup.controls.numberOfJokers.value,
        numberOfPlayers: +this.newGameFormGroup.controls.numberOfPlayers.value
      }).subscribe(
        newGame => {
          this.router.navigate(['/game-created']);
        },
        err => console.log
      );;
    }
  }

}
