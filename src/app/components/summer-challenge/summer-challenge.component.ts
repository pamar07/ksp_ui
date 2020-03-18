import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'summer-challenge',
  templateUrl: './summer-challenge.component.html',
  styleUrls: ['./summer-challenge.component.css'],
})
export class SummerChallengeComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    localStorage.setItem('location', location.href);
  }
}
