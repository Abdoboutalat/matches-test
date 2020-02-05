import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    matchesNumber: number;

  ngOnInit(): void {
      this.matchesNumber =  this.initMatchesNumber();
  }
  pickMatches(pickedMatchesNumber: number) {
    this.matchesNumber -= pickedMatchesNumber;
  }
  initMatchesNumber(){
    return this.matchesNumber =  Math.floor(Math.random() * (15 - 5) + 5);
  }
}
