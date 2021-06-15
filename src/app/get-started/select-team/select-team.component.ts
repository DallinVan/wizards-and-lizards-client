import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit {

  selectTeamFormGroup: FormGroup;
  teams: string[][];
  private player: any;
  private gameId;

  constructor(
    private formBuilder: FormBuilder,
    private gameStateService: GameStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectTeamFormGroup = this.formBuilder.group({
      teamId: ['', [Validators.required]]
    });
    
    this.gameStateService.gameState$.subscribe((game: any) => {
      this.teams = [];
      for (let i = 0; i < game.teams.length; i++) {
        this.teams.push(game.players.filter(p => p.teamId === game.teams[i]));
      }

      this.gameId = game.id;
      // this.gameStateService.getTeams(game.id).pipe(
      //   take(1)
      // ).subscribe((teams: string[]) => {
      //   this.teams = teams;
      // });
    });
  }

  addPlayerToTeam() {
    if (this.selectTeamFormGroup.valid) {
      // Get player
      const player = this.gameStateService.player;

      // Update the player's team
      this.gameStateService.updatePlayer(this.gameId, {
        ...player,
        teamId: this.selectTeamFormGroup.controls.teamId.value
      }).subscribe(game => {
        this.router.navigate(['/select-color']);
      });
    }
  }

}
