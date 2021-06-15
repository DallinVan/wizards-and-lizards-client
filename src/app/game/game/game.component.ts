import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: any;
  playersInOrder: any[] = null;
  hand: any[] = [];
  selectedCard = null;

  constructor(
    private gameStateService: GameStateService
  ) { }

  ngOnInit() {
    this.gameStateService.gameState$.subscribe(game => {
      this.game = game;
      if (!this.playersInOrder) {
        this.playersInOrder = UtilitiesService.playersInOrder(game);
        console.log(this.playersInOrder);
      }
      this.hand = game.players.find(p => p.id === this.gameStateService.playerId).deck.hand;
      this.hand.forEach(c => {
        c['selected'] = false;
      });
    });
  }

  selectCard(card: any) {
    this.hand.forEach(c => {
      c.selected = false;
    });

    this.selectedCard = card;
    card.selected = true;
  }

  playCard() {
    if (this.selectedCard) {
      this.gameStateService.takeTurn(this.game.id, this.gameStateService.playerId, this.selectedCard);
    }
  }

}
