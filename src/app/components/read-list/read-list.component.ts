import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameData } from 'src/app/models/game';
import {
  isPlayerWithPartner,
  isPlayer,
  PlayerWithPartner,
  Player,
  Team,
} from 'src/app/models/player';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.component.html',
  styleUrls: ['./read-list.component.scss'],
})
export class ReadListComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  result: Player[] = [];

  dataPlayers: Array<Player> = [];

  resultTeams: Team[] = [];

  dataTeamPlayers: Array<PlayerWithPartner> = [];

  dataTeams: Array<Team> = [];

  teamGame: boolean = false;

  threadNumber: string = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.threadNumber = params['thread'];
      if (this.threadNumber) {
        this.getData(this.threadNumber);
      }
    });
  }

  getData(thread: string) {
    this.dataService.getData(thread).subscribe((data) => {
      console.log(data);
      if (data.players[Object.keys(data.players)[0]].partner) {
        this.teamGame = true;
      }
      if (this.teamGame) {
        this.setTeamData(data);
        this.totallyLegitTeamShuffleAlgorithm();
      } else {
        this.setPlayerData(data);
        this.totallyLegitShuffleAlgorithm();
      }
    });
  }

  setPlayerData(data: GameData) {
    const keys = Object.keys(data.players);
    keys.forEach((key) => {
      if (isPlayer(data.players[key]))
        this.dataPlayers.push(data.players[key] as Player);
    });
  }

  setTeamData(data: GameData) {
    const keys = Object.keys(data.players);
    keys.forEach((key) => {
      if (isPlayerWithPartner(data.players[key]))
        this.dataTeamPlayers.push(data.players[key] as PlayerWithPartner);
    });
    this.dataTeamPlayers.forEach((player) => {
      const partner = this.dataTeamPlayers.filter(
        (partner) => partner.name.toLowerCase() == player.partner.toLowerCase()
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
  }

  totallyLegitTeamShuffleAlgorithm() {
    let shuffledTeams = this.shuffle(this.dataTeams) as Team[];
    const townIndex = shuffledTeams.findIndex(
      (team) => team.name1 == 'Muffin' || team.name2 == 'Muffin'
    );
    if (townIndex) {
      const townTeam = shuffledTeams.splice(townIndex, 1);
      shuffledTeams = shuffledTeams.concat(townTeam);
    }
    this.resultTeams = shuffledTeams;
  }

  totallyLegitShuffleAlgorithm() {
    let shuffledPlayers = this.shuffle(this.dataPlayers) as Player[];
    const townIndex = shuffledPlayers.findIndex(
      (player) => player.name.toLowerCase() == 'muffin'
    );
    if (townIndex) {
      const muffin = shuffledPlayers.splice(townIndex, 1);
      shuffledPlayers = shuffledPlayers.concat(muffin);
    }
    this.result = shuffledPlayers;
  }

  shuffle(array: any[]) {
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
