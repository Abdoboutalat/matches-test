import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  matchesNumber: number;
  computerChoice = 0;
  winner = '';
  isGameFinished = false;

  ngOnInit(): void {
    this.matchesNumber = this.getRandomNumber(5, 15);
  }

  pickMatches(pickedMatchesNumber: number, player: String = 'Gamer') {
    this.checkTheGame(pickedMatchesNumber, player);
    if (!this.isGameFinished && player === 'Gamer') {
      const randomNumber = this.getRandomNumber(1, 3);
      this.computerChoice = randomNumber;
      this.pickMatches(randomNumber, 'Computer');
    }
  }

  checkTheGame(pickedMatchesNumber, player) {
    if (this.matchesNumber - pickedMatchesNumber <= 0) {
      this.isGameFinished = true;
      this.winner = player;
    } else {
      this.matchesNumber -= pickedMatchesNumber;
    }
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  replay() {
    this.matchesNumber = this.getRandomNumber(5, 15);
    this.isGameFinished = false;
    this.computerChoice = 0;
    this.winner = '';
  }
}
