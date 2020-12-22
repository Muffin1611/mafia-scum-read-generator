import { Component, OnInit } from '@angular/core';
import { isPlayer, Player, Team } from 'src/app/models/player';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.scss'],
})
export class ReadListComponent implements OnInit {
  constructor(private dataService: DataService) {}

  result: Team[] = [];

  dataPlayers: Array<Player> = [];

  dataTeams: Array<Team> = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getData('test').subscribe((data) => {
      const keys = Object.keys(data.players);
      keys.forEach((key) => {
        if (isPlayer(data.players[key]))
          this.dataPlayers.push(data.players[key] as Player);
      });
      this.dataPlayers.forEach((player) => {
        const partner = this.dataPlayers.filter(
          (partner) =>
            partner.name.toLowerCase() == player.partner.toLowerCase()
        )[0];
        const alive =
          player.status == 'alive' && partner.status == 'alive' ? true : false;
        if (
          !this.dataTeams.filter(
            (team) =>
              team.name1.toLowerCase() == player.name.toLowerCase() ||
              team.name2.toLowerCase() == player.name.toLowerCase()
          ).length
        ) {
          this.dataTeams.push(new Team(player.name, partner.name, alive));
        }
      });
      this.totallyLegitShuffleAlgorithm();
    });
  }

  totallyLegitShuffleAlgorithm() {
    let shuffledTeams = this.shuffle(this.dataTeams);
    const townIndex = shuffledTeams.findIndex(
      (team) => team.name1 == 'Muffin' || team.name2 == 'Muffin'
    );
    const townTeam = shuffledTeams.splice(townIndex, 1);
    shuffledTeams = shuffledTeams.concat(townTeam);
    this.result = shuffledTeams;
  }

  shuffle(array: Team[]) {
    var currentIndex: number = array.length,
      temporaryValue,
      randomIndex;

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
