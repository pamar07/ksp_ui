import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-web-inline-share',
  templateUrl: './web-inline-share.component.html',
  styleUrls: ['./web-inline-share.component.css']
})
export class WebInlineShareComponent implements OnInit {

  @Input() shareCount:any;
  @Input() isSurvey:boolean;

  constructor() { }

  ngOnInit() {
  }

}
