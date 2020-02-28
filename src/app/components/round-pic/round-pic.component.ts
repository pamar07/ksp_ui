import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round-pic',
  templateUrl: './round-pic.component.html',
  styleUrls: ['./round-pic.component.css']
})
export class RoundPicComponent implements OnInit {

  @Input() picPath:any;
  @Input() userName:string;
  @Input() height:any;
  @Input() width:any;
  @Input() className:string;

  constructor() { }

  ngOnInit() {
    // if(typeof(this.userName) == 'object'){
    //   console.log(this.userName);
    // }
    if(typeof(this.userName) == 'string'){
      this.userName = this.userName.charAt(0).toUpperCase();
    }
  }

}
