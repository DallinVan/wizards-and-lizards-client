import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-identifier',
  templateUrl: './player-identifier.component.html',
  styleUrls: ['./player-identifier.component.scss']
})
export class PlayerIdentifierComponent implements OnInit {

  @Input() playerId = 'player';
  @Input() teamId = 'team';
  @Input() playersTurn = false;
  @Input() color = 'gray';

  constructor() { }

  ngOnInit() {
  }

}
