import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ksp-voting-2019-popup',
  templateUrl: './ksp-voting-2019-popup.component.html',
  styleUrls: ['./ksp-voting-2019-popup.component.css']
})
export class KspVoting2019PopupComponent implements OnInit {
  private angular: any;
  constructor() { }

  ngOnInit() {
    window.onload = function () {
      setTimeout(function(){
        document.getElementById('awardsModel').style.display = 'block';
      }, 20000);
    };
  }

  closeAwardsPopup() {
    document.getElementById('awardsModel').style.display = 'none';
  }

}
