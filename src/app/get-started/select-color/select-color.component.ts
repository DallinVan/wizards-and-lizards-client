import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { Router } from '@angular/router';
import * as colors from '../../../colors';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss']
})
export class SelectColorComponent implements OnInit {

  selectColorFormGroup: FormGroup;
  gameId: any;
  colors: string[];

  constructor(
    private formBuilder: FormBuilder,
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectColorFormGroup = this.formBuilder.group({
      color: ['', [Validators.required]]
    });

    this.gameStateService.gameState$.subscribe((game: any) => {
      this.colors = [];
      this.gameId = game.id;
      game.colors.forEach(c => {
        if (!game.players.find(p => p.color === c)) {
          this.colors.push(c);
        }
      });
    });
  }

  selectColor() {
    if (this.selectColorFormGroup.valid) {
      const player = this.gameStateService.player;

      this.gameStateService.updatePlayer(
        this.gameId,
        {
          ...player,
          teamId: null, // Don't update the team
          color: this.selectColorFormGroup.controls.color.value
        }
      ).subscribe(game => {
        this.router.navigate(['/waiting-room']);
      });
    }
  }

}
