import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-inline-share',
  templateUrl: './mobile-inline-share.component.html',
  styleUrls: ['./mobile-inline-share.component.css']
})
export class MobileInlineShareComponent implements OnInit {

  @Input() shareCount:any;

  constructor() { }

  ngOnInit() {
  }

}
