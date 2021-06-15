import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  static playersInOrder(game: any) {
    if (!game || !game.players) {
      return [];
    }

    const playersInOrder = [];
    playersInOrder.push(game.players.find(p => p.id === game.firstPlayer));
    while (playersInOrder.length < game.players.length) {
      playersInOrder.push(game.players.find(p => p.id === playersInOrder[playersInOrder.length - 1].nextPlayer));
    }

    return playersInOrder;
  }
}
