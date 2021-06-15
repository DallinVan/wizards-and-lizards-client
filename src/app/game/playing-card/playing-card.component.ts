import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playing-card',
  templateUrl: './playing-card.component.html',
  styleUrls: ['./playing-card.component.scss']
})
export class PlayingCardComponent implements OnInit {

  @Input() cardSuit = 'S';
  @Input() cardValue = 'A';
  @Input() selected = false;
  cardUrl = '../../../assets/cards/AS.svg';
  isJoker = false;

  constructor() { }

  ngOnInit() {
    if (this.cardSuit === 'joker' || this.cardValue === 'joker') {
      this.isJoker = true;
    }
    this.cardUrl = `../../../assets/cards/${this.cardValue}${this.cardSuit}.svg`;
  }

}
