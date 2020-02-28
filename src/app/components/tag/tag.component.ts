import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() tags:any;
  @Input() id:number;

  initTags:any;
  restTags:any;
  showAll:boolean = false;
  randomString:string;

  constructor(
    public _sanitizer: DomSanitizer,
    public _common: CommonService,
    public _route: ActivatedRoute
  ) {
    this.randomString = '';
  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        if(this.tags.length>5){
          this.initTags = this.tags.slice(0,5);
          this.restTags = this.tags.slice(5,this.tags.length);
        }
        else{
          this.initTags = this.tags;
        }
        this.randomString = this._common.randomString();
    });
  }

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

}
