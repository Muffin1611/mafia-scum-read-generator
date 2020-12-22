import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/player';

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.scss']
})
export class ReadListComponent implements OnInit {

  constructor() { }

  players: Team[] = [
    new Team('Dr. Monkey', 'Vincent Alexander', true),
    new Team('Blargonaut', 'Lone_Prodigy', true),
    new Team('Android Sophia', 'EzekelRAGE', true),
    new Team('Funky Dude Sparks', 'Poltergust', true),
    new Team('SalvaPot', 'nin', true),
    new Team('Uzzy', 'Fanto', true),
    new Team('Faddy', 'malus', true),
    new Team('LuxCommander', 'Terrabyte20xx', true),
    new Team('Hawthorn', 'jman1954goat', true),
    new Team('The Bear', 'Sawneeks', true),
    new Team('Geno', 'Terraforce', true),
    new Team('Fireblend', 'weemadarthur', true),
    new Team('TheChuggernaut', 'MrHedin', true),
    new Team('AllThingsPurple', 'A Wild Ambulance Appears', true),
  ];
  
  result: Team[] = [];

  ngOnInit() {
    const shuffledPlayers = this.shuffle(this.players);
    shuffledPlayers.push(new Team('Sorian', 'Muffin', true));
    this.result = shuffledPlayers;
  }

  shuffle(array: Team[]) {
    var currentIndex: number = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

}
